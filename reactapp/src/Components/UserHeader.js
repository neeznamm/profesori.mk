import React, { useState, useEffect } from "react";
import JSOG from "jsog";
import axios from "../api/axios";
import Logout from "./Logout";

function UserHeader() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.17:8080/secure/currentUser",
          { withCredentials: true }
        );
        var cyclicGraph = await response.data;
        var jsogStructure = JSOG.encode(cyclicGraph);
        cyclicGraph = JSOG.decode(jsogStructure);
        setUser(cyclicGraph);
        setLoaded(true);
      } catch (error) {
        console.log("Fetching error", error);
      }
    };

    fetchData();
  }, []);

  return loaded ? (
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
