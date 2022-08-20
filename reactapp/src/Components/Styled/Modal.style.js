import styled, { keyframes } from "styled-components";

export const AddOpinionButton = styled.button`
  font-family: "Roboto Mono", monospace;
  background-color: #0066cc;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 16px;
  opacity: 0.6;
  transition: 0.3s;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  float: right;
  font-weight: bold;
`;

export const Modal = styled.div`
  display: ${(props) => props.display};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const animatetop = keyframes`
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  animation: ${animatetop} 0.4s;
`;

export const ModalClose = styled.span`
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: 0.4s;
  &:hover,
  :focus {
    background-color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const ModalHeader = styled.div`
  padding: 2px 16px;
  background-color: rgba(0, 102, 204, 0.6);
  color: white;
  height: 40px;
  margin-bottom: 30px;
`;

export const ModalFooter = styled.button`
  padding: 2px 16px;
  background-color: rgba(0, 102, 204, 1);
  opacity: 0.6;
  color: white;
  height: 40px;
  margin-top: 30px;
  transition: 0.4s;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  font-family: "Roboto Mono", monospace;
  width: 100%;
  border: 0;
  font-size: 18px;
  font-weight: bold;
`;

export const ModalBody = styled.div`
  padding: 2px 16px;
`;

export const ModalInput = styled.input`
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
  height: 30px;
  width: 372px;
  padding: 12px 16px;
  border: 1px solid #ccc;
`;

export const ModalTextarea = styled.textarea`
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
  padding: 12px 16px;
  border: 1px solid #ccc;
  resize: none;
`;
