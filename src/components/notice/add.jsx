import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { addNotice as noticeAxios } from "../../api/NoticeApi";
import { uploadImg as imageAxios } from "../../api/FileApi";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NoticeAdd = (props) => {
  const { t, i18n } = useTranslation();
  const [quillValue, setQuillValue] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(i18n.language);
  const quillRef = useRef(null);
  const token = props.token;
  const role = props.role;
  // const language = i18n.language;
  console.log("token : ", token, " language : ", language);
  console.log("role : ", role);

  console.log('게시물 작성 페이지', props)
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
              } catch (error) {
                console.log("이미지 업로드에 실패했습니다.");
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
    console.log("title : ", title);
    console.log("quillValue : ", quillValue);

    const addNoticeForm = {
      language: language,
      title: title,
      content: quillValue,
    };

    console.log("토큰 잘 넘어오니? : ", token)
    noticeAxios(addNoticeForm, i18n.language, token)
    .then((response) => console.log("response : ", response))
    .catch((error) => console.log("error : ", error));
  };

  return (
    <>
      <Row>
        <Col className="w-100">
          <TextField
            type="text"
            placeholder={t("noticeadd.제목을 입력하세요.")}
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
        <Col xs={2}>{t("noticeadd.orgLanguage")} :</Col>
        <Col xs={10}>
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
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
          <Link to={{ pathname: "/notice" }}>
            <Button
              variant="primary"
              className="w-100 text-center"
              style={{ backgroundColor: "#6A24FE", border: "none" }}
              onClick={handleButtonClick}
            >
              {t("noticeadd.Add")}
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default NoticeAdd;
