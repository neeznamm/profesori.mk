import { OpinionCard } from "./OpinionCard.style";

function OpinionTree({ professor }) {
  var renderedOpinionIds = [];
  var postCount; // za da ne go pokazuva ispod postot

  function displayChildPosts(child) {
    if (child == null) return;
    postCount = renderedOpinionIds.push(child.postId);
    return (
      <div key={child.postId}>
        <p>
          <a href="#">{child.author.username}</a> реплицирал
        </p>
        <p>Содржина: {child.content}</p>
        {child.children.map((childOfChild) => displayChildPosts(childOfChild))}
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
                <p>
                  <a href="#">{opinion.author.username}</a> напишал
                </p>

                <p>{opinion.title}</p>
                <p>{opinion.content}</p>
                <p>{Date(opinion.timePosted)}</p>
              </OpinionCard>
              {opinion.children.map((child) => displayChildPosts(child))}
            </div>
          );
        }
      })}
    </div>
  );
}

export default OpinionTree;
