import React from "react";
import UserThumbnail from "../components/mypage/UserThumbnail";
import UserProfile from "../components/mypage/UserProfile";
import MypageList from "../components/mypage/MypageList";
import "./Mypage.css";

const Mypage = () => {
  return (
    <div className="mypage-container">
      <div className="content">
        <div className="left-section">
          <div className="left-top">
            <UserThumbnail></UserThumbnail>
          </div>
          <div className="left-bottom">
            <UserProfile></UserProfile>
          </div>
        </div>
        <div className="right-section">
          <MypageList></MypageList>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
