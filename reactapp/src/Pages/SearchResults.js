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
      {location.state.map((match) => (
        <SearchResult key={match.professorId !== undefined ? match.professorId : match.subjectId} margin="10px">
          <SearchResultLink href={`/${match.professorId !== undefined ? 'professor': 'subject'}/` + `${match.professorId !== undefined ? match.professorId : match.subjectId}`}>
            <SearchResultText weight="bold" size="medium">
              {match.professorId !== undefined ? match.professorName : match.subjectName}
            </SearchResultText>
            <SearchResultText weight="normal" size="er">
              {match.professorId !== undefined ? match.faculty.facultyName : match.studyProgramme.faculty.facultyName}
            </SearchResultText>
          </SearchResultLink>
        </SearchResult>
      ))}
    </SearchResultsWrapper>
  );
}

export default SearchResults;
