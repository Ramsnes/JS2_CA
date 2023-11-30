const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stops default submission behaviour

  // Gets username/password from form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Calls login function(hoisted) with username/password
  login(username, password);
});

function login(username, password) {
  // Fetch API to make POST request to the login endpoint
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // stringifies login details
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json(); // implicite else
    })
    .then((data) => {
      // API response includes a JWT token
      const token = data.token;

      // Stores token in local storage
      localStorage.setItem("token", token);

      // Optional redirection of user to a page
      // window.location.href = "/pageName";
    })
    // Handles display and error to user
    .catch((error) => {
      console.error("Login error:", error);
    });
}
