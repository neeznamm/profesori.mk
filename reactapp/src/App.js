import Professor from "./Pages/Professor";
import SearchResults from "./Pages/SearchResults";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import UserDashboard from "./Pages/UserDashboard";
import { useEffect, useState, useMemo } from "react";
import AuthApi from "./api/AuthApi";
import Cookies from "js-cookie";
import axios from "./api/axios";
import JSOG from "jsog";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const variableAuth = useMemo(() => ({ auth, setAuth }), [auth]);
  const [authLoaded, setAuthLoaded] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.17:8080/secure/currentUser",
        { withCredentials: true }
      );
      var cyclicGraph = await response.data;
      var jsogStructure = JSOG.encode(cyclicGraph);
      cyclicGraph = JSOG.decode(jsogStructure);
      setUser(cyclicGraph);
      setUserLoaded(true);
    } catch (error) {
      console.log("Fetching error", error);
    }
  };

  const readCookie = async () => {
    const session = Cookies.get("JSESSIONID");
    if (session) {
      setAuth(true); // go stava true ako postoi takvo cookie (zasto auth=false na sekoe renderiranje)
      fetchUser();
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
          <Route
            path="/"
            element={<Home user={user} userLoaded={userLoaded} />}
          >
            <Route path="login" element={<Login />}></Route>
            <Route path="professor">
              <Route
                path=":professorId"
                element={<Professor user={user} userLoaded={userLoaded} />}
              />
            </Route>
            <Route path="search" element={<SearchResults />}></Route>
            <Route
              path="user_dashboard"
              element={
                <ProtectedRoute auth={auth}>
                  {<UserDashboard user={user} userLoaded={userLoaded} />}
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthApi.Provider>
  );
}
