import { jsonClient, multiPartClient } from "./DefaultClient";

var myPageRequestMapping = "/mypage";

export const getUserInfo = () => jsonClient.get(`${myPageRequestMapping}`);

export const updateUserInfo = ({ userId, password, thumbnail, nickName }) =>
  jsonClient.put(`${myPageRequestMapping}`, {
    userId,
    password,
    thumbnail,
    nickName,
  });

export const myPageList = (searchType) =>
  jsonClient.get(`${myPageRequestMapping}/mylist/${searchType}`);

export const uploadThumbnail = (file) => {
  const formData = new FormData();
  formData.append("thumbnail", file);

  return multiPartClient.put(`${myPageRequestMapping}/thumbnail`, formData);
};
