import React, { useState, useEffect } from "react";
import { updateUserInfo, getUserInfo } from "../../api/MypageApi";
import jwtDecode from "jwt-decode";

const UserInfoUpdateModal = ({ props }) => {
  const token = props.token;
  const language = props.language;
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [message, setMessage] = useState("");
  const [nickNameError, setNickNameError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo(language, token);
        const data = response.data;
        setNickName(data.nickName);
        setThumbnail(data.thumbnail);
      } catch (error) {
        setMessage("사용자 정보를 가져오는데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 중복 닉네임 검사 로직을 여기 추가하세요.
    // 예: const isDuplicate = await checkDuplicateNickName(nickName);
    // if (isDuplicate) {
    //     setNickNameError('같은 닉네임이 존재합니다.');
    //     return;
    // }

    const userInfoToUpdate = {
      userId,
      password,
      thumbnail,
      nickName,
    };

    try {
      const response = await updateUserInfo(userInfoToUpdate, language, token);

      if (response.data.result) {
        setMessage(response.data.message);
      } else {
        if (response.data.message === "같은 닉네임이 존재합니다.") {
          setNickNameError("같은 닉네임이 존재합니다.");
        } else {
          setMessage("오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
    } catch (error) {
      setMessage("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  const handleKeyDown = () => {
    setMessage("");
    setNickNameError("");
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            backgroundColor: password === confirmPassword ? "green" : "red",
          }}
        />
        <input
          type="text"
          placeholder="새 닉네임"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {nickNameError && <div>{nickNameError}</div>}
        <input
          type="text"
          placeholder="썸네일 경로"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">정보 수정</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default UserInfoUpdateModal;
