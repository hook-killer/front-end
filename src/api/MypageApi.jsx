import { jsonClient, multiPartClient } from "./DefaultClient";
import { uploadImg } from "./FileApi";

var myPageRequestMapping = "/mypage";
var myPageFileRequestMapping = "/file";

export const getUserInfo = (language, token) =>
  jsonClient(language, token).get(`${myPageRequestMapping}`);

export const updateUserInfo = (
  { userId, password, thumbnail, nickName },
  language,
  token
) =>
  jsonClient(language, token).put(`${myPageRequestMapping}`, {
    userId,
    password,
    thumbnail,
    nickName,
  });

export const myPageList = (language, token, searchType) =>
  jsonClient(language, token).get(
    `${myPageRequestMapping}/mylist/${searchType}`
  );

export const updateUserThumbnailPath = (thumbnail, language, token) => {
  return jsonClient(language, token).put(
    `${myPageRequestMapping}/thumnail`,
    thumbnail
  );
};
