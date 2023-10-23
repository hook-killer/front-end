import React, { useState, useRef, useEffect } from "react";
import { getUserInfo, updateUserThumbnailPath } from "../../api/MypageApi";
import { uploadImg } from "../../api/FileApi";
import { useTranslation } from "react-i18next";

const UserThumbnail = ({ language, token }) => {
  const { t, i18n } = useTranslation();
  const [thumbnail, setThumbnail] = useState("");
  const [usageType, setUsageType] = useState("PROFILE");
  const hiddenFileInput = useRef(null);
  console.log("language : ", language, " token : ", token);
  console.log("thumb : ", thumbnail);

  useEffect(() => {
    getUserInfo(i18n.language, token)
      .then((response) => {
        if (response.status === 200) {
          setThumbnail(response.data.thumbnail);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user thumbnail:", error);
      });
  }, [language, token]);

  const updateUserThumbnailImage = (response) => {
    const filePath = response.filePath;
    updateUserThumbnailPath({ thumbnail: filePath }, i18n.language, token).then(
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

      await uploadImg(formData, i18n.language, token).then((response) => {
        if (response.status == 200) {
          updateUserThumbnailImage(response.data);
          console.log("response : ", response.data.filePath);
          return;
        }
        if (response.status != 200) {
          throw new Error("ImageUpload Fail");
        }
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

  const DEFAULT_THUMBNAIL = "/thumbnail.png";

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
          <img
            src={
              thumbnail
                ? `${process.env.REACT_APP_IMG_URL}${thumbnail}`
                : DEFAULT_THUMBNAIL
            }
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
          <img src="../"></img>
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
