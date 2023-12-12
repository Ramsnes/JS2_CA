// editPost.js
import { fetcher } from "./fetcher.js";
import { updatePost } from "./put_API.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const postIdFromUrl = new URLSearchParams(window.location.search).get("id");
  const postId = parseInt(postIdFromUrl, 10);

  if (isNaN(postId)) {
    console.error("Invalid Post ID. Cannot edit post.");
    return;
  }

  const apiUrl = `${BASE_API_URL}/social/posts/${postId}`;

  fetcher(apiUrl, { method: "GET" }, true)
    .then((postDetails) => {
      document.getElementById("editPostTitle").value = postDetails.title;
      document.getElementById("editPostBody").value = postDetails.body;
      document.getElementById("editPostMedia").value = postDetails.media;
    })
    .catch((error) => {
      console.error("Error fetching post details for editing", error);
    });

  const editPostForm = document.getElementById("editPostForm");
  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedPostTitle = document.getElementById("editPostTitle").value;
    const updatedPostBody = document.getElementById("editPostBody").value;
    const updatedPostMedia = document.getElementById("editPostMedia").value;

    const updatedPostData = {
      title: updatedPostTitle,
      body: updatedPostBody,
      media: updatedPostMedia,
      updated: new Date().toISOString(),
    };

    try {
      await updatePost(postId, updatedPostData); // Assume you have an updatePost function in postService.js

      window.location.href = `index.html?id=${postId}`;
    } catch (error) {
      console.error("Error updating post:", error);
    }
  });
});
