import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import JSOG from "jsog";
import OpinionTree from "../Components/OpinionTree";

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
        <h2>{professor.professorName}</h2>
        <h3>{professor.faculty.facultyName}</h3>
        <h3>Мислења</h3>
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
