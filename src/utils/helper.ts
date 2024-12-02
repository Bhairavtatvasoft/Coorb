import { CONST_WORDS } from "./constant";

export const getAuthToken = () => {
  return localStorage.getItem(CONST_WORDS.token);
};

export const logOut = () => {
  localStorage.removeItem(CONST_WORDS.token);
  window.location.href = "/";
};
