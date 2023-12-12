// login.js
import { fetcher } from "./fetcher.js";
import { LOGIN_API_URL, POSTS_API_URL } from "./common/constants.js";
import { addToLocalStorage } from "./common/utils/localStorageUtil.js";
import { displayPosts } from "./common/utils/displayPosts.js";

const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

async function loginUser(user) {
  const postBody = JSON.stringify(user);
  try {
    const userLoginData = await fetcher(
      LOGIN_API_URL,
      {
        method: "POST",
        body: postBody,
      },
      false
    );
    const token = userLoginData.accessToken;
    addToLocalStorage("accessToken", token);

    window.location.href = "/profile/index.html";
  } catch (error) {
    console.error("Login failes", error);
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

function main() {
  //
}

main();
