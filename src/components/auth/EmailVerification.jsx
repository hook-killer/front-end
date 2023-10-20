import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../api/AuthApi";
import { login } from "../../api/AuthApi";
import { setCookie } from "../../utils/ReactCookie";

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState("아직 인증하지 않음");
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("verificationToken");
  console.log(token)

  verifyEmail(token)
    .then((response) => {
      if (response.status === 200) {
        setVerificationStatus("인증 완료");
        navigate("/");
      } else {
        setVerificationStatus("인증 실패");
      }
    })
    .catch((error) => {
      console.error(error);
      setVerificationStatus("인증 실패");
    });

  return (
    <div>
      <h1>{verificationStatus}</h1>
    </div>
  );
};

export default EmailVerificationPage;
