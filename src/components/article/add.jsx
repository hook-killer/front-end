import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { addArticle as articleAxios } from "../../api/ArticleApi";
import { uploadImg as imageAxios } from "../../api/FileApi";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Formats } from "../../utils/QuillEditorUtils";

const ArticleAdd = (props) => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(i18n.language);
  const { boardId } = useParams();
  const quillRef = useRef(null);
  const token = props.token;

  const navigate = useNavigate();

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: Container,
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.addEventListener("change", async () => {
              const file = input.files[0];
              const formData = new FormData();
              formData.append("image", file);
              formData.append("naverObjectStorageUsageType", "ARTICLE");

              try {
                const result = await imageAxios(formData);

                const IMG_URL = `${process.env.REACT_APP_IMG_URL}${result.data.filePath}`;
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, "image", IMG_URL);
                editor.setSelection(range.index + 1);
              } catch (error) {
                console.log("이미지 업로드 실패");
              }
            });
          },
        },
      },
    };
  }, []);

  const languageChangeHandler =
    (() => {
      languageChangeHandler();

      // 리스너 등록
      i18n.on("languageChanged", languageChangeHandler);

      // 컴포넌트가 언마운트될 때 리스너 제거
      return () => {
        i18n.off("languageChanged", languageChangeHandler);
      };
    },
    [i18n]);

  const handleButtonClick = async () => {
    const addArticleForm = {
      boardId: boardId,
      orgArticleLanguage: language,
      title: title,
      content: content,
    };

    articleAxios(addArticleForm, i18n.language, token)
      .then((response) => console.log("response : ", response))
      .catch((error) => console.log("error : ", error));

    navigate(`/article/list/${boardId}`);
  };

  return (
    <>
      <Row>
        <Col className="w-100">
          <TextField
            type="text"
            placeholder={t("articleadd.제목을 입력하세요.")}
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "24px",
              width: "100%",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="pb-2">
        <Col xs={2}>{t("articleadd.orgLanguage")}</Col>
        <Col xs={10}>
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            style={{ width: "100%" }}
          >
            <option value="KO">{t("articleadd.kr")}</option>
            <option value="EN">{t("articleadd.en")}</option>
            <option value="JP">{t("articleadd.jp")}</option>
            <option value="CN">{t("articleadd.cn")}</option>
          </select>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="w-100">
          <ReactQuill
            ref={quillRef}
            style={{ height: "100%", width: "100%" }}
            theme="snow"
            modules={modules}
            formats={Formats}
            value={content}
            onChange={(e) => setContent(e)}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col
          className="d-flex justify-content-end justify-content-center"
          xs={12}
        >
          <Button
            variant="primary"
            className="w-100 text-center"
            style={{ backgroundColor: "#6A24FE", border: "none" }}
            onClick={handleButtonClick}
          >
            {t("articleadd.Add")}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ArticleAdd;
