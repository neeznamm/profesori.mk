export const findParentThread = (post) => {
    if (post.parent === null) return post;
    return findParentThread(post.parent);
}