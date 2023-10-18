import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TitleH1 } from "../styled/HTagComponent";
import { AuthInput } from "../styled/AuthComponent.jsx";
import { register } from "../../api/AuthApi";

const RegisterForm = ({ props }) => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(email, password, nickName)
    e.preventDefault();

    const singUpRequest = {
      email,
      nickName,
      password,
    };

    register(singUpRequest)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("회원가입이 성공적으로 완료되었습니다. 이메일 인증을 진행해주세요.");

          const MailRequest = { // 이메일 정보를 만듭니다.
            email
          };
          /*
                    sendEmail(MailRequest)
                      .then((response) => response.json())
                      .then((response) => {
                        console.log(response.data);
                        //navigate("/sendVerificationEmail");
                      })
                      .catch((error) => {
                        console.error(error);
                      });
          */
        } else {
          alert("회원가입에 실패했습니다.");
        }

      });

    // email, nickname, password를 사용하여 사용자 계정을 생성하는 코드를 작성합니다.
  };

  return (
    <RegisterDiv className="d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="w-75">
        <Row className="mt-5">
          <Col xs={12}>
            <TitleH1>회원가입</TitleH1>
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
            <RegisterSubmit button type="submit" value="회원가입" onClick={handleSubmit} />
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