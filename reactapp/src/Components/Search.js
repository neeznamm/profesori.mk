import React, { useEffect, useState } from "react";
import JSOG from "jsog";
import { transliterate } from "../Util/transliterate";
import {
  SearchResult,
  SearchResultText,
  SearchDropdown,
  SearchResultLink,
  SearchBox,
} from "./Styled/Search.style";
import { useNavigate } from "react-router";
function Search() {
  const [query, setQuery] = useState("");
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([fetch(`http://192.168.1.108:8080/public/professors/nameContains/${transliterate(query)}`),
          fetch(`http://192.168.1.108:8080/public/subjects/nameContains/${transliterate(query)}`)])
            .then(([resProfessors, resSubjects]) => Promise.all([resProfessors.json(), resSubjects.json()]))
            .then(([dataProfessors, dataSubjects]) => {
              let cyclicGraph1 = dataProfessors;
              let jsogStructure1 = JSOG.encode(cyclicGraph1);
              cyclicGraph1 = JSOG.decode(jsogStructure1);
              setProfessors(cyclicGraph1);

              let cyclicGraph2 = dataSubjects;
              let jsogStructure2 = JSOG.encode(cyclicGraph2);
              cyclicGraph2 = JSOG.decode(jsogStructure2);
              setSubjects(cyclicGraph2);
            })
      } catch (error) {
        console.log("Fetching error", error);
      }
    };

    if (query.length > 3) fetchData();
  }, [query]);

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setExpanded(false);
      navigate("/search", { state: professors.concat(subjects) });
    }
  };

  const [expanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  function close() {
    setExpanded(false);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "fit-content",
        float: "right",
      }}
    >
      <SearchBox
        placeholder="Пребарувај..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onFocus={expand}
        onBlur={close}
      />
      <SearchDropdown
        display={
          query.length > 3 && (professors.length > 0 || subjects.length > 0) && expanded
            ? "block"
            : "none"
        }
      >
        {query.length > 3 &&
          professors.concat(subjects).slice(0, 7).map((match) => (
            <SearchResult
              key={match.professorId !== undefined ? match.professorId : match.subjectId}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              margin="0"
            >
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
      </SearchDropdown>
    </div>
  );
}

export default Search;
