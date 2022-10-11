import React from "react";
import { MainWrapper } from "../Components/Styled/Main.style";
import { MainTitle } from "../Components/Styled/Main.style";

const NotFound = () => {
  return (
    <MainWrapper>
      <style>
        {
          "body { background-color: papayawhip;} * {margin: 0; padding: 0; box-sizing: border-box;}"
        }
      </style>
      <a href="/">
        <MainTitle>profesori.mk</MainTitle>
      </a>{" "}
      <div style={{ marginTop: "140px" }}>
        <h1 style={{ textAlign: "center" }}>Страницата не е пронајдена.</h1>
      </div>
    </MainWrapper>
  );
};

export default NotFound;
