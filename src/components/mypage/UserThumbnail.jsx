import React, { useState, useRef } from "react";
import { updateUserThumbnailPath } from "../../api/MypageApi";
import { uploadImg } from "../../api/FileApi";

const UserThumbnail = ({ language, token }) => {
  const [thumbnail, setThumbnail] = useState("");
  const [usageType, setUsageType] = useState("PROFILE");
  const hiddenFileInput = useRef(null);
  console.log("language : ", language, " token : ", token);
  console.log("thumb : ", thumbnail);

  const updateUserThumbnailImage = (response) => {
    const filePath = response.filePath;
    updateUserThumbnailPath({ thumbnail: filePath }, language, token).then(
      (resp) => {
        if (resp.status == 200) {
          setThumbnail(filePath);
        }
        alert(resp.data.message);
      }
    );
  };

  const handleFileChange = async (selectedFile) => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("naverObjectStorageUsageType", usageType);

      const responseData = await uploadImg(formData, language, token)
        .then((response) => {
          if (response.status == 200) {
            updateUserThumbnailImage(response.data);
            console.log("response : ", response.data.filePath);
            return;
          }
          if (response.status != 200) {
            throw new Error("ImageUpload Fail");
          }
        })
        .catch((error) => console.log(err));
    } catch (error) {
      alert("Thumnail Update Failed");
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
        <img
          src={`${process.env.REACT_APP_IMG_URL}${thumbnail}`}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
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
