// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

export const setCookie = (name, value, options) =>
  localStorage.setItem(name, value);
// cookies.set(name, value, { ...options });

export const getCookie = (name) => localStorage.getItem(name);
// cookies.get(name);

export const removeCookie = (name) => localStorage.removeItem(name);
// cookies.remove(name);
