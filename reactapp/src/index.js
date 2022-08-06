import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Professor from "./Pages/Professor";
import SearchResults from "./Pages/SearchResults";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="professor">
          <Route path=":professorId" element={<Professor />} />
        </Route>
        <Route path="search" element={<SearchResults />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
