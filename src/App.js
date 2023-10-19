import "normalize.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PopularBox from "./components/main/PopularBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import "./App.css";
import { useState } from "react";
import { getCookie } from "./utils/ReactCookie";
import { isNull } from "./utils/NullUtils";
import LoginForm from "./components/auth/Login";
import RegisterForm from "./components/auth/Register";
import EmailVerification from "./components/auth/EmailVerification";
import ArticleAdd from "./components/article/add";
import ArticleList from "./components/article/list";
import Mypage from "./pages/Mypage";


const App = () => {
  let storageLanguage = getCookie("language");
  let storageRole = getCookie("role");
  let storageToken = getCookie("token");
  let storageNickName = getCookie("nickName");
  let storageProfile = getCookie("profile");

  const [language, setLanguage] = useState(
    isNull(storageLanguage) ? "KO" : storageLanguage
  );
  const [token, setToken] = useState(
    isNull(storageToken)
      ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjk3Njc1NDk0LCJleHAiOjE2OTc3MTE0OTQsImlzcyI6Imhvb2traWxsZXIiLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6IkFETUlOIn0.t25-E_ALVQ9sm7sh021buLwAyfrXwnkPtoq4EmFHW__12QTaDPr3ZUyPrFYwZGxKMTGzVob1Vgnz8zaCDGtfAweyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjk3Njc1NDk0LCJleHAiOjE2OTc3MTE0OTQsImlzcyI6Imhvb2traWxsZXIiLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6IkFETUlOIn0.t25-E_ALVQ9sm7sh021buLwAyfrXwnkPtoq4EmFHW__12QTaDPr3ZUyPrFYwZGxKMTGzVob1Vgnz8zaCDGtfAw"
      : storageToken
  );
  const [role, setRole] = useState(isNull(storageRole) ? "ADMIN" : storageRole);
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
              <Route path="/mypage" element={<Mypage />} />
              <Route
                path="/login"
                element={<LoginForm tokenSet={setToken} roleSet={setRole} />}
              />
              <Route
                path="/register"
                element={<RegisterForm tokenSet={setToken} roleSet={setRole} />}
              />
              <Route
                path="/article/add"
                element={<ArticleAdd />}
              />
              <Route
                path="/article/list/:boardId"
                element={<ArticleList />}
              />
              <Route
                path="/sendVerificationEmail"
                element={<EmailVerification />}
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
