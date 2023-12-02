import { getFromLocalStorage } from "./common/utils/localStorageUtil.js";

export async function fetcher(
  url,
  options = { method: "POST" },
  shouldUseAuth = false
) {
  try {
    let fetchOptions = {
      ...options,
      headers: { "Content-Type": "application/json" },
    };
    //if Auth, add token to header
    if (shouldUseAuth) {
      const accessToken = getFromLocalStorage("accessToken");
      fetchOptions = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error with API call", error);
  }
}
