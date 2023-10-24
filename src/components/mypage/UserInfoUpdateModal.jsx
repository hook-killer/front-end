import React, { useState, useEffect } from "react";
import { updateUserInfo, getUserInfo } from "../../api/MypageApi";
import { useTranslation } from "react-i18next";
import {
  expireSevenDays,
  removeCookie,
  setCookie,
} from "../../utils/ReactCookie";

const UserInfoUpdateModal = ({ language, token, closeModal, nickNameSet }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [passwordBorderStyle, setPasswordBorderStyle] = useState({});
  const [nickNameBorderStyle, setNickNameBorderStyle] = useState({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 현재 사용자 정보
    getUserInfo(i18n.language, token)
      .then((response) => {
        setPassword(response.data.password);
        setNickName(response.data.nickName);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [language, token]);

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setNewPassword(enteredPassword);

    if (enteredPassword === password) {
      setPasswordBorderStyle({ borderColor: "red" });
      return;
    } else if (enteredPassword.length < 8) {
      setPasswordBorderStyle({ borderColor: "red" });
      return;
    }
    setPasswordBorderStyle({ borderColor: "green" });
  };

  const handleNickNameChange = (e) => {
    setNewNickName(e.target.value);

    if (e.target.value === nickName) {
      setNickNameBorderStyle({ borderColor: "red" });
      return;
    }
    setNickNameBorderStyle({ borderColor: "green" });
  };

  const handleSubmit = () => {
    if (newPassword == password || newPassword.length < 8) {
      alert("Confirm Password");
      return;
    }
    if (newNickName == "") {
      alert("Confirm NickName");
      return;
    }

    try {
      updateUserInfo(
        {
          password: newPassword,
          nickName: newNickName,
        },
        i18n.language,
        token
      ).then((res) => {
        if (res.status == 200) {
          nickNameSet(newNickName);
          removeCookie("nickName");
          setCookie("nickName", newNickName, { expires: expireSevenDays });
        }
      });
      alert("UserInfo update complete.");
      closeModal(false);
    } catch (error) {
      console.error("Error updating user data", error);
      alert("UserInfo update fail.");
    }
  };

  return (
    <div style={modalBackgroundStyle} onClick={() => closeModal(false)}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalContentStyle}>
          <input
            type="password"
            placeholder={t("userinfomodal.newPassword")}
            style={passwordBorderStyle}
            onChange={handlePasswordChange}
          />
          <input
            type="text"
            placeholder={t("userinfomodal.nickname")}
            value={nickName}
            readOnly
            disabled
          />
          <input
            type="text"
            placeholder={t("userinfomodal.newNickname")}
            style={nickNameBorderStyle}
            onChange={handleNickNameChange}
          />
        </div>
        <button onClick={handleSubmit}>수정</button>
        <button onClick={(e) => closeModal(false)}>닫기</button>
      </div>
    </div>
  );
};

const modalBackgroundStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
};

const modalContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "10px",
};

const modalStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  width: "50%",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export default UserInfoUpdateModal;
