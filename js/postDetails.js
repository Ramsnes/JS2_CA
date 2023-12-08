// postDetails.js

import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id"); // Use "id" here
  console.log("Post ID:", postId);

  // Fetch post details
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;

  fetcher(apiUrl, { method: "GET" }, true)
    .then((postDetails) => {
      console.log("Post Details:", postDetails);

      // Update the page title dynamically
      document.title = `Post - ${postDetails.title}`;

      // Call the renderPostDetails function to render the post details
      renderPostDetails(postDetails);
    })
    .catch((error) => {
      console.error("Error fetching post details", error);
    });
});

// Function to render the dynamically fetched post details
function renderPostDetails(postDetails) {
  const postContainer = document.getElementById("postDetailsContainer");

  // Create HTML elements for the post details
  const postElement = document.createElement("div");
  postElement.className = "post-details";

  // Add post content (modify this based on your post structure)
  postElement.innerHTML = `
    <h1 id="dynamicPostTitle" class="mt-5 mb-4">${postDetails.title}</h1>
    <p id="dynamicPostBody">${postDetails.body}</p>
    <img class="post-image" src="${postDetails.media}">
  `;

  // Append the post details to the post container
  postContainer.appendChild(postElement);
}
