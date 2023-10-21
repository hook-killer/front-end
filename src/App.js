import "normalize.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PopularBox from "./components/main/PopularBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import "./App.css";
import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "./utils/ReactCookie";
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


const App = () => {
  let storageLanguage = getCookie("language");
  let storageRole = getCookie("role");
  let storageToken = getCookie("token");
  let storageNickName = getCookie("nickName");
  let storageProfile = getCookie("profile");

  const [token, setToken] = useState(isNull(storageToken) ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjk3ODYyMjAxLCJleHAiOjE2OTc4OTgyMDEsImlzcyI6Imhvb2traWxsZXIiLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6IkFETUlOIn0.RJ_pveaTT8GGFYAZMoZI_yMz-k8936Z5DK1A0aoOVx1mkbsRdsx92swUWzG5XVVmn0m8lSj9NZSPOHIKp1JPeA" : storageToken);
  const [role, setRole] = useState(isNull(storageRole) ? "GUEST" : storageRole);
  const [language, setLanguage] = useState(
    isNull(storageLanguage) ? "KO" : storageLanguage
  );
  const [nickName, setNickName] = useState(
    isNull(storageNickName) ? "관리자" : storageNickName
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
              <Route path="/fuckingBong" element={Test2()} />
              <Route path="/mypage" element={<Mypage token={token} />} />
              <Route
                path="/login"
                element={<LoginForm tokenSet={setToken} roleSet={setRole} />}
              />
              <Route
                path="/register"
                element={<RegisterForm tokenSet={setToken} roleSet={setRole} />}
              />
              <Route path="/article/add" element={<ArticleAdd token={token} />} />
              <Route path="/article/list/:boardId" element={<ArticleList /> } />
              <Route path="/article/:articleId" element={<ArticleDetail token={token} />} />
              <Route
                path="/search/result/:word"
                element={<SearchResultList />}
              />

              {/* reply test용 페이지들입니다. 추후 삭제가 필요합니다. */}
              <Route path="/reply/list/:articleId" element={<ReplyList token={token}/>} />
              <Route path="/reply/add/:articleId" element={<ReplyAdd token={token} />} />
              {/* reply test용 페이지들입니다. 추후 삭제가 필요합니다. */}

              <Route path="/notice/add" element={<NoticeAdd token={token}/>} />

              <Route path="/notice" element={<NoticeList />} />
              <Route
                path="/notice/:noticeArticleId"
                element={<NoticeDetail />}
              />
              <Route
                path="/notice/update/:noticeArticleId"
                element={<NoticeUpdate token={token} />}
              />
              <Route
                path="/verifyEmail"
                element={<EmailVerification />}
              />
              <Route
                path="/kakao/callback"
                element={<KakaoLogin />}
              />
              <Route />
            </Routes>
          </Container>
        </BrowserRouter>
      </LayoutDiv>
      <Footer />
    </>
  );
};

export default App;

const Test2 = () => {
  return <>응애 아 응애에요!!</>;
};

const LayoutDiv = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 60px;
`;
