import React, { useState, useEffect } from "react";
import { getUserInfo } from "../../api/MypageApi";
import UserInfoUpdateModal from "./UserInfoUpdateModal";
import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "react-bootstrap";

const UserProfile = ({ token, language }) => {
  const { t, i18n } = useTranslation();

  const [userInfo, setUserInfo] = useState({
    nickName: "",
    password: "",
  });

  useEffect(() => {
    const fetchMyPageInfo = async () => {
      try {
        const response = await getUserInfo(i18n.language, token);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pe-3">
      <Row className="mb-3">
        <Col>
          <label>{t("userinfo.email")} :</label>
          <span>{userInfo.email}</span>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <label>{t("userinfo.nickname")} :</label>
          <span>{userInfo.nickName}</span>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <label>{t("userinfo.createAt")} :</label>
          <span>{userInfo.createAt}</span>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Button className="w-100" onClick={() => setIsModalOpen(true)}>
            {t("mypagebutton.update")}
          </Button>
        </Col>
      </Row>

      {isModalOpen && (
        <UserInfoUpdateModal
          language={language}
          token={token}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
