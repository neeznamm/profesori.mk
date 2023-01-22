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
import LoadingSpinner from "../Components/Styled/LoadingSpinner.style";

function Professor() {
  let params = useParams();
  let navigate = useNavigate();

  const [professor, setProfessor] = useState(null);
  const [loadedProfessor, setLoadedProfessor] = useState(false);
  const [relatedOpinions, setRelatedOpinions] = useState(null);
  const [loadedRelatedOpinions, setLoadedRelatedOpinions] = useState(false);

  const [postModalDisplay, setPostModalDisplay] = useState("none");
  const { auth, setAuth } = useContext(AuthApi);
  const [postContent, setPostContent] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
     Promise.all([fetch(`http://192.168.1.108:8080/public/professor/${params.professorId}`),
     fetch(`http://192.168.1.108:8080/public/professor/${params.professorId}/relatedOpinions`)])
        .then(([resProfessor, resRelatedOpinions]) => Promise.all([resProfessor.json(), resRelatedOpinions.json()]))
        .then(([dataProfessor, dataRelatedOpinions]) => {
          let cyclicGraph1 = dataProfessor;
          let jsogStructure1 = JSOG.encode(cyclicGraph1);
          cyclicGraph1 = JSOG.decode(jsogStructure1);
          setProfessor(cyclicGraph1);
          setLoadedProfessor(true);

          let cyclicGraph2 = dataRelatedOpinions;
          let jsogStructure2 = JSOG.encode(cyclicGraph2);
          cyclicGraph2 = JSOG.decode(jsogStructure2);
          setRelatedOpinions(cyclicGraph2);
          setLoadedRelatedOpinions(true);
        })

  }, []);

  const handleAddOpinionButtonClick = () => {
    if (auth) {
      setPostModalDisplay("block");
      document.body.style.overflowY = "hidden";
    } else {
      navigate("/login");
    }
  };

  const handleModalCloseClick = () => {
    setPostModalDisplay("none");
    document.body.style.overflowY = "auto";
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!postContent.length < 1) {
      const response = await axios(
        `http://192.168.1.108:8080/secure/professor/${params.professorId}/addOpinion`,
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
          <ProfessorCardName>{professor.professorName} <span style={{opacity:"50%", fontSize:"16px"}}>#{professor.professorId}</span></ProfessorCardName>
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
            {relatedOpinions.length}{" "}
            {relatedOpinions.length !== 1 ? "мислења" : "мислење"}
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
                    spellCheck={false}
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
          <OpinionTree professor={professor} relatedOpinions={relatedOpinions}/>
        </div>
        <Outlet />
      </div>
    );
  } else if (!fetchError) {
    return (
      <div>
        <LoadingSpinner style={{ marginTop: "140px" }}/>
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
