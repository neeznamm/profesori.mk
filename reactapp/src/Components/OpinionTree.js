import { OpinionCard, OpinionReplyCard } from "./OpinionCard.style";
import { dateConverter } from "../Util/dateConverter";

function OpinionTree({ professor }) {
  var renderedOpinionIds = [];
  var postCount; // za da ne go pokazuva ispod postot

  function displayChildPosts(child, parentPostAuthorUsername, replyIndent) {
    if (child == null) return;
    postCount = renderedOpinionIds.push(child.postId);
    return (
      <div key={child.postId}>
        <OpinionReplyCard indent={replyIndent + "px"}>
          <p>
            <a href="#">{child.author.username}</a> му реплицирал на{" "}
            {parentPostAuthorUsername}
          </p>
          <p>{child.content}</p>
          <p>
            {dateConverter(new Date(child.timePosted).toString().slice(4, -43))}
          </p>
        </OpinionReplyCard>
        {child.children.map((childOfChild) =>
          displayChildPosts(
            childOfChild,
            child.author.username,
            replyIndent + 30
          )
        )}
      </div>
    );
  }

  return (
    <div className="opinionTree">
      {professor.relatedOpinions.map((opinion) => {
        if (!renderedOpinionIds.includes(opinion.postId)) {
          postCount = renderedOpinionIds.push(opinion.postId);
          var replyIndent = 30;
          return (
            <div key={opinion.postId}>
              <OpinionCard>
                <p>
                  <a href="#">{opinion.author.username}</a> напишал
                </p>

                <p>{opinion.title}</p>
                <p>{opinion.content}</p>
                <p>
                  {dateConverter(
                    new Date(opinion.timePosted).toString().slice(4, -43)
                  )}
                </p>
              </OpinionCard>
              {opinion.children.map((child) =>
                displayChildPosts(child, opinion.author.username, replyIndent)
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default OpinionTree;
