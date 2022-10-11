import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OpinionCard = styled.div`
  background-color: papayawhip;
  width: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 2px 2px 10px #aaaaaa;
`;

export const OpinionCardContent = styled.div`
  padding: 5px;
  transition: 0.5s;
  &:hover {
    background-color: seashell;
  }
  position: relative;
`;

export const OpinionCardContentTitle = styled.p`
  font-weight: bold;
`;

export const OpinionCardContentTime = styled.p`
  font-size: small;
  font-style: italic;
`;

export const OpinionReplyCard = styled.div`
  background-color: papayawhip;
  width: auto;
  margin-left: ${(props) => props.indent};
  padding: 10px;
  border-left: thick solid tan;
`;

export const OpinionReplyCardContent = styled.div`
  padding: 5px;
  transition: 0.5s;
  &:hover {
    background-color: seashell;
  }
  position: relative;
`;

export const OpinionReplyCardContentTime = styled.p`
  font-size: small;
  font-style: italic;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.color};
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${(props) => props.right};
  transition: 0.5s;
  &:hover {
    color: ${(props) => props.color};
    cursor: pointer;
  }
`;

export const VoteCount = styled.p`
  color: darkgrey;
  display: block;
  position: absolute;
  top: 80%;
  transform: translateY(-50%);
  right: ${(props) => props.right};
  transition: 0.5s;
`;
