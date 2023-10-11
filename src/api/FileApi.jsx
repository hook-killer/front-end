import multiPartClient from "./DefaultClient";
import { login } from "./authApi";
let requestMapping = "/file";

/**
 * 이미지 리스트 업로드 모듈, 각 최대 20MB, 총 30장 제한
 * "FileController"의 POST, "/image"
 * @param {*} imageList
 * @returns
 */
export const uploadImgList = (imageList) =>
  multiPartClient.post(requestMapping + "/image", imageList);
