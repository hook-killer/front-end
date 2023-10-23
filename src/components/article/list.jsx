import React, { useState, useEffect } from "react";
import { listArticle as articleAxios } from "../../api/ArticleApi";
import { useNavigate, useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PaginationComponent from "../common/PaginationComponent";
import { isNull } from "../../utils/NullUtils";
import "../common/pagination.css";
import {
  ColGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableTH,
  TableTR,
  TableTextCenterTD,
  TableTextLeftTD,
} from "../styled/ArticleTableComponent";
import styled from "styled-components";

const ListArticleForm = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const { boardId } = useParams();

  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const customLinkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = isNull(searchParams.get("page")) ? 0 : searchParams.get("page");
  const articleLimit = isNull(searchParams.get("articleLimit"))
    ? 10
    : searchParams.get("articleLimit");

  const getListSearch = () => {
    articleAxios(
      boardId,
      `?page=${page}&articleLimit=${articleLimit}`,
      i18n.language
    )
      .then((response) => {
        if (response.data.data && response.data.data.length > 0) {
          setData(response.data.data);
          setTotalPage(response.data.totalPage);
          setTotalElements(response.data.totalElements);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server Error:", error.response.data);
        } else if (error.request) {
          console.log("No response from server:", error.request);
        } else {
          console.log("Request Error:", error.message);
        }
      });
  };

  const pageHandler = (number) => {
    navigate(
      `/article/list/${boardId}?page=${number}&articleLimit=${articleLimit}`
    );
  };

  useEffect(() => {
    const languageChangeHandler = () => {
      getListSearch();
    };

    languageChangeHandler();

    // 리스너 등록
    i18n.on("languageChanged", languageChangeHandler);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", languageChangeHandler);
    };
  }, [i18n, page, articleLimit, boardId]);

  return (
    <>
      <TableContainer className="list-container mt-1 mb-1">
        <Table className="post-table" style={{ width: "100%" }}>
          <ColGroup>
            <col span="1" style={{ width: "5%", minWidth: "45px" }} />
            <col span="1" style={{ width: "35%" }} />
            <col span="1" style={{ width: "5%", minWidth: "60px" }} />
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "5%", minWidth: "180px" }} />
          </ColGroup>
          <TableHead>
            <TableTR>
              <TableTH>NO</TableTH>
              <TableTH>{t("articlelist.Title")}</TableTH>
              <TableTH>{t("articlelist.Recommend")}</TableTH>
              <TableTH>{t("articlelist.Author")}</TableTH>
              <TableTH>{t("articlelist.Date")}</TableTH>
            </TableTR>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableTR key={index}>
                <TableTextCenterTD>{item.articleId}</TableTextCenterTD>
                <TableTextLeftTD>
                  <Link
                    style={customLinkStyle}
                    to={`/article/${item.articleId}`}
                  >
                    {item.title}
                  </Link>
                </TableTextLeftTD>
                <TableTextCenterTD>{item.likeCount}</TableTextCenterTD>
                <TableTextCenterTD>
                  {item.createdUser.nickName}
                </TableTextCenterTD>
                <TableTextCenterTD>{item.createAt}</TableTextCenterTD>
              </TableTR>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Row className="mt-1 mb-1 d-flex justify-content-center">
        <Col xs={12} className="d-flex justify-content-center">
          <PaginationComponent
            className="pagination"
            totalItems={totalElements}
            itemsPerPage={articleLimit}
            onPageChange={pageHandler}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col
          className="d-flex justify-content-end justify-content-center"
          xs={12}
        >
          <Link to={{ pathname: `/article/add/${boardId}` }}>
            {/* <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">새글</Button> */}
            <Button
              style={{ backgroundColor: "#6A24FE", border: "none" }}
              variant="primary"
              className="w-100 text-center"
            >
              {t("articlelist.New Article")}
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default ListArticleForm;
