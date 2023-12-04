import { getFromLocalStorage } from "./common/utils/localStorageUtil.js";
import {
  REGISTER_API_URL,
  LOGIN_API_URL,
  POSTS_API_URL,
} from "./common/constants.js";

function getToken() {
  return getFromLocalStorage("accessToken");
}
