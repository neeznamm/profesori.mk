import {
  OpinionCard,
  OpinionCardContent,
  OpinionCardContentTime,
  OpinionCardContentTitle,
  OpinionReplyCard,
  OpinionReplyCardContent,
  OpinionReplyCardContentTime,
  StyledFontAwesomeIcon,
} from "./Styled/OpinionCard.style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { dateConverter } from "../Util/dateConverter";
import AuthApi from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
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

function OpinionTree({ professor, user, userLoaded }) {
  var renderedOpinionIds = [];
  var postCount; // za da ne go pokazuva ispod postot

  let navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthApi);

  let [replyModalDisplay, setReplyModalDisplay] = useState("none");
  const [replyContent, setReplyContent] = useState("");

  const [postForModal, setPostForModal] = useState(null);

  const handleLike = () => {
    if (auth) {
      return;
    } else {
      navigate("/login");
    }
  };

  const handleDislike = () => {
    if (auth) {
      return;
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

    const response = await axios(
      `http://192.168.0.19:8080/secure/professor/${professor.professorId}/replyToOpinion/${postId}`,
      {
        method: "post",
        data: {
          content: replyContent,
        },
        withCredentials: true,
      }
    );

    window.location.reload(false);
    //console.log(response);
  };

  function displayChildPosts(child, parentPostAuthorUsername, replyIndent) {
    if (child == null) return;
    postCount = renderedOpinionIds.push(child.postId);
    return (
      <div key={child.postId}>
        <OpinionReplyCard indent={replyIndent + "px"}>
          <OpinionReplyCardContent>
            <p>
              <a href="#">{child.author.username}</a> му реплицирал на{" "}
              {parentPostAuthorUsername}
            </p>
            <p>{child.content}</p>
            <OpinionReplyCardContentTime>
              {dateConverter(
                new Date(child.timePosted).toString().slice(4, -43)
              )}
            </OpinionReplyCardContentTime>
            {auth && userLoaded && user.user.id !== child.author.id && (
              <>
                <StyledFontAwesomeIcon
                  icon={solid("thumbs-up")}
                  right={50 + "px"}
                  color="greenyellow"
                  onClick={handleLike}
                />
                <StyledFontAwesomeIcon
                  icon={solid("thumbs-down")}
                  right={10 + "px"}
                  color="indianred"
                  onClick={handleDislike}
                />
                <StyledFontAwesomeIcon
                  icon={solid("reply")}
                  right={90 + "px"}
                  color="black"
                  onClick={() => handleReply(child)}
                />
              </>
            )}
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
                  <p>
                    <a href="#">{opinion.author.username}</a> напишал
                  </p>
                  <OpinionCardContentTitle>
                    {opinion.title}
                  </OpinionCardContentTitle>
                  <p>{opinion.content}</p>
                  <OpinionCardContentTime>
                    {dateConverter(
                      new Date(opinion.timePosted).toString().slice(4, -43)
                    )}
                  </OpinionCardContentTime>
                  {auth && userLoaded && user.user.id !== opinion.author.id && (
                    <>
                      <StyledFontAwesomeIcon
                        icon={solid("thumbs-up")}
                        right={50 + "px"}
                        color="greenyellow"
                        onClick={handleLike}
                      />
                      <StyledFontAwesomeIcon
                        icon={solid("thumbs-down")}
                        right={10 + "px"}
                        color="indianred"
                        onClick={handleDislike}
                      />
                      <StyledFontAwesomeIcon
                        icon={solid("reply")}
                        right={90 + "px"}
                        color="black"
                        onClick={() => handleReply(opinion)}
                      />
                    </>
                  )}
                </OpinionCardContent>
                {opinion.children.map((child) =>
                  displayChildPosts(child, opinion.author.username, 30)
                )}
              </OpinionCard>
            </div>
          );
        }
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
              <ModalFooter type="submit">РЕПЛИЦИРАЈ</ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default OpinionTree;
