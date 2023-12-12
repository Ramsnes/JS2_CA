// postDetails.js
// viewing post by id on new html
import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // Fetch post details
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;

  fetcher(apiUrl, { method: "GET" }, true)
    .then((postDetails) => {
      console.log("Post Details:", postDetails);
      document.title = `Post - ${postDetails.title}`;
      renderPostDetails(postDetails);
    })
    .catch((error) => {
      console.error("Error fetching post details", error);
    });
});

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
    <a href="edit-post.html?id=${postDetails.id}" class="btn btn-primary">Navigate to Edit Post</a>
    <button class="btn btn-danger" onclick="deletePost(${postDetails.id})">Delete</button>
  `;

  // Append the post details to the post container
  postContainer.appendChild(postElement);

  // Edit
  const editPostButton = postElement.querySelector("#editPostButton");
  editPostButton.addEventListener("click", () => editPost(postDetails.id));

  // Delete
  const deletePostButton = postElement.querySelector("#deletePostButton");
  deletePostButton.addEventListener("click", () => deletePost(postDetails.id));
}
