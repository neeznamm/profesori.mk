import React, { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import JSOG from "jsog";
import {
  ProfessorCard,
  ProfessorCardName,
  ProfessorCardSeparator,
  ProfessorCardDetails,
} from "../Components/Styled/ProfessorCard.style";
import {
  EntityUl,
  EntityLi,
  EntityParam,
  EntityTypeSelector,
} from "../Components/Styled/EntityList.style";
import SubjectsAccordion from "../Components/SubjectsAccordion";
import { CurrentPageNav } from "../Components/Styled/Main.style";

const Faculty = () => {
  let params = useParams();
  const [loadedProfessors, setLoadedProfessors] = useState(false);
  const [loadedStudyProgrammes, setLoadedStudyProgrammes] = useState(false);
  const [professors, setProfessors] = useState(null);
  const [studyProgrammes, setStudyProgrammes] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [entityType, setEntityType] = useState(0);

  useEffect(() => {
    const urlProfessors = `http://192.168.0.17:8080/public/professors?facultyId=${params.facultyId}`;
    const urlStudyProgrammes = `http://192.168.0.17:8080/public/study_programmes?facultyId=${params.facultyId}`;

    const fetchDataProfessors = async () => {
      try {
        const response = await fetch(urlProfessors);
        let cyclicGraph = await response.json();
        let jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setProfessors(cyclicGraph);
        setLoadedProfessors(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    const fetchDataStudyProgrammes = async () => {
      try {
        const response2 = await fetch(urlStudyProgrammes);
        let cyclicGraph2 = await response2.json();
        let jsogStructure2 = JSOG.encode(cyclicGraph2);
        cyclicGraph2 = JSOG.decode(jsogStructure2);
        setStudyProgrammes(cyclicGraph2);
        setLoadedStudyProgrammes(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchDataProfessors();
    fetchDataStudyProgrammes();
  }, [params.facultyId]);

  return loadedProfessors ? (
    entityType === 0 ? (
      <>
        <CurrentPageNav>
          &#187;{" "}
          <a
            href={
              "/university/" + professors[0].faculty.university.universityId
            }
          >
            {professors[0].faculty.university.universityName}
          </a>{" "}
          &#187; <a href="#">{professors[0].faculty.facultyName}</a>
        </CurrentPageNav>
        <ProfessorCard>
          <ProfessorCardName>
            {professors[0].faculty.facultyName}
          </ProfessorCardName>
          <ProfessorCardSeparator />
          <ProfessorCardDetails fontSize="20px">
            {professors[0].faculty.university.universityName}
          </ProfessorCardDetails>
        </ProfessorCard>
        <div style={{ display: "flex" }}>
          <EntityTypeSelector
            backgroundcolor="rgba(0, 102, 204, 1)"
            color="white"
            boxshadow="none"
            boxshadowhover="none"
            opacityhover="0.6"
            cursor="auto"
          >
            Прикажи професори
          </EntityTypeSelector>
          <EntityTypeSelector
            boxshadow="2px 2px 5px #aaaaaa"
            cursor="pointer"
            boxshadowhover="2px 2px 10px #aaaaaa"
            opacityhover="1"
            onClick={() => setEntityType(1)}
          >
            Прикажи предмети
          </EntityTypeSelector>
        </div>
        <div key={params.facultyId}>
          {professors.map((professor) => {
            let totalPosts = professor.relatedOpinions.length;

            return (
              <EntityUl key={professor.professorId}>
                <EntityLi bgcolor="cornsilk">
                  <a href={"/professor/" + professor.professorId}>
                    {professor.professorName}
                  </a>
                  <EntityParam>
                    {totalPosts !== 1 ? (
                      totalPosts !== 0 ? (
                        <span
                          style={{
                            fontWeight: "normal",
                            opacity: totalPosts === 0 ? "0.5" : "1",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              opacity: totalPosts === 0 ? "0.5" : "1",
                            }}
                          >
                            {totalPosts}
                          </span>{" "}
                          мислења
                        </span>
                      ) : (
                        <span
                          style={{
                            fontWeight: "normal",
                            opacity: totalPosts === 0 ? "0.5" : "1",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              opacity: totalPosts === 0 ? "0.5" : "1",
                            }}
                          >
                            {totalPosts}
                          </span>{" "}
                          мислења
                        </span>
                      )
                    ) : (
                      <span style={{ fontWeight: "normal" }}>
                        <span style={{ fontWeight: "bold" }}>{totalPosts}</span>{" "}
                        мислење
                      </span>
                    )}
                  </EntityParam>
                </EntityLi>
              </EntityUl>
            );
          })}
        </div>
      </>
    ) : (
      loadedStudyProgrammes && (
        <>
          <CurrentPageNav>
            <a
              href={
                "/university/" + professors[0].faculty.university.universityId
              }
            >
              {professors[0].faculty.university.universityName}
            </a>{" "}
            / <a href="#">{professors[0].faculty.facultyName}</a>
          </CurrentPageNav>
          <ProfessorCard>
            <ProfessorCardName>
              {professors[0].faculty.facultyName}
            </ProfessorCardName>
            <ProfessorCardSeparator />
            <ProfessorCardDetails fontSize="20px">
              {professors[0].faculty.university.universityName}
            </ProfessorCardDetails>
          </ProfessorCard>
          <div style={{ display: "flex" }}>
            <EntityTypeSelector
              boxshadow="2px 2px 5px #aaaaaa"
              cursor="pointer"
              boxshadowhover="2px 2px 10px #aaaaaa"
              opacityhover="1"
              onClick={() => setEntityType(0)}
            >
              Прикажи професори
            </EntityTypeSelector>
            <EntityTypeSelector
              backgroundcolor="rgba(0, 102, 204, 1)"
              color="white"
              boxshadow="none"
              boxshadowhover="none"
              opacityhover="0.6"
              cursor="auto"
            >
              Прикажи предмети
            </EntityTypeSelector>
          </div>
          <div key={params.facultyId}>
            {studyProgrammes.map((studyProgramme) => {
              return (
                <SubjectsAccordion
                  key={studyProgramme.studyProgrammeId}
                  title={studyProgramme}
                  content={studyProgramme.subjects}
                ></SubjectsAccordion>
              );
            })}
          </div>
        </>
      )
    )
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

export default Faculty;
