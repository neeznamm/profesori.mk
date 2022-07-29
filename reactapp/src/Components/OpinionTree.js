function OpinionTree({ professor }) {
  function displayChildPosts(post) {
    if (post == null) return;
    return (
      <div key={post.postId}>
        <p>Содржина: {post.content}</p>
        {post.children.map((child) => displayChildPosts(child))}
      </div>
    );
  }

  return (
    <div className="opinionTree">
      {professor.relatedOpinions.map((opinion) => {
        if (opinion.hasOwnProperty("title")) {
          return (
            <div key={opinion.postId}>
              <p>Наслов: {opinion.title}</p>
              <p>Содржина: {opinion.content}</p>
              {opinion.children.map((child) => displayChildPosts(child))}
            </div>
          );
        }
      })}
    </div>
  );
}

export default OpinionTree;
