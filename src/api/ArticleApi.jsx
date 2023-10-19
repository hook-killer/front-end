import { jsonClient, multiPartClient } from "./DefaultClient";

var addRequestMapping = "/article";

export const addArticle = (addArticleForm) =>
  jsonClient.post(addRequestMapping, addArticleForm);

export const listArticle = (boardId, language) =>
  jsonClient(language).get(`${addRequestMapping}/list/${boardId}`);

export const popularArticle = (boardId, language) =>
  jsonClient(language).get(`${addRequestMapping}/popular/${boardId}`);
