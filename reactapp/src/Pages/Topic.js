import React, { useState, useEffect, useContext } from "react";
import { useParams, Outlet } from "react-router-dom";
import JSOG from "jsog";
import { CurrentPageNav } from "../Components/Styled/Main.style";
import AuthApi from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import {
  OpinionCard,
  OpinionCardContent,
  OpinionCardContentTime,
  OpinionReplyCard,
  OpinionReplyCardContent,
  OpinionReplyCardContentTime,
  VoteCount,
} from "../Components/Styled/OpinionCard.style";
import { dateConverter } from "../Util/dateConverter";
import { StyledFontAwesomeIcon } from "../Components/Styled/OpinionCard.style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  AddOpinionButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalTextarea,
  ModalFooter,
} from "../Components/Styled/Modal.style";
import axios from "../api/axios";
import LoadingSpinner from "../Components/Styled/LoadingSpinner.style";

const Topic = () => {
  let params = useParams();
  let navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthApi);

  const [thread, setThread] = useState(null);
  const [loadedThread, setLoadedThread] = useState(false);
  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [postModalDisplay, setPostModalDisplay] = useState("none");
  const [postContent, setPostContent] = useState("");

  const [replyModalDisplay, setReplyModalDisplay] = useState("none");
  const [replyContent, setReplyContent] = useState("");
  const [postForReplyModal, setPostForReplyModal] = useState(null);

  const [reportModalDisplay, setReportModalDisplay] = useState("none");
  const [reportContent, setReportContent] = useState("");
  const [postForReportModal, setPostForReportModal] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const url1 = `http://192.168.1.108:8080/public/thread/${params.topicId}`;
    const url2 = `http://192.168.1.108:8080/secure/currentUser`;

    const fetchTopic = async () => {
      try {
        const response = await fetch(url1);
        let cyclicGraph = await response.json();
        let jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setThread(cyclicGraph);
        setLoadedThread(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(url2, { withCredentials: true });
        var cyclicGraph = await response.data;
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setUser(cyclicGraph);
        setLoadedUser(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchTopic().then(fetchUser);
  }, [loadedThread]);

  const handleReply = (post) => {
    if (auth) {
      setReplyModalDisplay("block");
      setPostForReplyModal(post);
      document.body.style.overflowY = "hidden";
    } else {
      navigate("/login");
    }
  };

  const handleReport = (post) => {
    if (auth) {
      setReportModalDisplay("block");
      setPostForReportModal(post);
      document.body.style.overflowY = "hidden";
    } else {
      navigate("/login");
    }
  };

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReportContentChange = (e) => {
    e.preventDefault();
    setReportContent(e.target.value);
  };

  const handleReplySubmit = async (e, postId) => {
    e.preventDefault();

    if (!replyContent.length < 1) {
      const response = await axios(
        `http://192.168.1.108:8080/secure/subject/${thread.targetSubject.subjectId}/replyToThread/${postId}`,
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
          `http://192.168.1.108:8080/secure/reportThread/${postId}`,
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

  const handleAddOpinionButtonClick = () => {
    if (auth) {
      setPostModalDisplay("block");
      document.body.style.overflowY = "hidden";
    } else {
      navigate("/login");
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.length < 1) {
      const response = await axios(
        `http://192.168.1.108:8080/secure/subject/${thread.targetSubject.subjectId}/replyToThread/${params.topicId}`,
        {
          method: "post",
          data: {
            content: postContent,
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
  const handleModalCloseClick = () => {
    setPostModalDisplay("none");
    setReplyModalDisplay("none");
    setReportModalDisplay("none");
    document.body.style.overflowY = "auto";
  };
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleLike = async (post) => {
    if (auth) {
      if (
        loadedUser &&
        user &&
        !post.votes.some((e) => e.user.id === user.id)
      ) {
        const response = await axios(
          `http://192.168.1.108:8080/secure/upvoteThread/${post.postId}`,
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
          `http://192.168.1.108:8080/secure/downvoteThread/${post.postId}`,
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

  function displayChildPosts(child, parentPostAuthorUsername, replyIndent) {
    if (child == null) return;
    //postCount = renderedOpinionIds.push(child.postId);
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

  return loadedThread && thread.length !== 0 ? (
    <>
      <CurrentPageNav>
        &#187;{" "}
        <a
          href={
            "/university/" +
            thread.targetSubject.studyProgramme.faculty.university.universityId
          }
        >
          {
            thread.targetSubject.studyProgramme.faculty.university
              .universityName
          }
        </a>{" "}
        &#187;{" "}
        <a
          href={
            "/faculty/" + thread.targetSubject.studyProgramme.faculty.facultyId
          }
        >
          {thread.targetSubject.studyProgramme.faculty.facultyName}
        </a>{" "}
        &#187;{" "}
        <a href={"/subject/" + thread.targetSubject.subjectId}>
          {thread.targetSubject.subjectName}
        </a>
      </CurrentPageNav>
      <div style={{ height: "20px", marginBottom: "50px", marginTop: "50px" }}>
        <h3 style={{ float: "left" }}>{thread.title} <span style={{opacity:"50%", fontSize:"16px"}}>#{thread.postId}</span></h3>
        {auth && (
          <AddOpinionButton onClick={handleAddOpinionButtonClick}>
            Реплицирај
          </AddOpinionButton>
        )}
      </div>
      <Modal display={postModalDisplay}>
        <ModalContent>
          <ModalHeader>
            <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
            <h3 style={{ marginTop: "5px" }}>
              Реплика на темата {thread.title}
            </h3>
          </ModalHeader>
          <form onSubmit={handlePostSubmit}>
            <ModalBody>
              <label htmlFor="content">
                <b>Содржина</b>:
                <ModalTextarea
                  id="content"
                  rows="8"
                  cols="100"
                  value={postContent}
                  onChange={handleContentChange}
                  spellCheck={false}
                />
              </label>
            </ModalBody>
            <p style={{ color: "red", marginLeft: "15px", marginTop: "10px" }}>
              {errorMessage}
            </p>
            <ModalFooter type="submit">ОБЈАВИ</ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <OpinionCard>
        <OpinionCardContent>
          <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
            <a href={"/user/" + thread.author.id}>{thread.author.username}</a>{" "}
            напишал
          </p>
          <p style={{ marginBottom: "10px", maxWidth: "90%" }}>
            {thread.content}
          </p>
          {new Date(thread.timePosted).setMilliseconds(0) === new Date(thread.timeLastEdited).setMilliseconds(0) ? (
            <OpinionCardContentTime>
              {dateConverter(
                new Date(thread.timePosted).toString().slice(4, -43)
              )} <span style={{fontStyle:"normal",color:"blue"}}>#{thread.postId}</span>
            </OpinionCardContentTime>
          ) : (
            <OpinionCardContentTime>
              {dateConverter(
                new Date(thread.timeLastEdited).toString().slice(4, -43)
              )}{" "} <span style={{fontStyle:"normal",color:"blue"}}>#{thread.postId}</span>{" "}
              (едитирано од модератор)
            </OpinionCardContentTime>
          )}
          <div
            style={{
              display:
                !auth || (auth && loadedUser && user.id !== thread.author.id)
                  ? "block"
                  : "none",
            }}
          >
            <StyledFontAwesomeIcon
                icon={solid("flag")}
                right={90 + "px"}
                color="darkgrey"
                onClick={() => handleReport(thread)}
            />
            <StyledFontAwesomeIcon
              icon={solid("thumbs-up")}
              right={50 + "px"}
              color={
                auth && loadedUser && user
                  ? thread.votes.some(
                      (e) => e.vote === "UPVOTE" && e.user.id === user.id
                    )
                    ? "green"
                    : "darkgrey"
                  : "darkgrey"
              }
              onClick={() => handleLike(thread)}
            />

            <VoteCount right={50 + "px"}>
              {thread.votes.filter((v) => v.vote === "UPVOTE").length}
            </VoteCount>

            <StyledFontAwesomeIcon
              icon={solid("thumbs-down")}
              right={10 + "px"}
              color={
                auth && loadedUser && user
                  ? thread.votes.some(
                      (e) => e.vote === "DOWNVOTE" && e.user.id === user.id
                    )
                    ? "indianred"
                    : "darkgrey"
                  : "darkgrey"
              }
              onClick={() => handleDislike(thread)}
            />

            <VoteCount right={10 + "px"}>
              {thread.votes.filter((v) => v.vote === "DOWNVOTE").length}
            </VoteCount>
          </div>
        </OpinionCardContent>
      </OpinionCard>
      {thread.children.map((directChild) => {
        return (
          <OpinionCard key={directChild.postId}>
            <OpinionCardContent>
              <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                <a href={"/user/" + directChild.author.id}>
                  {directChild.author.username}
                </a>{" "}
                напишал
              </p>
              <p style={{ marginBottom: "10px", maxWidth: "90%" }}>
                {directChild.content}
              </p>
              {new Date(directChild.timePosted).setMilliseconds(0) === new Date(directChild.timeLastEdited).setMilliseconds(0) ? (
                <OpinionCardContentTime>
                  {dateConverter(
                    new Date(directChild.timePosted).toString().slice(4, -43)
                  )} <span style={{fontStyle:"normal",color:"blue"}}>#{directChild.postId}</span>
                </OpinionCardContentTime>
              ) : (
                <OpinionCardContentTime>
                  {dateConverter(
                    new Date(directChild.timeLastEdited)
                      .toString()
                      .slice(4, -43)
                  )}{" "} <span style={{fontStyle:"normal",color:"blue"}}>#{directChild.postId}</span>{" "}
                  (едитирано од модератор)
                </OpinionCardContentTime>
              )}
              <div
                style={{
                  display:
                    !auth ||
                    (auth && loadedUser && user.id !== directChild.author.id)
                      ? "block"
                      : "none",
                }}
              >
                <StyledFontAwesomeIcon
                  icon={solid("thumbs-up")}
                  right={50 + "px"}
                  color={
                    auth && loadedUser && user
                      ? directChild.votes.some(
                          (e) => e.vote === "UPVOTE" && e.user.id === user.id
                        )
                        ? "green"
                        : "darkgrey"
                      : "darkgrey"
                  }
                  onClick={() => handleLike(directChild)}
                />

                <VoteCount right={50 + "px"}>
                  {directChild.votes.filter((v) => v.vote === "UPVOTE").length}
                </VoteCount>

                <StyledFontAwesomeIcon
                  icon={solid("thumbs-down")}
                  right={10 + "px"}
                  color={
                    auth && loadedUser && user
                      ? directChild.votes.some(
                          (e) => e.vote === "DOWNVOTE" && e.user.id === user.id
                        )
                        ? "indianred"
                        : "darkgrey"
                      : "darkgrey"
                  }
                  onClick={() => handleDislike(directChild)}
                />

                <VoteCount right={10 + "px"}>
                  {
                    directChild.votes.filter((v) => v.vote === "DOWNVOTE")
                      .length
                  }
                </VoteCount>

                <StyledFontAwesomeIcon
                  icon={solid("reply")}
                  right={90 + "px"}
                  color="darkgrey"
                  onClick={() => handleReply(directChild)}
                />

                <StyledFontAwesomeIcon
                    icon={solid("flag")}
                    right={130 + "px"}
                    color="darkgrey"
                    onClick={() => handleReport(directChild)}
                />
              </div>
            </OpinionCardContent>
            {directChild.children.map((child) =>
              displayChildPosts(child, directChild.author.username, 30)
            )}
          </OpinionCard>
        );
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
    </>
  ) : !fetchError && !loadedThread ? (
    <div>
      <LoadingSpinner style={{ marginTop: "140px" }}/>
      <Outlet />
    </div>
  ) : (
    <div style={{ marginTop: "140px" }}>
      <h1 style={{ textAlign: "center" }}>Страницата не е пронајдена.</h1>
    </div>
  );
};

export default Topic;
