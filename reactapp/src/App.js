import Professor from "./Pages/Professor";
import SearchResults from "./Pages/SearchResults";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import UserDashboard from "./Pages/UserDashboard";
import Subject from "./Pages/Subject";
import University from "./Pages/University";
import Faculty from "./Pages/Faculty";
import { useEffect, useState, useMemo } from "react";
import AuthApi from "./api/AuthApi";
import Cookies from "js-cookie";
import NotFound from "./Pages/NotFound";
import Topic from "./Pages/Topic";
import LoadingSpinner from "./Components/Styled/LoadingSpinner.style";

export default function App() {
  const [auth, setAuth] = useState(false);
  const variableAuth = useMemo(() => ({ auth, setAuth }), [auth]);
  const [authLoaded, setAuthLoaded] = useState(false);

  const readCookie = async () => {
    const session = Cookies.get("JSESSIONID");
    if (session) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    setAuthLoaded(true);
  };

  useEffect(() => {
    document.title = "profesori.mk";
    readCookie();
  }, []);

  const ProtectedRoute = ({ auth, children }) => {
    if (authLoaded) {
      if (!auth) {
        return <Navigate to="/login" replace />;
      }
      return children;
    } else {
      return <LoadingSpinner/>;
    }
  };

  return (
    <AuthApi.Provider value={variableAuth}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="registration" element={<Registration />}></Route>
            <Route path="professor">
              <Route path=":professorId" element={<Professor />} />
            </Route>
            <Route path="university/:universityId" element={<University />} />
            <Route path="faculty/:facultyId" element={<Faculty />} />
            <Route path="subject/:subjectId" element={<Subject />} />
            <Route path="topic/:topicId" element={<Topic />} />
            <Route path="search" element={<SearchResults />}></Route>
            <Route
              path="user_dashboard"
              element={
                <ProtectedRoute auth={auth}>{<UserDashboard />}</ProtectedRoute>
              }
            ></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthApi.Provider>
  );
}
