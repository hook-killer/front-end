import { jsonClient } from "./MainCustomClient";

var addRequestMapping = "/search";

export const searchListDown = (language, word, offset, limit) =>
  jsonClient(language).get(`${addRequestMapping}/${word}?offset=${offset}&limit=${limit}`)

export const searchResult = (language, word, offset, limit) =>
  jsonClient(language).get(`${addRequestMapping}/${word}?offset=${offset}&limit=${limit}`)

export const searchAllResult = (language, word) =>
  jsonClient(language).get(`${addRequestMapping}/all/${word}`)