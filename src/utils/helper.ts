import { CONST_WORDS } from "./constant";

export const getAuthToken = () => {
  return localStorage.getItem(CONST_WORDS.token);
};

export const logOut = () => {
  localStorage.clear();
  window.location.href = "/";
};

let storageUserName = "";
export const getUserName = () => {
  if (!storageUserName)
    storageUserName = localStorage.getItem(CONST_WORDS.username) ?? "";
  return storageUserName;
};
