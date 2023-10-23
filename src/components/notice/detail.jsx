import React, { useState, useEffect } from "react";
import { noticeDetail as noticeAxios, noticeDelete as noticeDeleteAxios } from "../../api/NoticeApi";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./detail.css"

const NoticeDetail = (props) => {
  const {noticeArticleId} = useParams();
  const { t, i18n } = useTranslation();
  const token = props.token;
  const role = props.role;
  const [data, setData] = useState('');
  const navigate = useNavigate();
  
  console.log("Role이 뭐냐? ", role);
  console.log("token: ", token);
  console.log("상세보기 페이지", props);

  useEffect(() => {
    const languageChangeHandler = () => {
    console.log('useEffect 들어옴')
    noticeAxios(noticeArticleId, i18n.language, token)
      .then((response) => {
        console.log("response : ", response)
        console.log("response.data.length : ", response.data.length)
        if (response.data) {
          setData(response.data);
          console.log("test")
          console.log("test : ", response.content);
          console.log("토큰 들어오냐??? ", token);
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

  console.log(data);

  const handleDelete = async () => {
    const token = props.token;
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmed) {
      console.log("token 들어옴? ", token);
      try {
        const response = await noticeDeleteAxios(noticeArticleId, i18n.language, token);
        if (response.status === 200) {
          console.log("삭제 성공");
        } else {
          console.error("삭제 실패");
        }
      } catch (error) {
        console.error("삭제 중 오류 발생");
      }
      navigate("/notice");
    }
  }

  return (
    <div className="noticeDetailContainer">
      <div className="noticeInfo">
        <div className="titleColumn">
          <h2 className="noticeTitle">{data.title}</h2>
        </div>
        <div className="numberDateColumn">
          <div className="noticeNumber">
            <small>게시번호: {data.id}</small>
          </div>
          <div className="createdDate">
            <small>작성일: {data.createAt}</small>
          </div>
        </div>
      </div>

      <div className="noticeContent" dangerouslySetInnerHTML={{__html: data.content}}></div>
      <div className="noticeActions">

      </div>
      <Row className="mmt-5">
        <Col className="d-flex justify-content-end justify-content-center" xs={12}>
          {role === 'ADMIN' && (
          <Link to={`/notice/update/${data.id}`}>
            <Button 
              style={{ backgroundColor: '#6A24FE', border: 'none' }} 
              variant="primary" 
              className="w-100 text-center">
              {t('noticedetail.Modification')}
            </Button>
          </Link>
          )}
          &nbsp;&nbsp;
          <Link to={{ pathname: '/notice' }}>
            <Button 
              style={{ backgroundColor: '#6A24FE', border: 'none' }} 
              variant="primary" 
              className="w-100 text-center">
              {t('noticedetail.List')}
            </Button>
          </Link>
          &nbsp;&nbsp;
          {role === 'ADMIN' && (
          <Button
            style={{ backgroundColor: "#6A24FE", border: "none", padding: "5px 10px" }}
            variant="primary"
            onClick={handleDelete}>
            {t('noticedetail.Delete')}
          </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default NoticeDetail;