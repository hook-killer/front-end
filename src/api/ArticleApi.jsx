import { jsonClient, multiPartClient } from "./DefaultClient";

var requestMapping = "/article"

export const addArticle = (addArticleForm) => 
  jsonClient.post(requestMapping, addArticleForm)
