import React, { useState, useContext } from "react";
import AuthApi from "../api/AuthApi";

import Logout from "../Components/Logout";

function User() {
  const { auth, setAuth } = useContext(AuthApi);

  return (
    <>
      user page
      <Logout />
    </>
  );
}

export default User;
