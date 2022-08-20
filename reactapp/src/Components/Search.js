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

  useEffect(() => {
    const url = `http://192.168.0.19:8080/public/professors/nameContains/${transliterate(
      query
    )}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        var cyclicGraph = await response.json();
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setProfessors(cyclicGraph);
      } catch (error) {
        console.log("Fetching error", error);
      }
    };

    if (query.length > 2) fetchData();
  }, [query]);

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setExpanded(false);
      navigate("/search", { state: professors });
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
          query.length > 2 && professors.length > 0 && expanded
            ? "block"
            : "none"
        }
      >
        {query.length > 2 &&
          professors.slice(0, 7).map((professor) => (
            <SearchResult
              key={professor.professorId}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              margin="0"
            >
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
      </SearchDropdown>
    </div>
  );
}

export default Search;
