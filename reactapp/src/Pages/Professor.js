import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import JSOG from "jsog";
import OpinionTree from "../Components/OpinionTree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

import {
  ProfessorCard,
  ProfessorCardDetails,
  ProfessorCardName,
  ProfessorCardSeparator,
} from "../Components/ProfessorCard.style";

function Professor(props) {
  let params = useParams();

  let [professor, setProfessor] = useState(null);
  let [loaded, setLoaded] = useState(null);

  useEffect(() => {
    const url = `http://192.168.0.17:8080/public/professor/${params.professorId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        var cyclicGraph = await response.json();
        var jsogStructure = JSOG.encode(cyclicGraph); // has { '@ref': 'ID' } links instead of cycles
        cyclicGraph = JSOG.decode(jsogStructure);
        setProfessor(cyclicGraph);
        setLoaded(true);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  if (loaded) {
    return (
      <div>
        <ProfessorCard>
          <ProfessorCardName>{professor.professorName}</ProfessorCardName>
          <ProfessorCardSeparator />
          <div style={{ marginTop: "20px" }}>
            <ProfessorCardDetails fontSize="20px">
              {professor.faculty.facultyName}
            </ProfessorCardDetails>
            <ProfessorCardDetails fontSize="15px">
              {professor.faculty.university.universityName}
            </ProfessorCardDetails>
          </div>
        </ProfessorCard>
        <h3>{professor.relatedOpinions.length} мислења</h3>
        <div className="opinionTree">
          <OpinionTree professor={professor} />
        </div>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div>
        <p>loading</p>
        <Outlet />
      </div>
    );
  }
}

export default Professor;
