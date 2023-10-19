import React, { useState, useEffect } from "react";
import {
  uploadThumbnail,
  getUserInfo,
  updateUserInfo,
} from "../../api/MypageApi";

const ThumbnailComponent = () => {
  const [userId, setUserId] = useState(null); // 유저 아이디 상태 추가
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response && response.data) {
          if (response.data.thumbnail) {
            setThumbnail(response.data.thumbnail);
          }
          if (response.data.userId) {
            setUserId(response.data.userId); // 유저 아이디 상태 설정
          }
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (event) => {
    let selectedFile = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      setThumbnail(reader.result);
      setFile(selectedFile);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        const uploadResponse = await uploadThumbnail(file);

        if (uploadResponse.data.result) {
          const newThumbnailPath = uploadResponse.data.thumnail;
          await updateUserInfo({ userId: userId, thumbnail: newThumbnailPath }); // 유저 아이디 상태 사용
          setThumbnail(newThumbnailPath);

          alert(uploadResponse.data.message);
        } else {
          alert(uploadResponse.data.message);
        }
      } catch (error) {
        alert("썸네일 업데이트 실패!");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "100px",
          height: "100px",
        }}
      >
        <img src={thumbnail} alt="" style={{ width: "100%", height: "100%" }} />
      </div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>수정</button>
    </div>
  );
};

export default ThumbnailComponent;
