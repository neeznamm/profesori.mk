import styled from "styled-components";

export const EntityUl = styled.ul`
  list-style: none;
  padding-left: 5px;
`;

export const EntityLi = styled.li`
  padding: 10px;
  margin: 15px 0px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => props.bgcolor};
  box-shadow: 2px 2px 5px #aaaaaa;
  position: relative;
`;

export const EntityParam = styled.p`
  position: absolute;
  right: 30px;
  top: 10px;
  font-style: italic;
  font-size: 16px;
`;

export const EntityTypeSelector = styled.div`
  box-shadow: ${(props) => props.boxshadow};
  width: 50%;
  height: 50px;
  opacity: 0.6;
  margin: 15px 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  letter-spacing: 2px;
  transition: 0.4s;
  &:hover {
    box-shadow: ${(props) => props.boxshadowhover};
    font-weight: bold;
    cursor: ${(props) => props.cursor};
    opacity: ${(props) => props.opacityhover};
  }
`;
