import "normalize.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PopularBox from "./components/main/PopularBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import "./App.css";
import React, { useState } from "react";
import { getCookie } from "./utils/ReactCookie";
import { isNull } from "./utils/NullUtils";
import LoginForm from "./components/auth/Login";
import RegisterForm from "./components/auth/Register";
import EmailVerification from "./components/auth/EmailVerification";
import ArticleAdd from "./components/article/add";
import ArticleList from "./components/article/list";
import ArticleDetail from "./components/article/detail";
import ReplyList from "./components/reply/list";
import ReplyAdd from "./components/reply/add";
import NoticeAdd from "./components/notice/add";
import NoticeDetail from "./components/notice/detail";
import NoticeList from "./components/notice/list";
import NoticeUpdate from "./components/notice/update";
import SearchResultList from "./components/search/result";
import Mypage from "./pages/Mypage";
import KakaoLogin from "./components/auth/KakaoLogin";
import ArticleUpdate from "./components/article/update";
import GoogleLogin from "./components/auth/GoogleLogin";
import NoResult from "./components/search/NoResult";

const App = () => {
  let storageLanguage = getCookie("language");
  let storageRole = getCookie("role");
  let storageToken = getCookie("jwtToken");
  let storageNickName = getCookie("nickName");
  let storageProfile = getCookie("profile");

  const [token, setToken] = useState(isNull(storageToken) ? "" : storageToken);
  const [role, setRole] = useState(isNull(storageRole) ? "GUEST" : storageRole);
  const [language, setLanguage] = useState(
    isNull(storageLanguage) ? "KO" : storageLanguage
  );
  const [nickName, setNickName] = useState(
    isNull(storageNickName) ? "" : storageNickName
  );
  const [profile, setProfile] = useState(
    isNull(storageProfile) ? "" : storageProfile
  );

  return (
    <>
      <LayoutDiv>
        <BrowserRouter>
          <Header
            language={language}
            languageSet={setLanguage}
            token={token}
            tokenSet={setToken}
            role={role}
            roleSet={setRole}
            nickName={nickName}
            nickNameSet={setNickName}
            profile={profile}
            profileSet={setProfile}
          />
          <Container>
            <Routes>
              <Route exact path="/" element={<PopularBox />} />
              <Route
                path="/mypage"
                element={
                  <Mypage
                    token={token}
                    language={language}
                    nickNameSet={setNickName}
                    profile={profile}
                    profileSet={setProfile}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <LoginForm
                    tokenSet={setToken}
                    roleSet={setRole}
                    nickNameSet={setNickName}
                    profileSet={setProfile}
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <RegisterForm roleSet={setRole} nickNameSet={setNickName} />
                }
              />
              <Route path="article/*">
                {/* 게시물 추가 */}
                <Route
                  path="add/:boardId"
                  element={<ArticleAdd token={token} />}
                />

                {/* 게시물 리스트 조회 */}
                <Route path="list/:boardId" element={<ArticleList />} />

                {/* 게시물 조회 */}
                <Route
                  path=":articleId"
                  element={<ArticleDetail token={token} />}
                />

                {/*  */}
                <Route
                  path="update/:articleId"
                  element={<ArticleUpdate token={token} />}
                />
              </Route>

              {/* 게시물조회 */}
              <Route
                path="/search/result/:word"
                element={<SearchResultList />}
              />

              {/* 댓글기능 */}
              <Route path="reply/*">
                <Route
                  path="list/:articleId"
                  element={<ReplyList token={token} />}
                />
                <Route
                  path="add/:articleId"
                  element={<ReplyAdd token={token} />}
                />
              </Route>

              {/* 공지사항 */}
              <Route path="/notice" element={<NoticeList role={role} />} />
              <Route path="notice/*">
                <Route
                  path="add"
                  element={<NoticeAdd role={role} token={token} />}
                />
                <Route
                  path=":noticeArticleId"
                  element={<NoticeDetail role={role} token={token} />}
                />
                <Route
                  path="update/:noticeArticleId"
                  element={<NoticeUpdate role={role} token={token} />}
                />
              </Route>

              <Route path="/verifyEmail" element={<EmailVerification />} />
              <Route
                path="/auth/oauth/kakao"
                element={
                  <KakaoLogin
                    tokenSet={setToken}
                    roleSet={setRole}
                    nickNameSet={setNickName}
                    profileSet={setProfile}
                  />
                }
              />
              <Route
                path="/auth/oauth/google"
                element={
                  <GoogleLogin
                    tokenSet={setToken}
                    roleSet={setRole}
                    nickNameSet={setNickName}
                  />
                }
              />
              <Route />
              <Route path="/noresult" element={<NoResult />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </LayoutDiv>
      <Footer />
    </>
  );
};

export default App;

const LayoutDiv = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 60px;
`;
