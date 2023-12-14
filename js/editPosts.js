// editPost.js
import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // Fetche post detaljer
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}`;

  fetcher(apiUrl, { method: "GET" }, true)
    .then((postDetails) => {
      console.log("Post Details for Editing:", postDetails);

      const a = document.getElementById("editPostTitle");
      console.log(a);

      // inputs ferdig fylt
      document.getElementById("editPostTitle").value = postDetails.title;
      document.getElementById("editPostBody").value = postDetails.body;
      document.getElementById("editPostMedia").value = postDetails.media;
      document.getElementById("editPostTag").value = postDetails.tag;
    })
    .catch((error) => {
      console.error("Error fetching post details for editing", error);
    });
});

// even listener
document.getElementById("editPostForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // få values fra inputs felt
  const title = document.getElementById("editPostTitle").value;
  const body = document.getElementById("editPostBody").value;
  const media = document.getElementById("editPostMedia").value;

  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // PUT url med id
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}`;

  fetcher(
    apiUrl,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, media }),
    },
    true
  )
    .then(() => {
      console.log("Changes saved successfully");

      const redirectUrl = `/idPage/index.html?id=${postId}`;
      console.log(redirectUrl);
      window.location.href = redirectUrl;
    })
    .catch((error) => {
      console.error("Error updating post details", error);
    });
});
