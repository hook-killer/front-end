import React, { useState, useEffect, useRef } from "react";
import {
  updateUserThumbnailPath,
  postUserProfile,
  getUserInfo,
} from "../../api/MypageApi";

const UserThumbnail = ({ language, token }) => {
  const [userId, setUserId] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo(language, token);
        if (response.status === 200) {
          setThumbnail(response.data.thumbnail || "");
          setUserId(response.data.userId || null);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchUserInfo();
  }, [language, token]);

  const handleFileChange = (selectedFile) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setThumbnail(reader.result);
      uploadAndSave(selectedFile);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadAndSave = async (selectedFile) => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("naverObjectStorageUsageType", "PROFILE");

        const uploadResponse = await postUserProfile(formData, language, token);
        const newFilePath = uploadResponse.data.filePath;

        if (response.data.result) {
          setThumbnail(response.data.thumbnail);
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("썸네일 업데이트 실패!");
      }
    }
  };

  const handleClick = async () => {
    hiddenFileInput.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div>
      <div
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "200px",
          height: "200px",
        }}
      >
        <img src={thumbnail} alt="" style={{ width: "100%", height: "100%" }} />
      </div>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        📂 Upload Area
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={(e) => {
          handleFileChange(e.target.files[0]);
        }}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UserThumbnail;
