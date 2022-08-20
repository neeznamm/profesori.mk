import React, { useEffect, useState, useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import JSOG from "jsog";
import OpinionTree from "../Components/OpinionTree";
import {
  AddOpinionButton,
  Modal,
  ModalContent,
  ModalClose,
  ModalHeader,
  ModalBody,
  ModalInput,
  ModalTextarea,
  ModalFooter,
} from "../Components/Styled/Modal.style";
import {
  ProfessorCard,
  ProfessorCardDetails,
  ProfessorCardName,
  ProfessorCardSeparator,
} from "../Components/Styled/ProfessorCard.style";
import AuthApi from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Professor(user, userLoaded) {
  let params = useParams();

  let [professor, setProfessor] = useState(null);
  let [loaded, setLoaded] = useState(null);
  let [postModalDisplay, setPostModalDisplay] = useState("none");
  let navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthApi);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const url = `http://192.168.0.19:8080/public/professor/${params.professorId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        var cyclicGraph = await response.json();
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setProfessor(cyclicGraph);
        setLoaded(true);
      } catch (error) {
        console.log("Fetching error", error);
      }
    };

    fetchData();
  }, [params.professorId]);

  const handleAddOpinionButtonClick = () => {
    if (auth) {
      setPostModalDisplay("block");
    } else {
      navigate("/login");
    }
  };

  const handleModalCloseClick = () => {
    setPostModalDisplay("none");
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const response = await axios(
      `http://192.168.0.19:8080/secure/professor/${professor.professorId}/addOpinion`,
      {
        method: "post",
        data: {
          title: postTitle,
          content: postContent,
        },
        withCredentials: true,
      }
    );

    window.location.reload(false);
  };

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  if (loaded) {
    return (
      <div>
        <ProfessorCard>
          <ProfessorCardName>{professor.professorName}</ProfessorCardName>
          <ProfessorCardSeparator />
          <div style={{ marginTop: "10px" }}>
            <ProfessorCardDetails fontSize="20px">
              {professor.faculty.facultyName}
            </ProfessorCardDetails>
            <ProfessorCardDetails fontSize="15px">
              {professor.faculty.university.universityName}
            </ProfessorCardDetails>
          </div>
        </ProfessorCard>
        <div style={{ height: "20px", marginBottom: "30px" }}>
          <h3
            style={{
              float: "left",
            }}
          >
            {professor.relatedOpinions.length}{" "}
            {professor.relatedOpinions.length !== 1 ? "мислења" : "мислење"}
          </h3>
          {auth && (
            <AddOpinionButton onClick={handleAddOpinionButtonClick}>
              Објави мислење
            </AddOpinionButton>
          )}
        </div>

        <Modal display={postModalDisplay}>
          <ModalContent>
            <ModalHeader>
              <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
              <h3 style={{ marginTop: "5px" }}>
                Мислење за {professor.professorName}
              </h3>
            </ModalHeader>
            <form onSubmit={handlePostSubmit}>
              <ModalBody>
                <label htmlFor="title">
                  <b>Наслов</b>:
                  <ModalInput
                    id="title"
                    type="text"
                    value={postTitle}
                    onChange={handleTitleChange}
                  />
                </label>
                <label htmlFor="content">
                  <b>Содржина</b>:
                  <ModalTextarea
                    id="content"
                    rows="8"
                    cols="100"
                    value={postContent}
                    onChange={handleContentChange}
                  />
                </label>
              </ModalBody>
              <ModalFooter type="submit">ОБЈАВИ</ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <div className="opinionTree">
          <OpinionTree
            professor={professor}
            user={user}
            userLoaded={userLoaded}
          />
        </div>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        <p style={{ marginTop: "140px" }}>се вчитува...</p>
        <Outlet />
      </div>
    );
  }
}

export default Professor;
