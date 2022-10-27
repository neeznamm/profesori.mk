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
import { CurrentPageNav } from "../Components/Styled/Main.style";

function Professor() {
  let params = useParams();
  let navigate = useNavigate();

  const [professor, setProfessor] = useState(null);
  const [loadedProfessor, setLoadedProfessor] = useState(false);

  const [postModalDisplay, setPostModalDisplay] = useState("none");
  const { auth, setAuth } = useContext(AuthApi);
  const [postContent, setPostContent] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const url = `http://192.168.0.17:8080/public/professor/${params.professorId}`;

    const fetchProfessor = async () => {
      try {
        const response = await fetch(url);
        var cyclicGraph = await response.json();
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setProfessor(cyclicGraph);
        setLoadedProfessor(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchProfessor();
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

    if (!postContent.length < 1) {
      const response = await axios(
        `http://192.168.0.17:8080/secure/professor/${params.professorId}/addOpinion`,
        {
          method: "post",
          data: {
            content: postContent,
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

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  if (loadedProfessor) {
    return (
      <div>
        <CurrentPageNav>
          &#187;{" "}
          <a href={"/university/" + professor.faculty.university.universityId}>
            {professor.faculty.university.universityName}
          </a>{" "}
          &#187;{" "}
          <a href={"/faculty/" + professor.faculty.facultyId}>
            {professor.faculty.facultyName}
          </a>{" "}
          &#187; <a href="#">{professor.professorName}</a>
        </CurrentPageNav>
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
        <div style={{ height: "20px", marginBottom: "50px" }}>
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
              <p
                style={{ color: "red", marginLeft: "15px", marginTop: "10px" }}
              >
                {errorMessage}
              </p>
              <ModalFooter type="submit">ОБЈАВИ</ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <div className="opinionTree">
          <OpinionTree professor={professor} />
        </div>
        <Outlet />
      </div>
    );
  } else if (!fetchError) {
    return (
      <div>
        <p style={{ marginTop: "140px" }}>се вчитува...</p>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: "140px" }}>
        <h1 style={{ textAlign: "center" }}>Страницата не е пронајдена.</h1>
      </div>
    );
  }
}

export default Professor;
