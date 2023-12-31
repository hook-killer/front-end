import { jsonClient as DefaultClient } from "./DefaultClient";
import {
  jsonClient as MainCustomClient,
  multiPartClient,
} from "./MainCustomClient";

var addRequestMapping = "/article";

export const addArticle = (addArticleForm, language, token) =>
  DefaultClient(language, token).post(addRequestMapping, addArticleForm);

export const listArticle = (boardId, requestString, language) =>
  MainCustomClient(language).get(`${addRequestMapping}/list/${boardId}${requestString}`);

export const popularArticle = (boardId, language) =>
  MainCustomClient(language).get(`${addRequestMapping}/popular/${boardId}`);

export const detailArticle = (articleId, language) =>
  MainCustomClient(language).get(`${addRequestMapping}/${articleId}`);

export const updateArticle = (updateArticleForm, language, token) =>
  DefaultClient(language, token).put(addRequestMapping, updateArticleForm);

export const deleteArticle = (articleId, language, token) =>
  DefaultClient(language, token).delete(`${addRequestMapping}/${articleId}`);

export const likeArticle = (articleId, language, token) =>
  DefaultClient(language, token).post(`${addRequestMapping}/like/${articleId}`);

export const dislikedArticle = (articleId, language, token) =>
  DefaultClient(language, token).get(`${addRequestMapping}/like/${articleId}`);
