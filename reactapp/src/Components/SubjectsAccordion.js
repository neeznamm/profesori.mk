import React, { useState } from "react";
import {
  AccordionTitle,
  SubjectsAccordionDiv,
  OpenAccordionSymbol,
} from "./Styled/SubjectsAccordion.style.";
import { EntityLi, EntityUl, EntityParam } from "./Styled/EntityList.style";
import JSOG from "jsog";

const SubjectsAccordion = (props) => {
  const [height, setHeight] = useState("0");
  const [opacity, setOpacity] = useState(0);

  const [subjects, setSubjects] = useState(null);
  const [loadedSubjects, setLoadedSubjects] = useState(false);
  const [counts, setCounts] = useState(null);
  const [loadedCounts, setLoadedCounts] = useState(false);

  const [fetchError, setFetchError] = useState(false);
  const handleClick = () => {
    if (height === "0") {
      setHeight("auto");
      setOpacity(1);
      try {
        Promise.all([fetch(`http://192.168.1.254:8080/public/subjects?studyProgrammeId=${props.title.studyProgrammeId}`),
          fetch(`http://192.168.1.254:8080/public/study_programme/${props.title.studyProgrammeId}/threadCountForEachSubject`)])
            .then(([resSubjects, counts]) => Promise.all([resSubjects.json(), counts.json()]))
            .then(([dataSubjects, dataCounts]) => {
              let cyclicGraph1 = dataSubjects;
              let jsogStructure1 = JSOG.encode(cyclicGraph1);
              cyclicGraph1 = JSOG.decode(jsogStructure1);
              setSubjects(cyclicGraph1);
              setLoadedSubjects(true);

              let cyclicGraph2 = dataCounts;
              let jsogStructure2 = JSOG.encode(cyclicGraph2);
              cyclicGraph2 = JSOG.decode(jsogStructure2);
              setCounts(cyclicGraph2);
              setLoadedCounts(true);
            })

      } catch (error) {
        setFetchError(true);
      }
    } else {
      setHeight("0");
      setOpacity(0);
    }
  };
  return (
    <div onClick={() => handleClick()}>
      <AccordionTitle>
        {props.title.studyProgrammeName} ({props.title.cycle}. циклус)
        <OpenAccordionSymbol>&#9662;</OpenAccordionSymbol>
      </AccordionTitle>
      <SubjectsAccordionDiv height={height} opacity={opacity}>
        <EntityUl>
          {loadedSubjects &&
            subjects.map((item, idx) => {
              let totalPosts = parseInt(counts[idx].split(",")[1]);
              return (
                <EntityLi key={item.subjectName} bgcolor="cornsilk">
                  <a href={"/subject/" + item.subjectId}>{item.subjectName}</a>
                  <EntityParam right="30px">
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
              );
            })}
        </EntityUl>
      </SubjectsAccordionDiv>
    </div>
  );
};

export default SubjectsAccordion;
