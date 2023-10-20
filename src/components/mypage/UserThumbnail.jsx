import React, { useState, useEffect, useRef } from "react";
import {
  uploadThumbnail,
  getUserInfo,
  updateUserInfo,
} from "../../api/MypageApi";

const UserThumbnail = ({ language, token }) => {
  const [userId, setUserId] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState(null);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo(language, token);
        if (response.status == 200) {
          if (response.data.thumbnail) {
            setThumbnail(response.data.thumbnail);
          }
          if (response.data.userId) {
            setUserId(response.data.userId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange(files[0]);
      uploadAndSave(files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setThumbnail(reader.result);
      setFile(selectedFile);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = async () => {
    hiddenFileInput.current.click();
  };

  const uploadAndSave = async (file) => {
    if (file) {
      try {
        const uploadResponse = await uploadThumbnail(file, token);
        console.log("token", token);

        if (uploadResponse.data.result) {
          const newThumbnailPath = uploadResponse.data.thumnail;
          await updateUserInfo(
            { userId: userId, thumbnail: newThumbnailPath },
            language,
            token
          );
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
          uploadAndSave(e.target.files[0]); // 즉시 파일 업로드
        }}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UserThumbnail;
