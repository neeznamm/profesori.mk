import React, { useEffect, useState, useContext } from "react";
import {
  OpinionCard,
  OpinionCardContent,
  OpinionCardContentTime,
} from "../Components/Styled/OpinionCard.style";
import {
  UserDetailsCard,
  UserDetailsCardContent,
} from "../Components/Styled/UserDetails.style";
import { dateConverter } from "../Util/dateConverter";
import axios from "../api/axios";
import JSOG from "jsog";
import AuthApi from "../api/AuthApi";

function UserDashboard() {
  const { auth, setAuth } = useContext(AuthApi);

  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const url = `http://192.168.0.17:8080/secure/currentUser`;

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

    if (auth) fetchUser();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (user === null) window.location.reload(false); <---- :-)
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  function findParentThread(post) {
    if (post.parent === null) return post;
    return findParentThread(post.parent);
  }

  return loadedUser ? (
    <>
      <h3>Кориснички податоци:</h3>
      <UserDetailsCard>
        {user.fullName && (
          <UserDetailsCardContent>
            <b>Име:</b> {user.fullName}{" "}
          </UserDetailsCardContent>
        )}
        <UserDetailsCardContent>
          <b>Корисничко име:</b> {user.username}{" "}
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
                <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                  во дискусија за{" "}
                  {post.targetProfessor !== undefined ? (
                    <a href={"/professor/" + post.targetProfessor.professorId}>
                      {post.targetProfessor.professorName}
                    </a>
                  ) : (
                    <a
                      href={
                        post.parent === null
                          ? "/topic/" + post.postId
                          : "/topic/" + findParentThread(post).postId
                      }
                    >
                      {post.targetSubject.subjectName}
                    </a>
                  )}
                </p>
                <p style={{ marginBottom: "10px" }}>{post.content}</p>
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
