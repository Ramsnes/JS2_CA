import { fetcher } from "./fetcher.js";
import { LOGIN_API_URL, POSTS_API_URL } from "./common/constants.js";
import { addToLocalStorage } from "./common/utils/localStorageUtil.js";

const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

async function displayPosts() {
  const posts = await fetcher(POSTS_API_URL, { method: "GET" }, true);
  console.log(posts);
  // Pretend to display the posts
}

async function loginUser(user) {
  const postBody = JSON.stringify(user);
  try {
    // Make sure to validate email domain on the server side
    const userLoginData = await fetcher(
      LOGIN_API_URL,
      {
        method: "POST",
        body: postBody,
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );

    // Assuming the server returns a token on successful login
    const token = userLoginData.accessToken;

    // Ensure that the email is from a valid domain
    const validEmailDomains = ["@noroff.no", "@stud.noroff.no"];
    const isValidEmail = validEmailDomains.some((domain) =>
      user.email.endsWith(domain)
    );

    if (isValidEmail) {
      addToLocalStorage("accessToken", token);
      window.location.href = "/profile/index.html";
    } else {
      console.error("Invalid email domain");
    }
  } catch (error) {
    console.error("Login failed", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userLoginDetails = {
    email: email.value,
    password: password.value,
  };
  await loginUser(userLoginDetails); //hoisted
  displayPosts();
});
