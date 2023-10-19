import { jsonClient, multiPartClient } from "./MainCustomClient";

var requestMapping = "/notice"

export const addNotice = (addNoticeForm, language) =>
  jsonClient(language).post(requestMapping, addNoticeForm)

export const noticeList = (language) =>
  jsonClient(language).get(`${requestMapping}`)

export const noticeDetail = (noticeArticleId, language) =>
  jsonClient(language).get(`${requestMapping}/${noticeArticleId}`)

export const noticeDelete = (noticeArticleId) => 
  jsonClient.delete(`${requestMapping}/${noticeArticleId}`)

export const noticeUpdate = () =>
  jsonClient.put(`${requestMapping}`)
  