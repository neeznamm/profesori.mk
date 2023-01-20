import React, { useContext, useEffect, useState } from "react";
import { MainWrapper, MainTitle } from "./Styled/Main.style";
import { Outlet } from "react-router-dom";
import Search from "./Search";
import UserHeader from "./UserHeader";
import AuthApi from "../api/AuthApi";
import Logout from "./Logout";
import {LogoutButton} from "./Styled/UserDetails.style";

function Root({ user, userLoaded }) {
  const { auth, setAuth } = useContext(AuthApi);

  return (
    <MainWrapper>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
      </style>
      <style>
        {
          "body { background-color: papayawhip;} * {margin: 0; padding: 0; box-sizing: border-box;}"
        }
      </style>
      <a href="/">
        <MainTitle>profesori.mk</MainTitle>
      </a>{" "}
        <div style={{ float: "left", marginTop: 20, marginLeft: 40 }}>
            {!auth && <a href="/login"><LogoutButton style={{textDecoration:"underline", color:"black"}}>Најава/регистрација</LogoutButton></a>}{" "}
        </div>
      <Search />
      {auth && <UserHeader />}
      <div style={{ marginTop: "140px" }}/>
      <Outlet />
    </MainWrapper>
  );
}

export default Root;
