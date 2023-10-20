import { jsonClient, multiPartClient } from "./MainCustomClient";

var myPageRequestMapping = "/mypage";

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

export const uploadThumbnail = (file, token) => {
  const formData = new FormData();
  formData.append("thumbnail", file);

  return multiPartClient(token).put(
    `${myPageRequestMapping}/thumbnail`,
    formData
  );
};
