import React, { useState, useEffect } from "react";
import {
  detailArticle as detailArticleAxios,
  deleteArticle as deleteArticleAxios,
  likeArticle as likeArticleAxios,
  dislikedArticle as dislikedArticleAxios,
} from "../../api/ArticleApi";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, OverlayTrigger, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReplyAdd from "../reply/add";
import ReplyList from "../reply/list";
import "./detail.css";
import dislike from "../../asset/dislike.png";
import like from "../../asset/like.png";
import jwtDecode from "jwt-decode";
import Popover from "react-bootstrap/Popover";
import Profile from "../common/Profile";

const ArticleDetail = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState("");
  const token = props.token;
  const navigate = useNavigate();

  const { articleId } = useParams();
  const [liked, setLiked] = useState(false);

  const decodeToken = token != "" ? jwtDecode(token) : "";
  const loginId = token == "" ? 0 : decodeToken.sub;
  const loginRole = token == "" ? "GUEST" : decodeToken.role;
  const [createdUserId, setCreatedUserId] = useState("");
  const [createdUser, setCreatedUser] = useState({});

  const [hookVal, setHookVal] = useState(0);

  const setArticleByServer = async () => {
    try {
      detailArticleAxios(articleId, i18n.language, token).then((res) => {
        if (res.data) {
          setData(res.data);
          setCreatedUserId(res.data.createdUser.id);
          setCreatedUser(res.data.createdUser);
        }
      });
    } catch (error) {
      if (error.response) {
        console.log("Server Error: ", error.response.data);
      } else if (error.request) {
        console.log("No reseponse from Server: ", error.request);
      } else {
        console.log("Request Error: ", error.message);
      }
    }
  };

  const checkIfLiked = async () => {
    try {
      const response = await dislikedArticleAxios(
        articleId,
        i18n.language,
        token
      );
      if (response.status === 200) {
        setLiked(response.data.result); // 서버에서 받은 정보에 따라 좋아요 상태 설정
      } else {
      }
    } catch (error) {
      console.error("좋아요 상태 확인 중 오류 발생");
    }
  };

  const handleLike = async () => {
    try {
      const response = await likeArticleAxios(articleId, i18n.language, token);

      if (response.status === 200) {
        setLiked(!liked);
      } else {
      }
    } catch (error) {
      console.error("좋아요 업데이트 중 오류 발생");
      console.log(error);
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
    const token = props.token;
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmed) {
      try {
        const response = await deleteArticleAxios(
          articleId,
          i18n.language,
          token
        );
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
  };

  console.log(data);
  return (
    <div className="ps-5 pe-5">
      <Row className="mt-5">
        <Col xs={10}>
          <h1>{data.title}</h1>
        </Col>
        <Col className="py-3 text-end">
          <small>
            {t("articlelist.Recommend")} : {data.likeCount}
          </small>
        </Col>
      </Row>
      <Row>
        <Col>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            trigger={["hover", "hover"]}
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h3">UserInfo</Popover.Header>
                <Popover.Body>
                  <Row className="d-flex justify-content-center">
                    <Col>
                      <Profile thumnail={createdUser.thumbnail} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col>
                      {t("userinfo.nickname")} :
                      {createdUser ? createdUser.nickName : "유저 정보 없음"}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col>
                      {t("userinfo.email")} :
                      {createdUser ? createdUser.email : "유저 정보 없음"}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col>
                      Role :{createdUser ? createdUser.role : "유저 정보 없음"}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col>
                      {t("userinfo.createAt")} :
                      {createdUser ? createdUser.createAt : "유저 정보 없음"}
                    </Col>
                  </Row>
                </Popover.Body>
              </Popover>
            }
          >
            <small>
              {t("articlelist.Author")} :
              {data.createdUser ? data.createdUser.nickName : "유저 정보 없음"}
            </small>
          </OverlayTrigger>
        </Col>
        <Col className="text-end">
          <small>
            {t("articlelist.Date")} :{data.createAt}
          </small>
        </Col>
      </Row>
      <hr />
      <Row className="article-content">
        <Col xs={12} dangerouslySetInnerHTML={{ __html: data.content }}></Col>
      </Row>
      <div className="article-actions"></div>
      {token != "" && (
        <Row className="mt-5 d-flex justify-content-center">
          <Col xs={3}>
            <Button
              variant={liked ? "danger" : "primary"}
              onClick={handleLike}
              style={{ width: "100%" }}
            >
              <img
                src={liked ? dislike : like}
                style={{ width: "20px", height: "20px" }} // 이미지의 가로와 세로 크기를 조절
                alt="Like/Dislike"
                className="me-2"
              />
              {liked ? "DisLike" : "Like"}
            </Button>
          </Col>
        </Row>
      )}
      <Row className="mt-2 d-flex justify-content-end">
        {(loginRole == "ADMIN" || loginId == createdUserId) && (
          <>
            <Col xs={1}>
              <Link to={`/article/update/${data.articleId}`}>
                <Button
                  style={{ backgroundColor: "#6A24FE", border: "none" }}
                  className="w-100 text-center"
                >
                  {t("articledetail.Modification")}
                </Button>
              </Link>
            </Col>
            <Col xs={1}>
              <Button
                style={{
                  backgroundColor: "#6A24FE",
                  border: "none",
                  padding: "5px 10px",
                }} // 버튼의 패딩을 조절
                className="w-100 text-center"
                onClick={handleDelete}
              >
                {t("articledetail.Delete")}
              </Button>
            </Col>
          </>
        )}
        <Col xs={1}>
          <Link to={{ pathname: "/" }}>
            <Button
              style={{ backgroundColor: "#6A24FE", border: "none" }}
              className="w-100 text-center"
            >
              {t("articledetail.List")}
            </Button>
          </Link>
        </Col>
      </Row>
      <div className="article-actions">
        {/* 추가 작업이 필요하다면 이 공간에 추가 내용을 넣을 수 있습니다. */}
      </div>
      <ReplyAdd token={token} hookVal={hookVal} setHook={setHookVal} />
      <ReplyList token={token} hookVal={hookVal} />
    </div>
  );
};

export default ArticleDetail;
