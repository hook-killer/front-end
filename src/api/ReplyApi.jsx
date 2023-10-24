import { jsonClient as DefaultClient } from "./DefaultClient";
import { jsonClient as MainCustomClient } from "./MainCustomClient";

var requestMapping = "/reply";

export const addReply = (addReplyForm, language, token) => 
  DefaultClient(language, token).post(requestMapping, addReplyForm);

export const listReply = (articleId, language) =>
  MainCustomClient(language).get(`${requestMapping}/${articleId}`);

export const deleteReply = (replyId, language, token) =>
   DefaultClient(language, token).delete(`${requestMapping}/${replyId}`);

