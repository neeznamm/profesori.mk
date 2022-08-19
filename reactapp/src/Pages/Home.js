import React, { useContext } from "react";
import { MainWrapper, MainTitle } from "../Components/Styled/Main.style";
import { Outlet } from "react-router-dom";
import Search from "../Components/Search";
import UserHeader from "../Components/UserHeader";
import AuthApi from "../api/AuthApi";

function Home() {
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
      <Search />
      {auth && <UserHeader />}
      <div style={{ marginTop: "140px" }}></div>
      <Outlet />
    </MainWrapper>
  );
}

export default Home;
