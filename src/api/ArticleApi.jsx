import { jsonClient, multiPartClient } from "./MainCustomClient";

var addRequestMapping = "/article";

export const addArticle = (addArticleForm, language) =>
  jsonClient(language).post(addRequestMapping, addArticleForm);

export const listArticle = (boardId, language) =>
  jsonClient(language).get(`${addRequestMapping}/list/${boardId}`);

export const popularArticle = (boardId, language) =>
  jsonClient(language).get(`${addRequestMapping}/popular/${boardId}`);
