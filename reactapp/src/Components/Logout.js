import React, { useContext } from "react";
import AuthApi from "../api/AuthApi";
import Cookies from "js-cookie";

function Logout() {
  const { auth, setAuth } = useContext(AuthApi);

  const handleLogout = () => {
    setAuth(false);
    Cookies.remove("JSESSIONID");
  };

  return <button onClick={handleLogout}>Одјави се</button>;
}

export default Logout;
