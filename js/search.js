import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

// Event listener for the search form submission
document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    // Get the search input value
    const searchInput = document.getElementById("searchInput").value;
    // Does search API call
    if (searchInput.trim() !== "") {
      const searchResults = await searchPosts(searchInput);
      displaySearchResults(searchResults);
    }
  });

// Function to perform a search for posts
async function searchPosts(search) {
  // Check if the search input is empty
  console.log("Search value:", search);

  // Construct the API URL with additional search criteria
  const apiUrl = `${BASE_API_URL}/social/posts?_tag=${search}&_active=true&_author=true&_comments=true&_reactions=true`;

  try {
    // Make the API call and return the search results
    const allPosts = await fetcher(apiUrl, { method: "GET" }, true);

    // Filter posts based on the search term in tag, body, and author's name
    const searchResults = allPosts.filter(
      (post) =>
        post.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        ) ||
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.author.name.toLowerCase().includes(search.toLowerCase())
    );

    // Check if searchResults is an array
    if (Array.isArray(searchResults)) {
      return searchResults;
    } else {
      console.error("Error: Search results is not an array", searchResults);
      return [];
    }
  } catch (error) {
    console.error("Error searching posts", error);
    return []; // Returns an empty array on error
  }
}

// Function to display search results in the UI
function displaySearchResults(results) {
  const postsContainer = document.getElementById("postsContainer");
  // Clear existing posts
  postsContainer.innerHTML = "";

  if (results.length === 0) {
    // Display a message when no results are found
    postsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    // Display search results
    results.forEach((post) => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  }
}

// Function to create an HTML element for a single post
function createPostElement(post) {
  // Create and return the HTML element for a single post
  const postElement = document.createElement("div");
  postElement.className = "card m-3 small-card p-0";
  postElement.innerHTML = `
      <img src="${post.media}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
        <!-- Add other post details as needed -->
      </div>
    `;
  return postElement;
}
