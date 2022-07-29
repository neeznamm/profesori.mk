import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function Professor() {
  let params = useParams();

  let [professor, setProfessor] = useState(null);
  let [loaded, setLoaded] = useState(null);

  useEffect(() => {
    const url = `http://192.168.0.17:8080/public/professor/${params.professorId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setProfessor(json);
        setLoaded(true);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  if (loaded) {
    return (
      <div>
        <div>{professor.professorName}</div>
        <div>{professor.faculty.facultyName}</div>
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
