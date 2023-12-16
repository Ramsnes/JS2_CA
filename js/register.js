import { fetcher } from "./fetcher.js";
import { REGISTER_API_URL } from "./common/constants.js";

// Register user
// 1. Get the user data form the form
// 2. Do a post request to the server
// 3. User register only gets 201 created once, then error

const form = document.querySelector("#registrationForm");
const name = document.querySelector("#registerUsername");
const email = document.querySelector("#registerEmail");
const password = document.querySelector("#registerPassword");

async function registerUser(user) {
  console.log("Register user:", user); //User = user object
  try {
    // POST request
    const postBody = JSON.stringify(user);
    const myData = await fetcher(REGISTER_API_URL, {
      method: "POST",
      body: postBody,
    });
  } catch (error) {
    console.error("Registration failed: ", error);
  }
}

//
//
// Form

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userRegistrationDetails = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  registerUser(userRegistrationDetails); //hoisted
});

function main() {
  //
}

main();
