import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { expireSevenDays, setCookie } from "../../utils/ReactCookie";

const GoogleLogin = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const setToken = props.tokenSet;
  const setRole = props.roleSet;
  const setNickName = props.nickNameSet;
  // 쿼리 파라미터 'code'의 값을 가져옵니다.
  const code = queryParams.get("code");

  const requestGoogleLogin = async () => {
    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_GOOGLE_AUTH_BE}?code=${code}`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        if (res.status === 200) {
          setToken(res.data.refreshToken);
          setRole(res.data.role);
          setNickName(res.data.nickName);

          setCookie("token", res.data.refreshToken, {
            expires: expireSevenDays,
          });
          setCookie("role", res.data.role, { expires: expireSevenDays });
          setCookie("nickName", res.data.nickName, {
            expires: expireSevenDays,
          });
          //로그인이 성공하면 이동할 페이지
          navigate("/");
          return;
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

  useEffect(() => {
    requestGoogleLogin();
  }, []);

  return (
    <div className="KakaLogin">
      KakaoLoign
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려 주세요</p>
        <div className="hookkiller"></div>
      </div>
    </div>
  );
};

export default GoogleLogin;
