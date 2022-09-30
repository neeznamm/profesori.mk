import styled from "styled-components";

export const LoginInput = styled.input`
  height: 30px;
  width: 100%;
  margin: 15px;
  padding: 15px;
  font-size: 16px;
  border: 2px solid #ccc;
`;

export const LoginButton = styled.button`
  background-color: rgba(0, 102, 204, 1);
  opacity: 0.6;
  padding: 5px 16px;
  transition: 0.4s;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  color: white;
  border: 0;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  width: 100%;
`;

export const RequiredAsterisk = styled.p`
  color: rgba(0, 102, 204, 1);
  font-weight: bold;
  position: absolute;
  right: 38px;
  top: ${(props) => props.top};
  font-size: 18px;
`;

export const FieldConstraintModal = styled.div`
  width: 400px;
  padding: 15px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  display: block;
  transition: opacity 0.4s ease-out;
  opacity: ${(props) => props.opacity};
  position: absolute;
  right: ${(props) => props.right};
  top: ${(props) => props.top};
`;
