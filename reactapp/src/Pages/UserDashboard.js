import React, { useEffect } from "react";
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

function UserDashboard({ user, userLoaded }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user === null) window.location.reload(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return userLoaded ? (
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
