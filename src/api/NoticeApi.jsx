import { jsonClient as MainCustomClient, multiPartClient as MainCustomMultiPartClient, multiPartClient} from "./MainCustomClient";
import { jsonClient as DefaultClient } from "./DefaultClient";

var requestMapping = "/notice"

export const addNotice = (addNoticeForm, language, token) =>
  DefaultClient(language, token).post(requestMapping, addNoticeForm)

export const noticeList = (language, token) =>
  MainCustomClient(language, token).get(`${requestMapping}`)

export const noticeDetail = (noticeArticleId, language, role) =>
  MainCustomClient(language, role).get(`${requestMapping}/${noticeArticleId}`)

export const noticeDelete = (noticeArticleId, language, token) => 
  DefaultClient(language, token).delete(`${requestMapping}/${noticeArticleId}`)

export const noticeUpdate = (updateNoticeForm, language, token) =>
  DefaultClient(language, token).put(requestMapping, updateNoticeForm)
  