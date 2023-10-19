import { jsonClient, multiPartClient } from "./DefaultClient";

var addRequestMapping = "/article";

export const addArticle = (addArticleForm) =>
  jsonClient.post(addRequestMapping, addArticleForm);

export const listArticle = (boardId) =>
  jsonClient.get(`${addRequestMapping}/list/${boardId}`);

export const popularArticle = (boardId) =>
  jsonClient.get(`${addRequestMapping}/popular/${boardId}`);
