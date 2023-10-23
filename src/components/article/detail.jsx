import React, { useState, useEffect } from "react";
import { detailArticle as detailArticleAxios, deleteArticle as deleteArticleAxios, likeArticle as likeArticleAxios, dislikedArticle as dislikedArticleAxios } from "../../api/ArticleApi";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReplyAdd from "../reply/add";
import "./detail.css";
import dislike from "../../asset/싫어요.png";
import like from "../../asset/좋아요.png";

const ArticleDetail = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState('');
  const token = props.token;
  const navigate = useNavigate();

  const { articleId } = useParams();
  const [liked, setLiked] = useState(false);

  const setArticleByServer = async () => {
    try {
      console.log('useEffect 들어옴')
      detailArticleAxios(articleId, i18n.language, token)
        .then((res) => {
          console.log("res : ", res);
          console.log("res.data : ", res.data);
          if (res.data) {
            setData(res.data);
            console.log("data set test : ", data);
          }
        })
    } catch (error) {
      if (error.response) {
        console.log('Server Error: ', error.response.data);
      } else if (error.request) {
        console.log('No reseponse from Server: ', error.request);
      } else {
        console.log('Request Error: ', error.message);
      }
    }
  }

  const checkIfLiked = async () => {
    try {
      const response = await dislikedArticleAxios(articleId, i18n.language, token);
      if (response.status === 200) {
        setLiked(response.data.result); // 서버에서 받은 정보에 따라 좋아요 상태 설정
        console.log("좋아요 상태 확인 : ", response);
      } else {
        console.error("좋아요 상태 확인 실패");
      }
    } catch (error) {
      console.error("좋아요 상태 확인 중 오류 발생");
    }
  };

  const handleLike = async () => {
    try {
      const response = await likeArticleAxios(articleId, i18n.language, token);

      if (response.status === 200) {
        console.log("좋아요 업데이트 성공");
        setLiked(!liked);
      } else {
        console.error("좋아요 업데이트 실패");
      }
    } catch (error) {
      console.error("좋아요 업데이트 중 오류 발생");
      console.log(articleId);
      console.log(token);
    }
  };

  useEffect(() => {
    setArticleByServer();
    checkIfLiked();
  }, []);

  useEffect(() => {
    setArticleByServer();
    // 리스너 등록
    i18n.on("languageChanged", setArticleByServer);
    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", setArticleByServer);
    };
  }, [i18n]);

  const handleDelete = async () => {
    const token = props.token
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmed) {
      try {
        const response = await deleteArticleAxios(articleId, i18n.language, token);
        if (response.status === 200) {
          console.log("기사 삭제 성공");

        } else {
          console.error("기사 삭제 실패");
        }
      } catch (error) {
        console.error("기사 삭제 중 오류 발생");

      }
      // alert("삭제 성공!")
      navigate("/");
    }
  }


  return (
    <div className="article-detail-container">
      <div className="article-info">
        <div className="title-column">
          <h2 className="article-title">{data.title}</h2>
        </div>
        <div className="author-date-column">
          <div className="article-author">
            <small>작성자: {data.createdUser ? data.createdUser.nickName : '유저 정보 없음'}</small>
          </div>
          <div className="article-date">
            <small>작성일: {data.createAt}</small>
          </div>
        </div>
      </div>

      <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
      <div className="article-actions">


      </div>
<Row className="mt-5">
  <Col className="d-flex justify-content-end justify-content-center" xs={12}>
    <Link to={`/article/update/${data.id}`}>
      <Button style={{ backgroundColor: '#6A24FE', border: 'none' }} variant="primary" className="w-100 text-center">
        {t('articledetail.Modification')}
      </Button>
    </Link>
    &nbsp;&nbsp;
    <Link to={{ pathname: '/' }}>
      <Button style={{ backgroundColor: '#6A24FE', border: 'none' }} variant="primary" className="w-100 text-center">
        {t('articledetail.List')}
      </Button>
    </Link>
    &nbsp;&nbsp;
    <Button
  style={{ backgroundColor: "#6A24FE", border: "none", padding: "5px 10px" }} // 버튼의 패딩을 조절
  variant="primary"
  onClick={handleDelete}
>
  {t('articledetail.Delete')}
</Button>
&nbsp;&nbsp;
<Button
  style={{ backgroundColor: "#FFFFFF", border: "none", padding: "5px" }} // 버튼의 패딩을 조절
  variant="primary"
  onClick={handleLike}
>
  <img
    src={liked ? dislike : like}
    style={{ width: "20px", height: "20px" }} // 이미지의 가로와 세로 크기를 조절
    alt="Like/Dislike"
  />
</Button>

  </Col>
</Row>
<div className="article-actions">
  {/* 추가 작업이 필요하다면 이 공간에 추가 내용을 넣을 수 있습니다. */}
</div>
<ReplyAdd />
</div>

  )
}


export default ArticleDetail;

const TableContainer = styled.div`
  border-radius: 5px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
  align-items: center;
  margin-top: 30px;
`;

const Table = styled.table`
  // background-color: transparent;
  width: 80%;
  margin-top: 10px;
  border: 2px solid #C9E5DF;
`;

const TableBody = styled.tbody`
align-item: center;
  tr {
    td {
      white-space: nowrap;
      border: 1px solid #C9E5DF;
      padding: 8px;
      text-align: center;
      font-size: 14px;
      border-spacing: 0;
    }
  }
`;

