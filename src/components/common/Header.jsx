import React, { useEffect, useState } from "react";
import logo from "../../asset/logo192.png";
import styled from "styled-components";
import SearchBar from "../search/searchBar";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCookie, removeCookie, setCookie } from "../../utils/ReactCookie";
import { isNull } from "../../utils/NullUtils";
import { PopupMenu } from "react-simple-widgets";

const SelectLanguage = (props) => {
  const lang = props.language;
  const setLanguage = props.languageSet;

  const languageData = [
    { value: "KO", description: "한국어" },
    { value: "EN", description: "English" },
    { value: "CN", description: "中文" },
    { value: "JP", description: "日本語" },
  ];
  const selectChangeEvent = (e) => {
    //상태변경, 쿠키제거 및 새로 지정
    setLanguage(e.target.value);
    removeCookie("language");
    setCookie("language", e.target.value);
  };

  const optionList = languageData.map((language, i) => (
    <option value={language.value} key={"languageOption" + i}>
      {language.description}
    </option>
  ));

  return (
    <LanguageSelect onChange={selectChangeEvent} value={lang}>
      {optionList}
    </LanguageSelect>
  );
};

/**
 * 로그인을 하지 않았을 경우 출력할 Component
 * @returns
 */
const NotLoginMenu = () => {
  return (
    <Link to="/login">
      <LoginButton type="button" value="Login" />
    </Link>
  );
};



const LoginMenu = (props) => {
  let role = props.role;
  let token = props.token;
  let language = props.language;
  let nickName = props.nickName;
  let profile = props.profile;

  const onClickLogout = (e) => {
    removeCookie("token");
    removeCookie("role");
    removeCookie("nickName");
    removeCookie("profile");
    props.tokenSet("");
    props.roleSet("GUEST");
    props.nickNameSet("");
    props.profileSet("");
  };

  return (
    <>
      {nickName}
      <PopupMenu>
        <button className="btn btn-primary ms-1">
          <small>Menu</small>
        </button>

        <div className="card text-start">
          <div className="card-body px-4 py-4">
            <AvaterCircleDiv className="text-center mx-auto mb-4">
              {profile == "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={60}
                  height={60}
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              ) : (
                <img
                  src={`http://ffmiqzmwilfb20007378.cdn.ntruss.com/${profile}?type=f&w=100&h=100`}
                  alt="User Profile"
                />
              )}
            </AvaterCircleDiv>

            <h5 className="text-center mb-3">{nickName}</h5>

            <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

            <div
              className="list-group list-group-flush"
              style={{ margin: "0 -24px 0" }}
            >
              {/* LINK연결하기 */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="list-group-item list-group-item-action px-4">
                  <small>마이페이지</small>
                </button>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="list-group-item list-group-item-action px-4">
                  <small>한국어 모임</small>
                </button>
              </Link>

              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="list-group-item list-group-item-action px-4">
                  <small>일본어 모임</small>
                </button>
              </Link>

              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="list-group-item list-group-item-action px-4">
                  <small>중국어 모임</small>
                </button>
              </Link>
            </div>

            {role == "ADMIN" ? (
              <>
                <hr
                  className="mb-0"
                  style={{
                    margin: "0 -24px 0",
                    height: "3px",
                    backgroundColor: "red",
                  }}
                />

                <div
                  className="list-group list-group-flush"
                  style={{ margin: "0 -24px 0" }}
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <button className="list-group-item list-group-item-action px-4">
                      <small>관리자 페이지</small>
                    </button>
                  </Link>
                </div>
                <hr
                  style={{
                    margin: "0 -24px 0",
                    height: "3px",
                    backgroundColor: "red",
                  }}
                />
              </>
            ) : (
              <hr style={{ margin: "0 -24px 24px" }} />
            )}

            <div className="d-grid">
              <button className="btn btn-secondary" onClick={onClickLogout}>
                <small>Logout</small>
              </button>
            </div>
          </div>
        </div>
      </PopupMenu>
    </>
  );
};

/**
 *
 * @param {*} param0
 * @returns
 */
const MemberArea = (props) => {
  let role = props.role;
  if (role === "GUEST") {
    return NotLoginMenu();
  }
  return LoginMenu(props);
};

const doSearching = (e) => {
  // TODO: Search Event작성
  console.log("쎼환이 빠뽀~~~~");
};

const Header = (props) => {
  let role = props.role;
  let token = props.token;
  let language = props.language;
  let nickName = props.nickName;

  return (
    <HeaderDiv>
      <Row className="d-flex justify-content-end">
        <Col xs={2} style={{ padding: "auto" }}>
          <SelectLanguage language={language} languageSet={props.languageSet} />
        </Col>
      </Row>
      <Row className="pt-2 ps-2 pb-2">
        <Col xs={2}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <AppLogo>
              <img src={logo} alt="AppLogo" className="AppLogo" width={50} />
              <b>OU</b>
            </AppLogo>
          </Link>
        </Col>
        <Col
          xs={7}
          style={{ padding: "auto" }}
          className="align-items-center d-flex align-items-center"
        >
          <SearchBar onChange={(e) => doSearching(e)} />
          {/* TODO:검색단어 입력시 조회창 입력 */}
        </Col>
        <Col
          xs={3}
          className="d-flex justify-content-end pe-5 align-items-center"
        >
          <MemberArea
            language={language}
            token={token}
            tokenSet={props.tokenSet}
            role={role}
            roleSet={props.roleSet}
            nickName={nickName}
            nickNameSet={props.nickNameSet}
            profile={props.profile}
            profileSet={props.profileSet}
          />
        </Col>
      </Row>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.header`
  width: 100%;
  height: 100%;
  background: #baded6c9;
`;

const AppLogo = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2em;
  font-style: normal;
  color: black;
  font-weight: 900;
`;

const LoginButton = styled.input`
  margin: 0;
  overflow: visible;
  background-color: #6a24fe;
  color: #fff;
  border-radius: 5px;
  border: 0;
  font-weight: 400;
  padding: 0.375rem 0.75rem;
  width: 90%;
  text-align: center;
`;

const LanguageSelect = styled.select`
  width: 100%;
  text-align: center;
`;

const AvaterCircleDiv = styled.div`
  display: grid;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ffbd30;
  place-items: center;
`;