import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import {
  detailArticle as detailArticleAxios,
  updateArticle as updateArticleAxios,
} from "../../api/ArticleApi";
import { uploadImg as imageAxios } from "../../api/FileApi";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ArticleUpdate = (props) => {
  const { t, i18n } = useTranslation();
  const token = props.token;
  const quillRef = useRef(null);

  const { articleId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [orgArticleLanguage, setOrgArticleLanguage] = useState(i18n.language);

  useEffect(() => {
    settingDetailData();
  }, []);

  useEffect(() => {
    const languageChangedListener = () => {
      settingDetailData();
    };

    // 리스너 등록
    i18n.on("languageChanged", languageChangedListener);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", languageChangedListener);
    };
  }, [i18n]);

  const settingDetailData = async () => {
    try {
      await detailArticleAxios(articleId, i18n.language).then((res) => {
        console.log("Update Response :", res);
        if (res.status == 200 && res.data) {
          setData(res.data);
          setNewTitle(res.data.title);
          setNewContent(res.data.content);
          setOrgArticleLanguage(res.data.orgArticleLanguage);
        }
      });
    } catch (Error) {
      console.log("Update Search Detail Error", Error);
      alert(t("articleEdit.notFoundArticle"));
      navigate(-1);
    }
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

  const updateArticleHandler = async () => {
    const updateForm = {
      boardId: data.boardId,
      articleId: articleId,
      orgArticleLanguage: orgArticleLanguage,
      title: data.title,
      newTitle: newTitle,
      content: data.content,
      newContent: newContent,
    };
    updateArticleAxios(updateForm, i18n.language, token);
    alert(t("articleEdit.updateSuccess"));
    navigate(-1);
  };

  return (
    <>
      <Row>
        <Col className="w-100">
          <TextField
            type="text"
            placeholder={t("articleEdit.title")}
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "24px",
              width: "100%",
            }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="pb-2">
        <Col xs={2}>{t("noticeadd.orgLanguage")} :</Col>
        <Col xs={10}>
          <select
            onChange={(e) => setOrgArticleLanguage(e.target.value)}
            value={orgArticleLanguage}
            style={{ width: "100%" }}
          >
            <option value="KO">{t("noticeadd.kr")}</option>
            <option value="EN">{t("noticeadd.en")}</option>
            <option value="JP">{t("noticeadd.jp")}</option>
            <option value="CN">{t("noticeadd.cn")}</option>
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
            formats={formats}
            value={newContent}
            onChange={setNewContent}
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
            onClick={updateArticleHandler}
          >
            {t("articleEdit.update")}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ArticleUpdate;
