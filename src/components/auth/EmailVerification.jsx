import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../api/AuthApi";

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState("인증 중");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 컴포넌트가 마운트되면 실행될 코드
    const token = new URLSearchParams(location.search).get("token");

    verifyEmail(token)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setVerificationStatus("인증 완료");
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setVerificationStatus("인증 실패");
        }
      })
      .catch((error) => {
        console.error(error);
        setVerificationStatus("인증 실패");
      });
  }, [location.search, navigate]);

  return (
    <div>
      <h1>{verificationStatus}</h1>
    </div>
  );
};

export default EmailVerificationPage;
