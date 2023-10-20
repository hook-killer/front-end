import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const KakaoLogin = (props) => {

  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoBack = async () => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_KAKAO_REDIRECT_URI}?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
      }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        localStorage.setItem("nickName", res.data.account.profile.nickName);
        //로그인이 성공하면 이동할 페이지
        navigate("/");
      });
    };
    kakaoBack();
  }, [props.history]);


  return (
    <div className="KakaLogin">KakaoLoign
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려 주세요</p>
        <div className="hookkiller"></div>
      </div>
    </div>
  )

}

export default KakaoLogin;