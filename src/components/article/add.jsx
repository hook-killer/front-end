import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { addArticle as articleAxios } from "../../api/ArticleApi";
import { uploadImg as imageAxios } from "../../api/FileApi";
import { Title } from "@mui/icons-material";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReactQuillTemplate = (props) => {
  const { t, i18n } = useTranslation();
  const [quillValue, setQuillValue] = useState("");
  const [title, setTitle] = useState("");
  const quillRef = useRef(null);

  const handleQuillChange = (e) => {
    console.log(e);
    setQuillValue(e);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          [
            // dropdown with defaults from theme
            { align: [] },
            { color: [] },
            { background: [] },
          ],
          ["clean"],
        ],
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
                // setQuillValue(quillValue+IMG_URL)
              } catch (error) {
                console.log("이미지 업로드 실패");
              }
            });
          },
        },
      },
    };
  }, []);

  let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const languageChangeHandler = (() => {
    languageChangeHandler();

  // 리스너 등록
  i18n.on("languageChanged", languageChangeHandler);

  // 컴포넌트가 언마운트될 때 리스너 제거
  return () => {
    i18n.off("languageChanged", languageChangeHandler);
  };
}, [i18n]);

  const handleButtonClick = async () => {
    console.log("title : ", title);
    console.log("quillValue : ", quillValue);

    const addArticleForm = {
      boardId: 1,
      articleId: 1,
      orgArticleLanguage: "KO",
      title: title,
      content: quillValue,
    };

    articleAxios(addArticleForm, language)
      .then((response) => console.log("response : ", response))
      .catch((error) => console.log("error : ", error));
  };

  return (
    <>
      <Row>
        <Col className="w-100">
          <TextField
            type="text"
            placeholder={t('articleadd.제목을 입력하세요.')}
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
      <Row className="mb-5">
        <Col className="w-100">
          <ReactQuill
            ref={quillRef}
            style={{ height: "100%", width: "100%" }}
            theme="snow"
            modules={modules}
            formats={formats}
            value={quillValue}
            onChange={handleQuillChange}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col
          className="d-flex justify-content-end justify-content-center"
          xs={12}
        >
          <Link to={{ pathname: "/article/list" }}>
            <Button
              variant="primary"
              className="w-100 text-center"
              style={{ backgroundColor: "#6A24FE", border: "none" }}
              onClick={handleButtonClick}
            >
              {t('articleadd.작성')}
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default ReactQuillTemplate;
