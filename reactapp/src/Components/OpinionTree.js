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

function OpinionTree({ professor }) {
  var renderedOpinionIds = [];
  var postCount; // za da ne go pokazuva ispod postot

  const { auth, setAuth } = useContext(AuthApi);
  let navigate = useNavigate();

  const [replyModalDisplay, setReplyModalDisplay] = useState("none");
  const [replyContent, setReplyContent] = useState("");
  const [postForModal, setPostForModal] = useState(null);
  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const url = `http://192.168.0.17:8080/secure/currentUser`;

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
          `http://192.168.0.17:8080/secure/upvoteOpinion/${post.postId}`,
          {
            method: "get",
            withCredentials: true,
          }
        );
        window.location.reload(false);
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
          `http://192.168.0.17:8080/secure/downvoteOpinion/${post.postId}`,
          {
            method: "get",
            withCredentials: true,
          }
        );

        window.location.reload(false);
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
      setPostForModal(opinion);
    } else {
      navigate("/login");
    }
  };

  const handleModalCloseClick = () => {
    setReplyModalDisplay("none");
  };

  const handleContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e, postId) => {
    e.preventDefault();

    if (!replyContent.length < 1) {
      const response = await axios(
        `http://192.168.0.17:8080/secure/professor/${professor.professorId}/replyToOpinion/${postId}`,
        {
          method: "post",
          data: {
            content: replyContent,
          },
          withCredentials: true,
        }
      );
      setErrorMessage("");
      window.location.reload(false);
    } else {
      setErrorMessage("Полето за содржина не смее да биде празно");
    }
  };

  function displayChildPosts(child, parentPostAuthorUsername, replyIndent) {
    if (child == null) return;
    postCount = renderedOpinionIds.push(child.postId);
    return (
      <div key={child.postId}>
        <OpinionReplyCard indent={replyIndent + "px"}>
          <OpinionReplyCardContent>
            <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
              <a href={"/user/" + child.author.id}>{child.author.username}</a>{" "}
              му реплицирал на {parentPostAuthorUsername}
            </p>
            <p style={{ marginBottom: "10px", maxWidth: "90%" }}>
              {child.content}
            </p>
            <OpinionReplyCardContentTime>
              {dateConverter(
                new Date(child.timePosted).toString().slice(4, -43)
              )}
            </OpinionReplyCardContentTime>

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
                      ? "greenyellow"
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
      {professor.relatedOpinions.map((opinion) => {
        if (!renderedOpinionIds.includes(opinion.postId)) {
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
                  <p style={{ marginBottom: "10px", maxWidth: "90%" }}>
                    {opinion.content}
                  </p>
                  <OpinionCardContentTime>
                    {dateConverter(
                      new Date(opinion.timePosted).toString().slice(4, -43)
                    )}
                  </OpinionCardContentTime>

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
                            ? "greenyellow"
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
      {postForModal && (
        <Modal display={replyModalDisplay}>
          <ModalContent>
            <ModalHeader>
              <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
              <h3 style={{ marginTop: "5px" }}>
                Реплика на {postForModal.author.username}
              </h3>
            </ModalHeader>
            <form onSubmit={(e) => handleReplySubmit(e, postForModal.postId)}>
              <ModalBody>
                <label htmlFor="content">
                  <b>Содржина</b>:
                  <ModalTextarea
                    id="content"
                    rows="8"
                    cols="100"
                    value={replyContent}
                    onChange={handleContentChange}
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
    </div>
  );
}

export default OpinionTree;
