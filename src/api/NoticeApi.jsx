import { jsonClient, multiPartClient } from "./DefaultClient";

var requestMapping = "/notice"

export const addNotice = (addNoticeForm) =>
  jsonClient.post(requestMapping, addNoticeForm)

export const noticeList = () =>
  jsonClient.get(`${requestMapping}`)

export const noticeDetail = (noticeArticleId) =>
  jsonClient.get(`${requestMapping}/${noticeArticleId}`)

export const noticeDelete = (noticeArticleId) => 
  jsonClient.delete(`${requestMapping}/${noticeArticleId}`)

export const noticeUpdate = () =>
  jsonClient.put(`${requestMapping}`)
  