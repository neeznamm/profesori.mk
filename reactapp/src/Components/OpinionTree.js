function OpinionTree({ professor }) {
  var renderedOpinionIds = [];
  var postCount; // za da ne go pokazuva ispod postot

  function displayChildPosts(child) {
    if (child == null) return;
    postCount = renderedOpinionIds.push(child.postId);
    return (
      <div key={child.postId}>
        <p>{child.author.username} реплицирал</p>
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
              <p>{opinion.author.username} напишал</p>
              <p>Наслов: {opinion.title}</p>
              <p>Содржина: {opinion.content}</p>
              {opinion.children.map((child) => displayChildPosts(child))}
              <hr />
            </div>
          );
        }
      })}
    </div>
  );
}

export default OpinionTree;
