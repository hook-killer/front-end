import React from "react";
import { deleteArticle as articleAxios } from "../../api/ArticleApi";
import { useNavigate } from "react-router-dom"; // useHistory 대신 useNavigate 사용
import { useTranslation } from "react-i18next";

const ArticleDelete = (props) => {
  const { t, i18n } = useTranslation();
  const token = props.token;
  const articleId = props.articleId;
  const navigate = useNavigate(); // useNavigate 사용

  const handleDelete = async () => {
    try {
      // 기사 삭제 요청을 보냅니다.
      const response = await articleAxios(articleId, i18n.language, token);

      if (response.status === 200) {
        // 성공적으로 삭제된 경우, 루트 페이지로 리디렉션합니다.
        navigate("/");
        // TODO: 삭제 성공 메시지를 추가할 수 있습니다.
      } else {
        // 삭제 실패 시 오류 처리
        console.error("기사 삭제에 실패했습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("기사 삭제 중 오류 발생: ", error);
    }
  }

  return (
    <button
      style={{ backgroundColor: "#6A24FE", border: "none" }}
      className="w-100 text-center"
      onClick={handleDelete}
    >
      {t('Delete')}
    </button>
  );
};

export default ArticleDelete;
