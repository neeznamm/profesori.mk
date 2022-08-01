import { Outlet } from "react-router-dom";
import { MainWrapper, MainTitle } from "./Components/Main.style";
import Search from "./Components/Search.js";

export default function App() {
  //document.body.style = "background: red;";
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
      <MainTitle>profesori.mk</MainTitle> <Search />
      <Outlet />
    </MainWrapper>
  );
}
