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

  const [faculties, setFaculties] = useState(null);
  const [loadedFaculties, setLoadedFaculties] = useState(false);

  const [counts, setCounts] = useState(null);
  const [loadedCounts, setLoadedCounts] = useState(false);

  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
        Promise.all([fetch(`http://192.168.1.108:8080/public/faculties?universityId=${params.universityId}`),
        fetch(`http://192.168.1.108:8080/public/university/${params.universityId}/sectionAndPostCount`)])
            .then(([resFaculties, counts]) => Promise.all([resFaculties.json(), counts.json()]))
            .then(([dataFaculties, dataCounts]) => {
                let cyclicGraph1 = dataFaculties;
                let jsogStructure1 = JSOG.encode(cyclicGraph1);
                cyclicGraph1 = JSOG.decode(jsogStructure1);
                setFaculties(cyclicGraph1);
                setLoadedFaculties(true);

                let cyclicGraph2 = dataCounts;
                let jsogStructure2 = JSOG.encode(cyclicGraph2);
                cyclicGraph2 = JSOG.decode(jsogStructure2);
                setCounts(cyclicGraph2);
                setLoadedCounts(true);
            })

  }, []);

  return loadedFaculties && !fetchError && faculties.length !== 0 ? (
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
        {faculties.map((faculty, idx) => {
          let totalPosts = parseInt(counts[idx].split(",")[2]);
          let totalSections = parseInt(counts[idx].split(",")[1]);
          console.log(counts)
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
  ) : !fetchError && !loadedFaculties ? (
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
