import styled from "styled-components";

export const SearchDropdownSmall = styled.div`
  display: block;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;

export const SearchDropdownContentSmall = styled.p`
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};
`;
