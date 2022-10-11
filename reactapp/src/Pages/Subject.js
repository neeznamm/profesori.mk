import React from "react";
import { useParams } from "react-router-dom";

const Subject = () => {
  let params = useParams();
  return <div>Subject {params.subjectId}</div>;
};

export default Subject;
