import React, { useState, useEffect } from "react";
import JSOG from "jsog";
import axios from "../api/axios";
import {
  OpinionCard,
  OpinionCardContent,
  OpinionCardContentTime,
  OpinionCardContentTitle,
} from "../Components/Styled/OpinionCard.style";
import {
  UserDetailsCard,
  UserDetailsCardContent,
} from "../Components/Styled/UserDetails.style";
import { dateConverter } from "../Util/dateConverter";

function UserDashboard() {
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
    <>
      <h3>Кориснички податоци:</h3>
      <UserDetailsCard>
        <UserDetailsCardContent>
          <b>Име:</b> {user.fullName}{" "}
          <i style={{ fontSize: 14, color: "#0066cc" }}>
            (<u>промени</u>)
          </i>
        </UserDetailsCardContent>
        <UserDetailsCardContent>
          <b>Корисничко име:</b> {user.username}{" "}
          <i style={{ fontSize: 14, color: "#0066cc" }}>
            (<u>промени</u>)
          </i>
        </UserDetailsCardContent>
        <UserDetailsCardContent>
          <b>E-mail:</b> {user.email}
        </UserDetailsCardContent>
        <UserDetailsCardContent>
          <b>Карма:</b> {user.karma}
        </UserDetailsCardContent>
      </UserDetailsCard>
      {user.authoredPosts.length > 0 ? (
        <h3 style={{ marginBottom: "10px" }}>Ваши мислења:</h3>
      ) : (
        <h3>Немате објавени мислења</h3>
      )}
      {user.authoredPosts.map((post) => {
        return (
          <div key={post.postId}>
            <OpinionCard>
              <OpinionCardContent>
                <p>
                  Во дискусија за{" "}
                  <a href={"/professor/" + post.targetProfessor.professorId}>
                    {post.targetProfessor.professorName}
                  </a>
                </p>
                <OpinionCardContentTitle>{post.title}</OpinionCardContentTitle>
                <p>{post.content}</p>
                <OpinionCardContentTime>
                  {dateConverter(
                    new Date(post.timePosted).toString().slice(4, -43)
                  )}
                </OpinionCardContentTime>
              </OpinionCardContent>
            </OpinionCard>
          </div>
        );
      })}
    </>
  ) : (
    <>се вчитува...</>
  );
}

export default UserDashboard;
