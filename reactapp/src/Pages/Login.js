import React, { useRef, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { LoginButton, LoginInput } from "../Components/Styled/Login.style";
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
      var in30Minutes = 1 / 48;
      Cookies.set("JSESSIONID", response.data.sessionId, {
        expires: in30Minutes,
      });
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
    <div
      style={{
        marginTop: "140px",
        display: "flex",
        alignItems: "center",
        flexFlow: "column",
        width: "fit-content",
        margin: "auto",
        border: "2px solid lightgrey",
        padding: "25px",
        boxShadow: "2px 2px 6px #aaaaaa",
        marginBottom: "80px",
      }}
    >
      <h2>Најава</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
        }}
      >
        <LoginInput
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          placeholder="Email"
        />
        <LoginInput
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Лозинка"
          required
        />
        <LoginButton>Најави се</LoginButton>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          style={{ color: "red", marginTop: "20px" }}
        >
          {errMsg}
        </p>
      </form>
      <p style={{ marginTop: "20px" }}>
        Немаш сметка? <a href="/registration">Регистрирај се</a>{" "}
      </p>
    </div>
  );
};

export default Login;
