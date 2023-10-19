import React, { useState, useEffect } from "react";
import { getUserInfo } from "../../api/MypageApi";
import UserInfoUpdateModal from "./UserInfoUpdateModal"; // UserInfoUpdateModal 컴포넌트를 임포트하세요.

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickName: "",
    createAt: "",
  });

  const [showModal, setShowModal] = useState(false); // 모달 표시 여부를 위한 상태

  useEffect(() => {
    async function fetchMyPageInfo() {
      try {
        const response = await getUserInfo();
        setUserInfo(response.data); // 데이터 구조에 따라 적절히 수정해야 할 수 있습니다.
      } catch (error) {
        console.error("유저 정보를 가져오는데 실패했습니다.", error);
      }
    }

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
          <span>{userInfo.createAt}</span>
        </div>
      </form>
      <button onClick={() => setShowModal(true)}>수정</button>{" "}
      {/* showModal 상태에 따라 UserInfoUpdateModal 컴포넌트를 표시하거나 숨깁니다. */}
      {showModal && (
        <UserInfoUpdateModal
          onClose={() => setShowModal(false)}
          userInfo={userInfo}
        />
      )}
    </div>
  );
};

export default UserProfile;
