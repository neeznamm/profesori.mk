import React, { useState, useEffect } from "react";
import JSOG from "jsog";
import axios from "../api/axios";
import Logout from "./Logout";

function UserHeader({ user, userLoaded }) {
  return userLoaded ? (
    <div style={{ float: "left", marginTop: 20, marginLeft: 40 }}>
      Најавен/а: <a href="/user_dashboard">{user.username}</a> <Logout />{" "}
    </div>
  ) : (
    <div style={{ float: "left", marginTop: 25, marginLeft: 60 }}>
      се вчитува...
    </div>
  );
}

export default UserHeader;
