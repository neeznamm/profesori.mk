import React, { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import axios from "../api/axios";
import Cookies from "js-cookie";
const LOGIN_URL = "/login";

const Login = () => {
  const { auth, setAuth } = useContext(AuthApi);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      LOGIN_URL,
      `username=${username}&password=${password}`,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          withCredentials: true,
        },
      }
    );
    if (!response.request.responseURL.includes("error")) {
      // ako NE redirektira na /login?error
      Cookies.set("JSESSIONID", response.data.sessionId);
      setAuth(true);
      setErrMsg("");
    } else {
      setErrMsg("Погрешно корисиничко име и/или лозинка");
    }

    setUsername("");
    setPassword("");
  };

  return auth ? (
    <Navigate to="/user_dashboard" />
  ) : (
    <div style={{ marginTop: "140px" }}>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Најава</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">E-mail:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <label htmlFor="password">Лозинка:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Најави се</button>
      </form>
    </div>
  );
};

export default Login;
