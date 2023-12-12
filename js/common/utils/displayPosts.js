async function displayPosts() {
  const posts = await fetcher(POSTS_API_URL, { method: "GET" }, true);
  console.log(posts);
  // Pretend to display the posts
}

export { displayPosts };
