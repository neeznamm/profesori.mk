import Professor from "./Pages/Professor";
import SearchResults from "./Pages/SearchResults";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="professor">
            <Route path=":professorId" element={<Professor />} />
          </Route>
          <Route path="search" element={<SearchResults />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
