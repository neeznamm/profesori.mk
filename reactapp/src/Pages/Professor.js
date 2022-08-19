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

function Professor() {
  let params = useParams();

  let [professor, setProfessor] = useState(null);
  let [loaded, setLoaded] = useState(null);
  let [modalDisplay, setModalDisplay] = useState("none");
  let navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthApi);
  const [addPostTitle, setAddPostTitle] = useState("");
  const [addPostContent, setAddPostContent] = useState("");

  useEffect(() => {
    const url = `http://192.168.0.17:8080/public/professor/${params.professorId}`;

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
      setModalDisplay("block");
    } else {
      navigate("/login");
    }
  };

  const handleModalCloseClick = () => {
    setModalDisplay("none");
    console.log("here");
  };

  const handlePostSubmit = () => {};

  const handleTitleChange = (e) => {
    setAddPostTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setAddPostContent(e.target.value);
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
          <AddOpinionButton onClick={handleAddOpinionButtonClick}>
            Објави мислење
          </AddOpinionButton>
        </div>

        <Modal display={modalDisplay}>
          <ModalContent>
            <ModalHeader>
              <ModalClose onClick={handleModalCloseClick}>&times;</ModalClose>
              <h3 style={{ marginTop: "5px" }}>
                Мислење за {professor.professorName}
              </h3>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handlePostSubmit}>
                <label for="title">
                  <b>Наслов</b>:
                  <ModalInput
                    id="title"
                    type="text"
                    value={addPostTitle}
                    onChange={handleTitleChange}
                  />
                </label>
                <label for="content">
                  <b>Содржина</b>:
                  <ModalTextarea
                    id="content"
                    rows="8"
                    cols="100"
                    value={addPostContent}
                    onChange={handleContentChange}
                  />
                </label>
              </form>
            </ModalBody>
            <ModalFooter>
              <h2 style={{ textAlign: "center" }}>ОБЈАВИ</h2>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div className="opinionTree">
          <OpinionTree professor={professor} />
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
