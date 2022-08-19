import styled from "styled-components";

export const UserDetailsCard = styled.div`
  width: auto;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const UserDetailsCardContent = styled.p`
  padding-top: 7px;
  padding-bottom: 7px;
`;

export const LogoutButton = styled.button`
  font-family: "Roboto Mono", monospace;
  background-color: tan;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  font-size: 16px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
