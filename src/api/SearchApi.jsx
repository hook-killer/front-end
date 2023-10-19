import { jsonClient } from "./DefaultClient";

var addRequestMapping = "/search";

export const searchListDown = (word, offset, limit) =>
  jsonClient.get(`${addRequestMapping}/${word}?offset=${offset}&limit=${limit}`)

export const searchResult = (word, offset, limit) =>
  jsonClient.get(`${addRequestMapping}/${word}?offset=${offset}&limit=${limit}`)

export const searchAllResult = (word) =>
  jsonClient.get(`${addRequestMapping}/all/${word}`)