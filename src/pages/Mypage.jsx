import React from "react";
import UserThumbnail from "../components/mypage/UserThumbnail";
import UserProfile from "../components/mypage/UserProfile";
import MypageList from "../components/mypage/MypageList";
import "./mypage.css";

const Mypage = ({ token, language }) => {
  return (
    <div className="mypage-container">
      <div className="content">
        <div className="left-section">
          <div className="left-top">
            <UserThumbnail token={token} language={language}></UserThumbnail>
            {console.log("token", token)}
          </div>
          <div className="left-bottom">
            <UserProfile token={token} language={language}></UserProfile>
          </div>
        </div>
        <div className="right-section">
          <MypageList token={token} language={language}></MypageList>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
