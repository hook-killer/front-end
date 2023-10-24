import axios from "axios";

// React Axios Timeout = 5s

// 기본적으로 사용할 Axios Client
export const jsonClient = (language, token) => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
      language: language,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
};

// 첨부파일을 발송 할 경우 사용 할 Axios Client
export const multiPartClient = (language, token) =>
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + token,
      language: language,
      "Content-Type": "multipart/form-data",
    },
  });
