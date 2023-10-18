import "normalize.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Test1 from "./components/test/test1";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import "./App.css";
import { useState } from "react";
import { getCookie } from "./utils/ReactCookie";
import { isNull } from "./utils/NullUtils";
import LoginForm from "./components/auth/Login";
import ArticleAdd from "./components/article/add";
import ArticleList from "./components/article/list"
import NoticeAdd from "./components/notice/add";
import NoticeDetail from "./components/notice/detail";
import NoticeList from "./components/notice/list";

const App = () => {
  let storageLanguage = getCookie("language");
  let storageRole = getCookie("role");
  let storageToken = getCookie("token");
  let storageNickName = getCookie("nickName");
  let storageProfile = getCookie("profile");

  const [language, setLanguage] = useState(
    isNull(storageLanguage) ? "KO" : storageLanguage
  );
  const [token, setToken] = useState(isNull(storageToken) ? "" : storageToken);
  const [role, setRole] = useState(isNull(storageRole) ? "GUEST" : storageRole);
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
              <Route exact path="/" element={Test1()} />
              <Route path="/fuckingBong" element={Test2()} />
              <Route
                path="/login"
                element={<LoginForm tokenSet={setToken} roleSet={setRole} />}
              />
              <Route
                path="/register"
                element={<LoginForm tokenSet={setToken} roleSet={setRole} />}
              />
                <Route
                path="/article/add"
                element={<ArticleAdd />}
              />
                <Route
                path="/notice/add"
                element={<NoticeAdd/>}
              />
                <Route
                path="/notice"
                element={<NoticeList/>} 
              />
                <Route 
                path="notice/contentId"
                element={<NoticeDetail/>}
              />
                <Route
                path="/article/list/:boardId"
                element={<ArticleList />}
              />
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
