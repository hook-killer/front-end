import React from "react";
import UserThumbnail from "../components/mypage/UserThumbnail";
import UserProfile from "../components/mypage/UserProfile";
import MypageList from "../components/mypage/MypageList";
import "./Mypage.css";

const Mypage = ({ token, language }) => {
  return (
    <div className="mypage-container mt-5">
      <div className="content">
        <div className="left-section">
          <div className="left-top mb-3">
            <UserThumbnail token={token} language={language}></UserThumbnail>
          </div>
          <div className="left-bottom mt-3">
            <UserProfile token={token} language={language}></UserProfile>
          </div>
        </div>
        <div class="d-flex" style={{ height: "100%;" }}>
          <div class="vr"></div>
        </div>
        <div className="right-section ps-4">
          <MypageList token={token} language={language}></MypageList>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
//
