import axios from "axios";
import { getCookie } from "../utils/ReactCookie";
import { isNull } from "../utils/NullUtils";

// React Axios Timeout = 5s

// 기본적으로 사용할 Axios Client
export const jsonClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + isNull(getCookie("token")) ? "" : getCookie("token"),
    language: getCookie("language"),
    "Content-Type": "application/json",
  },
});

// 첨부파일을 발송 할 경우 사용 할 Axios Client
export const multiPartClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + isNull(getCookie("token")) ? "" : getCookie("token"),
    language: getCookie("language"),
    "Content-Type": "multipart/form-data",
  },
});
