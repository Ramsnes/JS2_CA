// editPost.js
import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // Attempt to get postId from the URL
  const postIdFromUrl = new URLSearchParams(window.location.search).get("id");
  console.log("Post ID from URL:", postIdFromUrl); // Add this line for debugging

  // Convert postId to a number using parseInt
  const postId = parseInt(postIdFromUrl, 10);
  console.log("Parsed Post ID:", postId); // Add this line for debugging

  // Check if the conversion was successful
  if (isNaN(postId)) {
    console.error("Invalid Post ID. Cannot edit post.");
    // Handle this case as needed
    return;
  }

  // Construct the apiUrl using the postId
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}`;

  // Fetch existing post details
  fetcher(apiUrl, { method: "GET" }, true)
    .then((postDetails) => {
      // Populate the form fields with existing post details
      document.getElementById("editPostTitle").value = postDetails.title;
      document.getElementById("editPostBody").value = postDetails.body;
      document.getElementById("editPostMedia").value = postDetails.media;
    })
    .catch((error) => {
      console.error("Error fetching post details for editing", error);
    });

  // Handle form submission
  const editPostForm = document.getElementById("editPostForm");
  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get updated post details from the form
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
      // Send update request to the server
      await fetcher(
        apiUrl,
        {
          method: "PUT", // Assuming your API supports updating via PUT
          body: JSON.stringify(updatedPostData),
        },
        true
      );

      // Redirect to the post details page after successful update
      window.location.href = `post-details.html?id=${postId}`;
    } catch (error) {
      console.error("Error updating post:", error);
    }
  });
});
