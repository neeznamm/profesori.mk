import React from "react";
import { useLocation } from "react-router";
import {
  SearchResultText,
  SearchResultsWrapper,
  SearchResult,
  SearchResultLink,
} from "../Components/Styled/Search.style";

function SearchResults() {
  const location = useLocation();

  return (
    <SearchResultsWrapper>
      <h3 style={{ marginBottom: "30px" }}>Резултати од пребарувањето:</h3>
      {location.state.map((professor) => (
        <SearchResult key={professor.professorId} margin="10px">
          <SearchResultLink href={"/professor/" + professor.professorId}>
            <SearchResultText weight="bold" size="medium">
              {professor.professorName}
            </SearchResultText>
            <SearchResultText weight="normal" size="er">
              {professor.faculty.facultyName}
            </SearchResultText>
          </SearchResultLink>
        </SearchResult>
      ))}
    </SearchResultsWrapper>
  );
}

export default SearchResults;
