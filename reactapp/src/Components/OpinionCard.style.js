import styled from "styled-components";

export const OpinionCard = styled.div`
  background-color: papayawhip;
  width: fit-content;
`;

export const OpinionReplyCard = styled.div`
  background-color: lavender;
  width: fit-content;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-left: ${(props) => props.indent};
`;
