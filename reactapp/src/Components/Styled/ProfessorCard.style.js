import styled from "styled-components";

export const ProfessorCard = styled.div`
  width: auto;
  padding: 10px;
  margin-bottom: 30px;
  margin-top: 40px;
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
