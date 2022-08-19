import React, { useContext } from "react";
import AuthApi from "../api/AuthApi";
import Cookies from "js-cookie";
import { LogoutButton } from "./Styled/UserDetails.style";
import { Navigate } from "react-router-dom";

function Logout() {
  const { auth, setAuth } = useContext(AuthApi);

  const handleLogout = () => {
    setAuth(false);
    Cookies.remove("JSESSIONID");
  };

  return <LogoutButton onClick={handleLogout}>Одјави се</LogoutButton>;
}

export default Logout;
