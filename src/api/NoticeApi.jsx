import { jsonClient as MainCustomClient, multiPartClient as MainCustomMultiPartClient, multiPartClient} from "./MainCustomClient";
import { jsonClient as DefaultClient } from "./DefaultClient";

var requestMapping = "/notice"

export const addNotice = (addNoticeForm, language, role) =>
  MainCustomClient(language, role).post(requestMapping, addNoticeForm)

export const noticeList = (language) =>
  MainCustomClient(language).get(`${requestMapping}`)

export const noticeDetail = (noticeArticleId, language) =>
  multiPartClient(language).get(`${requestMapping}/${noticeArticleId}`)

export const noticeDelete = (noticeArticleId, language, token) => 
  DefaultClient(language, token).delete(`${requestMapping}/${noticeArticleId}`)

export const noticeUpdate = (updateNoticeForm, noticeArticleId, language, token, role) =>
  DefaultClient(language, token, role).put(requestMapping, updateNoticeForm, noticeArticleId)
  