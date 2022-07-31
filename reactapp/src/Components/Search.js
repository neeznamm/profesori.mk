import React, { useEffect, useState } from "react";
import JSOG from "jsog";
import { transliterate } from "../Util/transliterate";
import {
  SearchDropdownContentSmall,
  SearchDropdownSmall,
} from "./Search.style";
function Search() {
  const [query, setQuery] = useState("");
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const url = `http://192.168.0.17:8080/public/professors/nameContains/${transliterate(
      query
    )}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        var cyclicGraph = await response.json();
        var jsogStructure = JSOG.encode(cyclicGraph); // has { '@ref': 'ID' } links instead of cycles
        cyclicGraph = JSOG.decode(jsogStructure);
        setProfessors(cyclicGraph);
        //setLoaded(true);
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (query.length > 2) fetchData();
  }, [query]);

  return (
    <div style={{ position: "relative" }}>
      <input
        placeholder="Пребарувај..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.length > 2 &&
        professors.slice(0, 10).map((professor) => (
          <SearchDropdownSmall>
            <div key={professor.professorId}>
              <SearchDropdownContentSmall weight="bold" size="medium">
                {professor.professorName}
              </SearchDropdownContentSmall>
              <SearchDropdownContentSmall weight="normal" size="smaller">
                {professor.faculty.facultyName}
              </SearchDropdownContentSmall>
            </div>
          </SearchDropdownSmall>
        ))}
    </div>
  );
}

export default Search;
