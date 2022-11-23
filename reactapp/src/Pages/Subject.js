import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JSOG from "jsog";
import { Outlet } from "react-router-dom";
import { CurrentPageNav } from "../Components/Styled/Main.style";
import {
  ProfessorCard,
  ProfessorCardDetails,
  ProfessorCardName,
  ProfessorCardSeparator,
} from "../Components/Styled/ProfessorCard.style";
import AuthApi from "../api/AuthApi";
import { AddOpinionButton } from "../Components/Styled/Modal.style";
import {
  EntityLi,
  EntityUl,
  EntityParam,
} from "../Components/Styled/EntityList.style";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalTextarea,
} from "../Components/Styled/Modal.style";
import axios from "../api/axios";

const Subject = () => {
  let params = useParams();
  let navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthApi);
  const [subject, setSubject] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  var totalTopics = 0;
  var topics = [];

  const [topicModalDisplay, setTopicModalDisplay] = useState("none");
  const [topicTitle, setTopicTitle] = useState("");
  const [topicContent, setTopicContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const url = `http://192.168.0.19:8080/public/subject/${params.subjectId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        let cyclicGraph = await response.json();
        let jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setSubject(cyclicGraph);
        setLoaded(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchData();
  }, [params.subjectId]);

  const handleAddTopicButtonClick = () => {
    if (auth) {
      setTopicModalDisplay("block");
      document.body.style.overflowY = "hidden";
    } else {
      navigate("/login");
    }
  };

  const handleModalCloseClick = () => {
    setTopicModalDisplay("none");
    document.body.style.overflowY = "auto";
  };

  const handleTopicSubmit = async (e) => {
    e.preventDefault();

    if (!topicTitle.length < 1 && !topicContent.length < 1) {
      const response = await axios(
        `http://192.168.0.19:8080/secure/subject/${params.subjectId}/addThread`,
        {
          method: "post",
          data: {
            title: topicTitle,
            content: topicContent,
          },
          withCredentials: true,
        }
      );
      setErrorMessage("");
      window.location.reload(false);
    } else {
      setErrorMessage("Полињата за наслов и содржина не смеат да бидат празни");
    }
  };

  const handleContentChange = (e) => {
    setTopicContent(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTopicTitle(e.target.value);
  };

  return loaded ? (
    <>
      <CurrentPageNav>
        &#187;{" "}
        <a
          href={
            "/university/" +
            subject.studyProgramme.faculty.university.universityId
          }
        >
          {subject.studyProgramme.faculty.university.universityName}
        </a>{" "}
        &#187;{" "}
        <a href={"/faculty/" + subject.studyProgramme.faculty.facultyId}>
          {subject.studyProgramme.faculty.facultyName}
        </a>{" "}
        &#187; <a href="#">{subject.subjectName}</a>
      </CurrentPageNav>
      <ProfessorCard>
        <ProfessorCardName>{subject.subjectName}</ProfessorCardName>
        <ProfessorCardSeparator />
        <div style={{ marginTop: "10px" }}>
          <ProfessorCardDetails fontSize="20px">
            {subject.studyProgramme.studyProgrammeName} (
            {subject.studyProgramme.cycle}
            {"."}
            {"циклус"})
          </ProfessorCardDetails>
          <ProfessorCardDetails fontSize="20px">
            {subject.studyProgramme.faculty.facultyName}
          </ProfessorCardDetails>
          <ProfessorCardDetails fontSize="15px">
            {subject.studyProgramme.faculty.university.universityName}
          </ProfessorCardDetails>
        </div>
      </ProfessorCard>
      <div style={{ height: "20px", marginBottom: "50px" }}>
        <h3
          style={{
            float: "left",
          }}
        >
          {subject.threads.map((thread) => {
            if (thread.parent === null) {
              totalTopics++;
              topics.push(thread);
            }
          })}
          {totalTopics} {totalTopics !== 1 ? "теми" : "тема"}
        </h3>
        {auth && (
          <AddOpinionButton onClick={handleAddTopicButtonClick}>
            Отвори тема
          </AddOpinionButton>
        )}
      </div>
      <Modal display={topicModalDisplay}>
        <ModalContent>
          <ModalHeader>
            <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
            <h3 style={{ marginTop: "5px" }}>
              Тема во врска со {subject.subjectName}
            </h3>
          </ModalHeader>
          <form onSubmit={handleTopicSubmit}>
            <ModalBody>
              <label htmlFor="title">
                <b>Наслов</b>:
                <ModalInput
                  id="title"
                  value={topicTitle}
                  onChange={handleTitleChange}
                  spellCheck={false}
                />
              </label>
              <label htmlFor="content">
                <b>Содржина</b>:
                <ModalTextarea
                  id="content"
                  rows="8"
                  cols="100"
                  value={topicContent}
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
      <div key={subject.subjectId}>
        {topics.map((topic) => {
          var numReplies = topic.children.length;
          return (
            <EntityUl key={topic.postId}>
              <EntityLi bgcolor="cornsilk">
                <a href={"/topic/" + topic.postId}>{topic.title}</a>
                <EntityParam right="30px">
                  <span style={{ fontWeight: "normal" }}>
                    отворил:{" "}
                    <a href={"/user/" + topic.author.id}>
                      {topic.author.username}
                    </a>
                  </span>
                  <span style={{ fontStyle: "normal" }}>,</span>{" "}
                  {numReplies !== 1 ? (
                    numReplies !== 0 ? (
                      <span
                        style={{
                          fontWeight: "normal",
                          opacity: numReplies === 0 ? "0.5" : "1",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            opacity: numReplies === 0 ? "0.5" : "1",
                          }}
                        >
                          {numReplies}
                        </span>{" "}
                        реплики
                      </span>
                    ) : (
                      <span
                        style={{
                          fontWeight: "normal",
                          opacity: numReplies === 0 ? "0.5" : "1",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            opacity: numReplies === 0 ? "0.5" : "1",
                          }}
                        >
                          {numReplies}
                        </span>{" "}
                        реплики
                      </span>
                    )
                  ) : (
                    <span style={{ fontWeight: "normal" }}>
                      <span style={{ fontWeight: "bold" }}>{numReplies}</span>{" "}
                      реплика
                    </span>
                  )}
                </EntityParam>
              </EntityLi>
            </EntityUl>
          );
        })}
      </div>
    </>
  ) : !fetchError ? (
    <div>
      <p style={{ marginTop: "140px" }}>се вчитува...</p>
      <Outlet />
    </div>
  ) : (
    <div style={{ marginTop: "140px" }}>
      <h1 style={{ textAlign: "center" }}>Страницата не е пронајдена.</h1>
    </div>
  );
};

export default Subject;
