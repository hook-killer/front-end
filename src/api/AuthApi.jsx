import { jsonClient } from "./MainCustomClient";

let requestMapping = "/auth";

/**
 * 로그인
 * "AuthCotnroller"의 POST, "/login"
 * @param {} loginForm
 * @returns
 */
export const login = (loginForm, language) =>
  jsonClient(language).post(requestMapping + "/login", loginForm);

/**
 * 회원가입
 * "AuthCotnroller"의 POST, "/register
 * @param {} registerForm
 * @returns
 */
export const register = (registerForm, language) =>
  jsonClient(language).post(requestMapping + "/register", registerForm);

/**
* 인증메일
* "AuthCotnroller"의 GET, "/verifyEmail
* @param {} verify
* @returns
*/
export const verifyEmail = (verificationToken) =>
  jsonClient.get(`${requestMapping}/verifyEmail?verificationToken=${verificationToken}`)

export const kakaoBack = (kakoLoginForm) =>
  jsonClient.get(`${requestMapping}/oauth/kakao/link`, kakoLoginForm)

/**
 * 해당 API의 경우에는 일단 내가 기능 만들어 줄 때 logout Mapping값이 존재해서 일단 만들어줌
 */
export const logout = () => jsonClient.post(requestMapping + "/logout");
