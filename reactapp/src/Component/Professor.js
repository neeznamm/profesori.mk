import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function Professor() {
  let params = useParams();

  let [professor, setProfessor] = useState();

  useEffect(() => {
    const url = "http://192.168.0.17:8080/professor/1";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setProfessor(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div>{professor.professorName}</div>
        <div>{professor.faculty.facultyName}</div>
      </div>
      <Outlet />
    </div>
  );
}

export default Professor;
