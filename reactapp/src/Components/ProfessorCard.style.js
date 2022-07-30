import styled from "styled-components";

export const ProfessorCard = styled.div`
  background-color: papayawhip;
  width: fit-content;
  padding: 10px;
  margin-bottom: 30px;
`;

export const ProfessorCardName = styled.h2`
  margin-bottom: 10px; ;
`;

export const ProfessorCardSeparator = styled.hr`
  color: darkslategray;
  margin: 0;
`;

export const ProfessorCardDetails = styled.h3`
  font-size: ${(props) => props.fontSize};
  color: black;
  opacity: 0.6;
`;
