import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import {
  FieldConstraintModal,
  LoginButton,
  LoginInput,
  RequiredAsterisk,
} from "../Components/Styled/Login.style";
const REGISTRATION_URL = "/registration";

const Registration = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios(REGISTRATION_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          fullName: fullName,
          username: username,
          email: email,
          password: password,
        },
      });
      setRegistrationSuccessful(true);
    } catch (error) {
      setErrMsg("Некои од полињата се неправилни.");
    }
  };

  const [FieldConstraintModalOpacity1, setFieldConstraintModalOpacity1] =
    useState(0);
  const [FieldConstraintModalOpacity2, setFieldConstraintModalOpacity2] =
    useState(0);

  return registrationSuccessful === false ? (
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
        position: "relative",
      }}
    >
      <h2>Регистрација</h2>
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
          id="fullName"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          placeholder="Име"
          maxLength={42}
        />
        <LoginInput
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          placeholder="Корисничко име"
          maxLength={42}
          onFocus={(e) => {
            setFieldConstraintModalOpacity1(1);
          }}
          onBlur={(e) => {
            setFieldConstraintModalOpacity1(0);
          }}
        />
        <RequiredAsterisk top="142px">*</RequiredAsterisk>
        <LoginInput
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder="Email"
          maxLength={42}
        />
        <RequiredAsterisk top="206px">*</RequiredAsterisk>
        <LoginInput
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Лозинка"
          required
          maxLength={36}
          onFocus={(e) => {
            setFieldConstraintModalOpacity2(1);
          }}
          onBlur={(e) => {
            setFieldConstraintModalOpacity2(0);
          }}
        />
        <RequiredAsterisk top="270px">*</RequiredAsterisk>
        <p style={{ marginBottom: "10px", marginTop: "5px", fontSize: "14px" }}>
          Означените полиња се задолжителни.
        </p>
        <LoginButton>Регистрирај се</LoginButton>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          style={{ color: "red", marginTop: "20px" }}
        >
          {errMsg}
        </p>
      </form>

      <FieldConstraintModal
        opacity={FieldConstraintModalOpacity1}
        right="-420px"
        top="100px"
      >
        Корисничкото име мора да е составено од 6-30 алфанумерички знаци и долни
        црти (_) и мора да започнува со буква.
      </FieldConstraintModal>

      <FieldConstraintModal
        opacity={FieldConstraintModalOpacity2}
        right="-420px"
        top="230px"
      >
        Лозинката мора да биде долга 8-20 знаци и да содржи барем една цифра,
        една голема, една мала буква и еден од знаците !@#$%&*()-+=^.
      </FieldConstraintModal>
    </div>
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
        position: "relative",
      }}
    >
      <p>
        Успешна регистрација! На <b>{email}</b> е испратен токен за потврда на
        сметката.
      </p>
      <a href="/login" style={{ marginTop: "15px" }}>
        Оди на најава
      </a>
    </div>
  );
};

export default Registration;
