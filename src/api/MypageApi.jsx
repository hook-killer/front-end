import { jsonClient } from "./DefaultClient";

var myPageRequestMapping = "/mypage";

export const getUserInfo = (language, token) =>
  jsonClient(language, token).get(`${myPageRequestMapping}`);

export const myPageList = (language, token, searchType, params) =>
  jsonClient(language, token).get(
    `${myPageRequestMapping}/mylist/${searchType}${params}`
  );

export const updateUserInfo = (data, language, token) => {
  return jsonClient(language, token).put(`${myPageRequestMapping}`, data);
};

export const updateUserThumbnailPath = (thumbnail, language, token) => {
  return jsonClient(language, token).put(
    `${myPageRequestMapping}/thumnail`,
    thumbnail
  );
};
