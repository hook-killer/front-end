import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TitleH1 } from "../styled/HTagComponent";
import { AuthInput } from "../styled/AuthComponent.jsx";
import { register } from "../../api/AuthApi";
import { login } from "../../api/AuthApi";
import { setCookie } from "../../utils/ReactCookie";
import { useTranslation } from "react-i18next";

const RegisterForm = ({ props }) => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const naviater = useNavigate();
  const [t, i18n] = useTranslation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const singUpRequest = {
      email,
      nickName,
      password,
    };

    try {
      const response = await register(singUpRequest, i18n.language);

      if (response.data.id) {
        alert("회원가입이 성공적으로 완료되었습니다. 이메일 인증을 완료해주세요.");
        naviater("/login")
        // const AuthRequest = {
        //   email,
        //   password
        // }

        // const loginResponse = await login(AuthRequest)

        // if (loginResponse.data.token) {

        //   setCookie('jwtToken', response.data.token);
        //   console.log(response.data.token);
        //   alert("로그인 성공");
        //   naviater("/");

        // } else if (response.data.status === NOT_ACITVE) {

        //   alert("이메일 인증을 완료하지 않아서 로그인 페이지로 이동합니다.");

        // }
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      if (error.response && error.response.data.success === false) {
        alert(error.response.data.reason);
      } else {
        console.error('Error:', error);
      }
    }
  };


  return (
    <RegisterDiv className="d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="w-75">
        <Row className="mt-5">
          <Col xs={12}>
            <TitleH1>{t('signup.SignUp')}</TitleH1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <AuthInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <AuthInput
              type="text"
              placeholder="Nickname"
              value={nickName}
              onChange={handleNickNameChange}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <RegisterSubmit type="submit" value={t('signup.SignUp')} onClick={handleSubmit} />
          </Col>
        </Row>
      </Form>
    </RegisterDiv >
  );
};

export default RegisterForm;

const RegisterDiv = styled.div`
  max-width: 430px;
  margin: 100px auto;
  border-radius: 5px;
  border: solid 1px;
  border-color: #d2d2d2;
  box-sizing: border-box;
`;

const RegisterSubmit = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 45px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  background-color: #6a24fe;
  margin-top: 20px;
`;