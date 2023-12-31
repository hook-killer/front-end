import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import kakaoBtn from "../../asset/kakao.png";
import googleBtn from "../../asset/google.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { expireSevenDays, setCookie } from "../../utils/ReactCookie";
import { login } from "../../api/AuthApi";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "../../utils/Oauth";
import { useTranslation } from "react-i18next";

const GoogleLogin = (e) => {
  window.location.href = GOOGLE_AUTH_URL;
};

const KakaoLogin = (e) => {
  window.location.href = KAKAO_AUTH_URL;
};

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigater = useNavigate();
  const setToken = props.tokenSet;
  const setRole = props.roleSet;
  const setNickName = props.nickNameSet;
  const [t, i18n] = useTranslation();
  const setProfile = props.profileSet;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const AuthRequest = {
      email,
      password,
    };

    login(AuthRequest, i18n.language)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setToken(response.data.token);
          setRole(response.data.role);
          setNickName(response.data.nickName);
          setProfile(response.data.thumbNail);
          setCookie("jwtToken", response.data.token, {
            expires: expireSevenDays,
          });
          setCookie("role", response.data.role, { expires: expireSevenDays });
          setCookie("nickName", response.data.nickName, {
            expires: expireSevenDays,
          });
          setCookie("profile", response.data.thumbNail, {
            expires: expireSevenDays,
          });
          navigater("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.success === false) {
          alert(error.response.data.reason);
        } else {
          console.error("Error", error);
        }
      });
  };

  return (
    <LoginDiv className="d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="w-75">
        <Row className="mt-5">
          <Col xs={12}>
            <TitleH1>{t("login.Login")}</TitleH1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <LoginInput
              type="text"
              placeholder="UserId"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <LoginInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="d-flex ">
            <LoginSubmit type="submit" value="Login" onClick={handleSubmit} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <Link to="/register">
              <RegisterButton type="button" value="Register" />
            </Link>
          </Col>
        </Row>
        <Separator>
          <p>OR</p>
        </Separator>
        <Row>
          <Col xs={12}>
            <KakaoButton onClick={KakaoLogin}>
              <img
                src={kakaoBtn}
                alt="KakaoLoginBtn"
                className="me-3"
                height="80%"
              />
              {t("login.KaKaoLogin")}
            </KakaoButton>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <GoogleButton onClick={GoogleLogin}>
              <img
                src={googleBtn}
                alt="GoogleLoginBtn"
                className="me-3"
                height="80%"
              />
              {t("SIGN IN WITH GOOGLE")}
            </GoogleButton>
          </Col>
        </Row>
      </Form>
    </LoginDiv>
  );
};

export default LoginForm;

const LoginDiv = styled.div`
  max-width: 430px;
  margin: 100px auto;
  border-radius: 5px;
  border: solid 1px;
  border-color: #d2d2d2;
  box-sizing: border-box;
`;

const TitleH1 = styled.h1`
  font-weight: 900;
  color: #6a24fe;
  margin-bottom: 10px;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 6px;
  border: var(--bs-border-width) solid var(--bs-border-color);
  background-color: #f8f8f8;
  ::placeholer {
    color: #d2d2d2;
  }
  &:focus,
  &:active,
  &:hover {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: #86b7fe;
    background-color: #fff;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

const LoginSubmit = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  background-color: #6a24fe;
  margin-top: 20px;
`;

const RegisterButton = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  background-color: #d2d2d2;
`;

const Separator = styled.div`
  display: block;
  margin: 10px auto 10px;
  text-align: center;
  height: 20px;
  position: relative;
  background: transparent;
  color: #0f132a45;
  font-size: 13px;
  width: 90%;
  max-width: 680px;
  &::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 0;
    background: #0f132a45;
    height: 1px;
    width: 45%;
  }
  &::after {
    content: "";
    position: absolute;
    top: 8px;
    right: 0;
    background: #0f132a45;
    height: 1px;
    width: 45%;
  }
`;

const KakaoButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border: 0;
  border-radius: 6px;
  color: #000000;
  font-size: 16px;
  background-color: #fee500;
  text-align: center;
`;

const GoogleButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border: 0;
  border-radius: 6px;
  color: #000000;
  font-size: 16px;
  background-color: #FFFFFF;
  border: solid black 1px;
  text-align: center;
`;
