import React, { useState, useEffect } from "react";
import { getUserInfo } from "../../api/MypageApi";
import UserInfoUpdateModal from "./UserInfoUpdateModal"; // UserInfoUpdateModal 컴포넌트를 임포트하세요.

const UserProfile = ({ token, language }) => {
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 위한 상태

  useEffect(() => {
    const fetchMyPageInfo = async () => {
      try {
        const response = await getUserInfo(language, token);
        if (response.status == 200) {
          setUserInfo(response.data);
          return;
        }
        throw new Error("Response Fail");
      } catch (error) {
        console.error("유저 정보를 가져오는데 실패했습니다.", error);
      }
    };

    fetchMyPageInfo();
  }, []);

  return (
    <div>
      <form>
        <div>
          <label>이메일 : </label>
          <span>{userInfo.email}</span>
        </div>
        <div>
          <label>닉네임 : </label>
          <span>{userInfo.nickName}</span>
        </div>
        <div>
          <label>생성일 : </label>
          <span>{userInfo.createdAt}</span>
        </div>
      </form>
      <button onClick={() => setShowModal(true)}>수정</button>{" "}
      {/* showModal 상태에 따라 UserInfoUpdateModal 컴포넌트를 표시하거나 숨깁니다. */}
      {showModal && (
        <UserInfoUpdateModal
          onClose={() => setShowModal(false)}
          userInfo={userInfo}
          language={language}
          token={token}
        />
      )}
    </div>
  );
};

export default UserProfile;
