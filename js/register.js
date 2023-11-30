document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm"); //form

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); //prevents default behavious
    // id of all form id's
    const registerUsername = document.getElementById("registerUsername").value;
    const registerEmail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;
    register(registerUsername, registerEmail, registerPassword);
  });
});

async function register(username, email, password) {
  try {
    const response = await fetch("/social/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    // Optionally redirect user to login or another page
    window.location.href = "/login";
  } catch (error) {
    console.error("Registration error:", error);
  }
}
