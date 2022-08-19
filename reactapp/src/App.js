import Professor from "./Pages/Professor";
import SearchResults from "./Pages/SearchResults";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import UserDashboard from "./Pages/UserDashboard";
import { useEffect, useState, useMemo } from "react";
import AuthApi from "./api/AuthApi";
import Cookies from "js-cookie";

export default function App() {
  const [auth, setAuth] = useState(false);
  const variableAuth = useMemo(() => ({ auth, setAuth }), [auth]);
  const [authLoaded, setAuthLoaded] = useState(false);

  const readCookie = async () => {
    const session = Cookies.get("JSESSIONID");
    if (session) {
      setAuth(true); // go stava true ako postoi takvo cookie (zasto auth=false na sekoe renderiranje)
    } else {
      setAuth(false);
    }
    setAuthLoaded(true);
  };

  useEffect(() => {
    readCookie();
  }, []);

  const ProtectedRoute = ({ auth, children }) => {
    if (authLoaded) {
      if (!auth) {
        return <Navigate to="/login" replace />;
      }
      return children;
    } else {
      return <div>се вчитува cookie...</div>;
    }
  };

  return (
    <AuthApi.Provider value={variableAuth}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="professor">
              <Route path=":professorId" element={<Professor />} />
            </Route>
            <Route path="search" element={<SearchResults />}></Route>
            <Route
              path="user_dashboard"
              element={
                <ProtectedRoute auth={auth}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthApi.Provider>
  );
}
