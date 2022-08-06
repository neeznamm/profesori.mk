import styled from "styled-components";
import searchicon from "../searchicon.png";

export const SearchSmall = styled.input`
  width: 350px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  font-size: 16px;
  background-color: #f9f9f9;
  background-image: url(${searchicon});
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  margin-top: 10px;
`;

export const SearchDropdownSmall = styled.div`
  display: ${(props) => props.display};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  width: 350px;
  padding: 0;
`;

export const SearchDropdownResultSmall = styled.div`
  &:hover {
    background-color: papayawhip;
    border: 1px solid blue;
    text-decoration: underline 1px blue;
  }
  padding: 10px;
`;

export const SearchDropdownResultLinkSmall = styled.a`
  text-decoration: none;
  color: black;
`;

export const SearchDropdownTextSmall = styled.p`
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};
`;
