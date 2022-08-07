import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
const LOGIN_URL = "/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

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
    setUsername("");
    setPassword("");
    setSuccess(true);
  };

  return success ? (
    <div style={{ marginTop: "140px" }}>
      <h1>Успешна најава!</h1>
      <br />
      <p>
        <a href="/">Оди на почетната страница</a>
      </p>
    </div>
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
