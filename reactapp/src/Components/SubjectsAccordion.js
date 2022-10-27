import React, { useState } from "react";
import {
  AccordionTitle,
  SubjectsAccordionDiv,
  OpenAccordionSymbol,
} from "./Styled/SubjectsAccordion.style.";
import { EntityLi, EntityUl, EntityParam } from "./Styled/EntityList.style";

const SubjectsAccordion = (props) => {
  const [height, setHeight] = useState("0");
  const [opacity, setOpacity] = useState(0);
  const handleClick = () => {
    if (height === "0") {
      setHeight("auto");
      setOpacity(1);
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
          {props.content &&
            props.content.map((item) => {
              let totalPosts = item.threads.length;
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
