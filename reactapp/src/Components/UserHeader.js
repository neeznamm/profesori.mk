import React, { useState, useEffect } from "react";
import JSOG from "jsog";
import axios from "../api/axios";
import Logout from "./Logout";
import LoadingSpinner from "./Styled/LoadingSpinner.style";

function UserHeader({}) {
  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const url = `http://192.168.1.254:8080/secure/currentUser`;

    const fetchUser = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });
        var cyclicGraph = await response.data;
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setUser(cyclicGraph);
        setLoadedUser(true);
      } catch (error) {
        setFetchError(true);
      }
    };

    fetchUser();
  }, []);

  return loadedUser ? (
    <div style={{ float: "left", marginTop: 20, marginLeft: 10 }}>
      Најавен/а: <a href="/user_dashboard">{user.username}</a> <Logout />{" "}
    </div>
  ) : (
    <div style={{ float: "left", marginTop: 25, marginLeft: 10 }}>
      <LoadingSpinner/>
    </div>
  );
}

export default UserHeader;
