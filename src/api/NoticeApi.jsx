import { jsonClient as MainCustomClient, multiPartClient as MainCustomMultiPartClient} from "./MainCustomClient";
import { jsonClient as DefaultClient } from "./DefaultClient";

var requestMapping = "/notice"

export const addNotice = (addNoticeForm, language, token) =>
  DefaultClient(language, token).post(requestMapping, addNoticeForm)

export const noticeList = (language) =>
  MainCustomClient(language).get(`${requestMapping}`)

export const noticeDetail = (noticeArticleId, language) =>
  MainCustomClient(language).get(`${requestMapping}/${noticeArticleId}`)

  // TODO : delete, update 작업 시 고쳐주세요
// export const noticeDelete = (noticeArticleId) => 
//   jsonClient.delete(`${requestMapping}/${noticeArticleId}`)

// export const noticeUpdate = () =>
//   jsonClient.put(`${requestMapping}`)
  