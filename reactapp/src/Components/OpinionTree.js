import {
  OpinionCard,
  OpinionCardContent,
  OpinionCardContentTime,
  OpinionCardContentTitle,
  OpinionReplyCard,
  OpinionReplyCardContent,
  OpinionReplyCardContentTime,
  StyledFontAwesomeIcon,
} from "./OpinionCard.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
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
          <OpinionReplyCardContent>
            <p>
              <a href="#">{child.author.username}</a> му реплицирал на{" "}
              {parentPostAuthorUsername}
            </p>
            <p>{child.content}</p>
            <OpinionReplyCardContentTime>
              {dateConverter(
                new Date(child.timePosted).toString().slice(4, -43)
              )}
            </OpinionReplyCardContentTime>
            <StyledFontAwesomeIcon
              icon={solid("thumbs-up")}
              right={50 + "px"}
            />
            <StyledFontAwesomeIcon
              icon={solid("thumbs-down")}
              right={10 + "px"}
            />
            <StyledFontAwesomeIcon icon={solid("reply")} right={90 + "px"} />
          </OpinionReplyCardContent>
          {child.children.map((childOfChild) =>
            displayChildPosts(
              childOfChild,
              child.author.username,
              replyIndent + 30
            )
          )}
        </OpinionReplyCard>
      </div>
    );
  }

  return (
    <div className="opinionTree">
      {professor.relatedOpinions.map((opinion) => {
        if (!renderedOpinionIds.includes(opinion.postId)) {
          postCount = renderedOpinionIds.push(opinion.postId);
          return (
            <div key={opinion.postId}>
              <OpinionCard>
                <OpinionCardContent>
                  <p>
                    <a href="#">{opinion.author.username}</a> напишал
                  </p>
                  <OpinionCardContentTitle>
                    {opinion.title}
                  </OpinionCardContentTitle>
                  <p>{opinion.content}</p>
                  <OpinionCardContentTime>
                    {dateConverter(
                      new Date(opinion.timePosted).toString().slice(4, -43)
                    )}
                  </OpinionCardContentTime>
                  <StyledFontAwesomeIcon
                    icon={solid("thumbs-up")}
                    right={50 + "px"}
                  />
                  <StyledFontAwesomeIcon
                    icon={solid("thumbs-down")}
                    right={10 + "px"}
                  />
                  <StyledFontAwesomeIcon
                    icon={solid("reply")}
                    right={90 + "px"}
                  />
                </OpinionCardContent>
                {opinion.children.map((child) =>
                  displayChildPosts(child, opinion.author.username, 30)
                )}
              </OpinionCard>
            </div>
          );
        }
      })}
    </div>
  );
}

export default OpinionTree;
