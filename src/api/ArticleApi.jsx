import { jsonClient as DefaultClient } from "./DefaultClient";
import { jsonClient as MainCustomClient, multiPartClient } from "./MainCustomClient";

var addRequestMapping = "/article";

export const addArticle = (addArticleForm, language, token) =>
  DefaultClient(language, token).post(addRequestMapping, addArticleForm);

export const listArticle = (boardId, language) =>
  MainCustomClient(language).get(`${addRequestMapping}/list/${boardId}`);

export const popularArticle = (boardId, language) =>
  MainCustomClient(language).get(`${addRequestMapping}/popular/${boardId}`);
