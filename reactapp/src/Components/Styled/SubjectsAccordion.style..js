import styled from "styled-components";

export const SubjectsAccordionDiv = styled.div`
  height: ${(props) => props.height};
  opacity: ${(props) => props.opacity};
  transition: opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
  margin-left: 20px;
`;

export const AccordionTitle = styled.div`
  padding: 10px;
  margin: 15px 0px;
  font-size: 18px;
  font-weight: bold;
  background-color: cornsilk;
  box-shadow: 2px 2px 5px #aaaaaa;
  position: relative;
  cursor: pointer;
`;

export const OpenAccordionSymbol = styled.span`
  font-size: 24px;
  position: absolute;
  right: 15px;
  bottom: 7px;
  color: grey;
`;
