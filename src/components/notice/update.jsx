import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { noticeDetail, noticeUpdate as noticeAxios } from "../../api/NoticeApi";
import { uploadImg as imageAxios } from "../../api/FileApi";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const NoticeUpdate = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState("");
  const quillRef = useRef(null);
  const token = props.token;
  const [language, setLanguage] = useState(i18n.language);
  const {noticeArticleId} = useParams();

  console.log("제목 어떻게 넘어오니? ", data.title);
  console.log("내용 어떻게 넘어오니? ", data.content);

  console.log("noticeArticleID : ", noticeArticleId);

  console.log("token : ", token, " language : ", language);

  const handleQuillChange = (e) => {
    console.log(e);
    setData(e);
  };

  useEffect(() => {
    const languageChangeHandler = () => {
      console.log('useEffect 들어옴')
      noticeDetail(noticeArticleId, i18n.language)
        .then((response) => {
          console.log("response : ", response)
          console.log("response.data.length : ", response.data.length)
          if (response.data) {
            setData(response.data);
            console.log("test")
            console.log("test : ", response.data.content);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log('Server Error: ', error.response.data);
          } else if (error.request) {
            console.log('No reseponse from Server: ', error.request);
          } else {
            console.log('Request Error: ', error.message);
          }
        });
    };
    languageChangeHandler();

  // 리스너 등록
  i18n.on("languageChanged", languageChangeHandler);

  // 컴포넌트가 언마운트될 때 리스너 제거
  return () => {
    i18n.off("languageChanged", languageChangeHandler);
  };
}, [i18n]);

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

            input.addEventListener("change", async() => {
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
  },[]);

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

const handleButtonClick = async () => {
  console.log("title : ", title);
  console.log("data : ", data);

  const noticeUpdateForm = {

    language: language,
    title: title,
    content: data,
  };

  noticeAxios(noticeUpdateForm, i18n.language, token)
  .then(response => console.log(response))
  .catch(error => console.log(error));

  console.log("제목 어떻게 넘어오니? ", data.title);
  console.log("내용 어떻게 넘어오니? ", data.content);
};

  return (
    <>
      <Row>
        <Col className="w-100">
          <TextField 
            type="text"
            placeholder={t('noticeadd.제목을 입력하세요.')}
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "24px",
              width: "100%"
            }}
            value={data.title}
            onChange={(e) => setData(e.target.value)}
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
            style={{height: "100%", width: "100%"}}
            theme="snow"
            modules={modules}
            formats={formats}
            value={data.content}
            onChange={handleQuillChange}
          />
        </Col>
      </Row>
      <Row className="mt-5">
          <Col className="d-flex justify-content-end justify-content-center" xs={12}>

            <Link to={{pathname:"/notice"}}>
              <Button 
                variant="primary" 
                className="w-100 text-center" 
                style={{backgroundColor:'#6A24FE', border:'none'}} 
                onClick={handleButtonClick}>
                {t('noticeadd.작성')}
              </Button>
            </Link>
          </Col>
        </Row>
      </>
  )
};

export default NoticeUpdate;