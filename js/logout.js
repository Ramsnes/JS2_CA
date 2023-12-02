import { removeFromLocalStorage } from "./common/utils/localStorageUtil.js";

const logoutUser = () => {
  removeFromLocalStorage("accessToken");
  window.location.href = "../index.html";
};

const logoutButton = document.querySelector("#logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", logoutUser);
}
