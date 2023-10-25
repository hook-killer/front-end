import React, { useState, useRef, useEffect } from "react";
import { updateUserThumbnailPath } from "../../api/MypageApi";
import { uploadImg } from "../../api/FileApi";
import { useTranslation } from "react-i18next";
import {
  expireSevenDays,
  removeCookie,
  setCookie,
} from "../../utils/ReactCookie";
import { isNull } from "../../utils/NullUtils";

const ThumbNailImgType = ({ profile }) => {
  console.log(profile)
  const DEFAULT_THUMBNAIL = "/thumbnail.png";
  if (isNull(profile) || profile == "") {
    return (<img
      src={`${DEFAULT_THUMBNAIL}`}
      alt="ProfileImage"
      style={{ width: "100%", height: "100%" }}
    />)
  }
  if (profile.startsWith("http")) {
    return (
      <img
        src={`${profile}`}
        alt="ProfileImage"
        style={{ width: "100%", height: "100%" }}
      />
    )
  }
  return (
    <img
      src={`${process.env.REACT_APP_IMG_URL}${profile}`}
      alt="ProfileImage"
      style={{ width: "100%", height: "100%" }}
    />
  )
}

const UserThumbnail = ({ language, token, profile, profileSet }) => {
  const { t, i18n } = useTranslation();
  const hiddenFileInput = useRef(null);
  const usageType = "PROFILE";

  const updateUserThumbnailImage = (response) => {
    const filePath = response.filePath;
    updateUserThumbnailPath({ thumbnail: filePath }, i18n.language, token).then(
      (resp) => {
        if (resp.status == 200) {
          removeCookie("profile");
          setCookie("profile", filePath, {
            expires: expireSevenDays,
          });
          profileSet(filePath);
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

      await uploadImg(formData, i18n.language, token).then((response) => {
        if (response.status == 200) {
          updateUserThumbnailImage(response.data);
          return;
        }
        throw new Error("ImageUpload Fail");
      });
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
    <>
      <div className="d-flex justify-content-center">
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            width: "200px",
            height: "200px",
          }}
        >
          <ThumbNailImgType profile={profile} />
        </div>
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
        📂 {t("mypagebutton.upload")}
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={(e) => {
          handleFileChange(e.target.files[0]);
        }}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UserThumbnail;
