import {
  OpinionCard,
  OpinionCardContent,
  OpinionCardContentTime,
  OpinionReplyCard,
  OpinionReplyCardContent,
  OpinionReplyCardContentTime,
  StyledFontAwesomeIcon,
  VoteCount,
} from "./Styled/OpinionCard.style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { dateConverter } from "../Util/dateConverter";
import AuthApi from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import JSOG from "jsog";
import {
  Modal,
  ModalContent,
  ModalClose,
  ModalHeader,
  ModalBody,
  ModalTextarea,
  ModalFooter,
} from "../Components/Styled/Modal.style";
import axios from "../api/axios";

const OpinionTree = ({professor, relatedOpinions}) => {
  var renderedOpinionIds = [];
  var postCount; // za da ne go pokazuva ispod postot

  const { auth, setAuth } = useContext(AuthApi);
  let navigate = useNavigate();

  const [replyModalDisplay, setReplyModalDisplay] = useState("none");
  const [replyContent, setReplyContent] = useState("");
  const [postForReplyModal, setPostForReplyModal] = useState(null);
  const [reportModalDisplay, setReportModalDisplay] = useState("none");
  const [reportContent, setReportContent] = useState("")
  const [postForReportModal, setPostForReportModal] = useState(null);

  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const url = `http://192.168.1.254:8080/secure/currentUser`;

    const fetchUser = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        var cyclicGraph = await response.data;
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setUser(cyclicGraph);
        setLoadedUser(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    if (auth) fetchUser();
  }, []);

  const handleLike = async (post) => {
    if (auth) {
      if (
        loadedUser &&
        user &&
        !post.votes.some((e) => e.user.id === user.id)
      ) {
        const response = await axios(
          `http://192.168.1.254:8080/secure/upvoteOpinion/${post.postId}`,
          {
            method: "get",
            withCredentials: true,
          }
        );
        window.location.reload();
      } else {
        return;
      }
    } else {
      navigate("/login");
    }
  };

  const handleDislike = async (post) => {
    if (auth) {
      if (
        loadedUser &&
        user &&
        !post.votes.some((e) => e.user.id === user.id)
      ) {
        const response = await axios(
          `http://192.168.1.254:8080/secure/downvoteOpinion/${post.postId}`,
          {
            method: "get",
            withCredentials: true,
          }
        );

        window.location.reload();
      } else {
        return;
      }
    } else {
      navigate("/login");
    }
  };

  const handleReply = (opinion) => {
    if (auth) {
      setReplyModalDisplay("block");
      setPostForReplyModal(opinion);
      document.body.style.overflowY = "hidden";
    } else {
      navigate("/login");
    }
  };

  const handleReport = (opinion) => {
    if (auth) {
      setReportModalDisplay("block");
      setPostForReportModal(opinion);
      document.body.style.overflowY = "hidden";
    } else {
      navigate("/login");
    }
  }

  const handleModalCloseClick = () => {
    setReplyModalDisplay("none");
    setReportModalDisplay("none");
    document.body.style.overflowY = "auto";
  };

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReportContentChange = (e) => {
    setReportContent(e.target.value);
  };

  const handleReplySubmit = async (e, postId) => {
    e.preventDefault();

    if (!replyContent.length < 1) {
      const response = await axios(
        `http://192.168.1.254:8080/secure/professor/${professor.professorId}/replyToOpinion/${postId}`,
        {
          method: "post",
          data: {
            content: replyContent,
          },
          withCredentials: true,
        }
      );
      setErrorMessage("");
      window.location.reload();
    } else {
      setErrorMessage("Полето за содржина не смее да биде празно");
    }
  };

  const handleReportSubmit = async (e, postId) => {
    e.preventDefault();

    if (!reportContent.length < 1) {
      const response = await axios(
          `http://192.168.1.254:8080/secure/reportOpinion/${postId}`,
          {
            method: "post",
            data: {
              description: reportContent,
            },
            withCredentials: true,
          }
      );
      setErrorMessage("");
      window.location.reload();
    } else {
      setErrorMessage("Полето за содржина не смее да биде празно");
    }
  };

  function displayChildPosts(child, parentPostAuthorUsername, replyIndent) {
    if (child == null) return;
    if (!renderedOpinionIds.includes(child.postId)) {postCount = renderedOpinionIds.push(child.postId);}
    return (
      <div key={child.postId}>
        <OpinionReplyCard indent={replyIndent + "px"}>
          <OpinionReplyCardContent>
            <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
              <a href={"/user/" + child.author.id}>{child.author.username}</a>{" "}
              му реплицирал на {parentPostAuthorUsername}
            </p>
            <p style={{ marginBottom: "10px", maxWidth: "85%" }}>
              {child.content}
            </p>
            {new Date(child.timePosted).setMilliseconds(0) === new Date(child.timeLastEdited).setMilliseconds(0) ? (
              <OpinionCardContentTime>
                {dateConverter(
                  new Date(child.timePosted).toString().slice(4, -43)
                )} <span style={{fontStyle:"normal",color:"blue"}}>#{child.postId}</span>
              </OpinionCardContentTime>
            ) : (
              <OpinionCardContentTime>
                {dateConverter(
                  new Date(child.timeLastEdited).toString().slice(4, -43)
                )}{" "} <span style={{fontStyle:"normal",color:"blue"}}>#{child.postId}</span>{" "}
                (едитирано од модератор)
              </OpinionCardContentTime>
            )}

            <div
              style={{
                display:
                  !auth || (auth && loadedUser && user.id !== child.author.id)
                    ? "block"
                    : "none",
              }}
            >
              <StyledFontAwesomeIcon
                icon={solid("thumbs-up")}
                right={50 + "px"}
                color={
                  auth && loadedUser && user
                    ? child.votes.some(
                        (e) => e.vote === "UPVOTE" && e.user.id === user.id
                      )
                      ? "green"
                      : "darkgrey"
                    : "darkgrey"
                }
                onClick={() => handleLike(child)}
              />

              <VoteCount right={50 + "px"}>
                {child.votes.filter((v) => v.vote === "UPVOTE").length}
              </VoteCount>

              <StyledFontAwesomeIcon
                icon={solid("thumbs-down")}
                right={10 + "px"}
                color={
                  auth && loadedUser && user
                    ? child.votes.some(
                        (e) => e.vote === "DOWNVOTE" && e.user.id === user.id
                      )
                      ? "indianred"
                      : "darkgrey"
                    : "darkgrey"
                }
                onClick={() => handleDislike(child)}
              />

              <VoteCount right={10 + "px"}>
                {child.votes.filter((v) => v.vote === "DOWNVOTE").length}
              </VoteCount>

              <StyledFontAwesomeIcon
                icon={solid("reply")}
                right={90 + "px"}
                color="darkgrey"
                onClick={() => handleReply(child)}
              />

              <StyledFontAwesomeIcon
                  icon={solid("flag")}
                  right={130 + "px"}
                  color="darkgrey"
                  onClick={() => handleReport(child)}
              />
            </div>
          </OpinionReplyCardContent>
          {child.children.map((childOfChild) =>
            displayChildPosts(
              childOfChild,
              child.author.username,
              replyIndent + 30
            )
          )}
        </OpinionReplyCard>
      </div>
    );
  }

  return (
    <div className="opinionTree">
      {relatedOpinions.map((opinion) => {
        if (!renderedOpinionIds.includes(opinion.postId) && opinion.parent === null) {
          postCount = renderedOpinionIds.push(opinion.postId);
          return (
            <div key={opinion.postId}>
              <OpinionCard>
                <OpinionCardContent>
                  <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                    <a href={"/user/" + opinion.author.id}>
                      {opinion.author.username}
                    </a>{" "}
                    напишал
                  </p>
                  <p style={{ marginBottom: "10px", maxWidth: "85%" }}>
                    {opinion.content}
                  </p>
                  {new Date(opinion.timePosted).setMilliseconds(0) === new Date(opinion.timeLastEdited).setMilliseconds(0) ? (
                    <OpinionCardContentTime>
                      {dateConverter(
                        new Date(opinion.timePosted).toString().slice(4, -43)
                      )} <span style={{fontStyle:"normal",color:"blue"}}>#{opinion.postId}</span>
                    </OpinionCardContentTime>
                  ) : (
                    <OpinionCardContentTime>
                      {dateConverter(
                        new Date(opinion.timeLastEdited)
                          .toString()
                          .slice(4, -43)
                      )}{" "} <span style={{fontStyle:"normal",color:"blue"}}>#{opinion.postId}</span>{" "}
                      (едитирано од модератор)
                    </OpinionCardContentTime>
                  )}

                  <div
                    style={{
                      display:
                        !auth ||
                        (auth && loadedUser && user.id !== opinion.author.id)
                          ? "block"
                          : "none",
                    }}
                  >
                    <StyledFontAwesomeIcon
                      icon={solid("thumbs-up")}
                      right={50 + "px"}
                      color={
                        auth && loadedUser && user
                          ? opinion.votes.some(
                              (e) =>
                                e.vote === "UPVOTE" && e.user.id === user.id
                            )
                            ? "green"
                            : "darkgrey"
                          : "darkgrey"
                      }
                      onClick={() => handleLike(opinion)}
                    />

                    <VoteCount right={50 + "px"}>
                      {opinion.votes.filter((v) => v.vote === "UPVOTE").length}
                    </VoteCount>

                    <StyledFontAwesomeIcon
                      icon={solid("thumbs-down")}
                      right={10 + "px"}
                      color={
                        auth && loadedUser && user
                          ? opinion.votes.some(
                              (e) =>
                                e.vote === "DOWNVOTE" && e.user.id === user.id
                            )
                            ? "indianred"
                            : "darkgrey"
                          : "darkgrey"
                      }
                      onClick={() => handleDislike(opinion)}
                    />

                    <VoteCount right={10 + "px"}>
                      {
                        opinion.votes.filter((v) => v.vote === "DOWNVOTE")
                          .length
                      }
                    </VoteCount>

                    <StyledFontAwesomeIcon
                      icon={solid("reply")}
                      right={90 + "px"}
                      color="darkgrey"
                      onClick={() => handleReply(opinion)}
                    />

                    <StyledFontAwesomeIcon
                        icon={solid("flag")}
                        right={130 + "px"}
                        color="darkgrey"
                        onClick={() => handleReport(opinion)}
                    />
                  </div>
                </OpinionCardContent>
                {opinion.children.map((child) =>
                  displayChildPosts(child, opinion.author.username, 30)
                )}
              </OpinionCard>
            </div>
          );
        }
        return null;
      })}
      {postForReplyModal && (
        <Modal display={replyModalDisplay}>
          <ModalContent>
            <ModalHeader>
              <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
              <h3 style={{ marginTop: "5px" }}>
                Реплика на {postForReplyModal.author.username}
              </h3>
            </ModalHeader>
            <form onSubmit={(e) => handleReplySubmit(e, postForReplyModal.postId)}>
              <ModalBody>
                <label htmlFor="content">
                  <b>Содржина</b>:
                  <ModalTextarea
                    id="content"
                    rows="8"
                    cols="100"
                    value={replyContent}
                    onChange={handleReplyContentChange}
                    spellCheck={false}
                  />
                </label>
              </ModalBody>
              <p
                style={{ color: "red", marginLeft: "15px", marginTop: "10px" }}
              >
                {errorMessage}
              </p>
              <ModalFooter type="submit">РЕПЛИЦИРАЈ</ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
      {postForReportModal && (
          <Modal display={reportModalDisplay}>
            <ModalContent>
              <ModalHeader>
                <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
                <h3 style={{ marginTop: "5px" }}>
                  Пријава за мислење #{postForReportModal.postId}
                </h3>
              </ModalHeader>
              <form onSubmit={(e) => handleReportSubmit(e, postForReportModal.postId)}>
                <ModalBody>
                  <label htmlFor="content">
                    <b>Наведете причина</b>:
                    <ModalTextarea
                        id="content"
                        rows="8"
                        cols="100"
                        value={reportContent}
                        onChange={handleReportContentChange}
                        spellCheck={false}
                    />
                  </label>
                </ModalBody>
                <p
                    style={{ color: "red", marginLeft: "15px", marginTop: "10px" }}
                >
                  {errorMessage}
                </p>
                <ModalFooter type="submit">ПРИЈАВИ</ModalFooter>
              </form>
            </ModalContent>
          </Modal>
      )}
    </div>
  );
}

export default OpinionTree;
