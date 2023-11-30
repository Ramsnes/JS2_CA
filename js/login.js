const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stops default submission behavior

  // Gets username, email and password from the form
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Calls the login function with email/password
  login(username, email, password);
});

function login(username, email, password) {
  // Fetch API to make POST request to the login endpoint
  fetch("/social/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Stringifies login details
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json(); // Implicit else
    })
    .then((data) => {
      // API response includes a JWT token
      const token = data.accessToken; // Adjust the property name based on the actual API response

      // Stores the token in local storage
      localStorage.setItem("token", token);

      //redirection of the user to a page
      window.location.href = "/profile/index.html";
    })
    // Handles display and error to the user
    .catch((error) => {
      console.error("Login error:", error);
    });
}
