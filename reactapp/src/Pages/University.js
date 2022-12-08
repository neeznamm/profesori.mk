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
} from "../Components/Styled/EntityList.style";
import { CurrentPageNav } from "../Components/Styled/Main.style";
import LoadingSpinner from "../Components/Styled/LoadingSpinner.style";

const University = () => {
  let params = useParams();
  const [loaded, setLoaded] = useState(false);
  const [faculties, setFaculties] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const url = `http://192.168.0.29:8080/public/faculties?universityId=${params.universityId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        var cyclicGraph = await response.json();
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setFaculties(cyclicGraph);
        setLoaded(true);
      } catch (error) {
        setFetchError(true);
      }
    };
    fetchData();
  }, [params.universityId]);

  return loaded && !fetchError && faculties.length !== 0 ? (
    <>
      <CurrentPageNav>
        &#187; <a href="#">{faculties[0].university.universityName}</a>
      </CurrentPageNav>
      <ProfessorCard>
        <ProfessorCardName>
          {faculties[0].university.universityName}
        </ProfessorCardName>
        <ProfessorCardSeparator />
        <ProfessorCardDetails fontSize="20px">
          {faculties[0].university.city.cityName}
        </ProfessorCardDetails>
      </ProfessorCard>
      <div key={params.universityId}>
        {faculties.map((faculty) => {
          let totalPosts = 0;
          let totalSections = 0;
          faculty.professors.map((professor) => {
            totalPosts += professor.relatedOpinions.length;
            totalSections++;
          });
          faculty.studyProgrammes.map((studyProgramme) => {
            studyProgramme.subjects.map((subject) => {
              totalPosts += subject.threads.length;
              totalSections++;
            });
          });

          return (
            <EntityUl key={faculty.facultyId}>
              <EntityLi bgcolor="cornsilk">
                <a href={"/faculty/" + faculty.facultyId}>
                  {faculty.facultyName}
                </a>
                <EntityParam right="30px">
                  {totalSections}{" "}
                  {totalSections !== 1 ? (
                    <span style={{ fontWeight: "normal" }}>секции,</span>
                  ) : (
                    <span style={{ fontWeight: "normal" }}>секција</span>
                  )}
                  <span style={{ opacity: totalPosts === 0 ? "0.5" : "1" }}>
                    {totalPosts}
                  </span>{" "}
                  {totalPosts !== 1 ? (
                    <span
                      style={{
                        fontWeight: "normal",
                        opacity: totalPosts === 0 ? "0.5" : "1",
                      }}
                    >
                      мислења
                    </span>
                  ) : (
                    <span style={{ fontWeight: "normal" }}>мислење</span>
                  )}
                </EntityParam>
              </EntityLi>
            </EntityUl>
          );
        })}
      </div>
    </>
  ) : !fetchError && !loaded ? (
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

export default University;
