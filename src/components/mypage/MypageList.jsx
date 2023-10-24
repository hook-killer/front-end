import React, { useState, useEffect } from "react";
import { myPageList as myPageListAxios } from "../../api/MypageApi";
import { useTranslation } from "react-i18next";
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
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import PaginationComponent from "../common/PaginationComponent";

const TableBodyContent = (searchType, rowDatas) => {
  if (searchType == "article") {
    return ArticleRow(rowDatas);
  }
  if (searchType == "reply") {
    return ReplyRow(rowDatas);
  }
  return LikeRow(rowDatas);
};

const ArticleRow = (rowDatas) =>
  rowDatas.map((rowData, index) => (
    <TableTR key={`ArticleRow_${rowData.boardId}_${index}`}>
      <TableTextCenterTD>{rowData.boardType}</TableTextCenterTD>
      <TableTextLeftTD>
        <Link
          to={`/article/${rowData.articleId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {rowData.title}
        </Link>
      </TableTextLeftTD>
      <TableTextCenterTD>{rowData.createAt}</TableTextCenterTD>
      <TableTextCenterTD>{rowData.likeCount}</TableTextCenterTD>
    </TableTR>
  ));

const ReplyRow = (rowDatas) =>
  rowDatas.map((rowData, index) => (
    <TableTR key={`ReplyRow_${rowData.articleId}_${index}`}>
      <TableTextLeftTD>
        <Link
          to={`/article/${rowData.articleId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {rowData.content}
        </Link>
      </TableTextLeftTD>
      <TableTextCenterTD>{rowData.createAt}</TableTextCenterTD>
    </TableTR>
  ));

const LikeRow = (rowDatas) =>
  rowDatas.map((rowData, index) => (
    <TableTR key={`LikeRow_${rowData.boardId}_${index}`}>
      <TableTextCenterTD>{rowData.boardType}</TableTextCenterTD>
      <TableTextLeftTD>
        <Link
          to={`/article/${rowData.articleId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {rowData.title}
        </Link>
      </TableTextLeftTD>
      <TableTextCenterTD>{rowData.createdUser?.nickName}</TableTextCenterTD>
      <TableTextCenterTD>{rowData.createAt}</TableTextCenterTD>
    </TableTR>
  ));

const MypageList = ({ language, token }) => {
  const { t, i18n } = useTranslation();
  const [searchType, setSearchType] = useState("article");

  const [items, setItems] = useState([]);

  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const myCreatedListRender = async () => {
    try {
      await myPageListAxios(
        i18n.language,
        token,
        searchType,
        `?page=${page}&limit=${limit}`
      ).then((response) => {
        if (response.status == 200) {
          console.log("mylist", response);
          setItems(response.data.data);
          setTotalPage(response.data.totalPage);
          setTotalElements(response.data.totalElements);
          return;
        }
        throw new Error("Not Success Error");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const pageHandler = (number) => {
    setPage(number);
  };

  const changeSearchType = (searchTypeValue) => {
    setSearchType(searchTypeValue);
    setPage(0);
  };

  useEffect(() => {
    myCreatedListRender();
  }, [searchType, page]);

  useEffect(() => {
    const changeLanguage = () => {
      setSearchType("article");
      myCreatedListRender();
    };

    // 리스너 등록
    i18n.on("languageChanged", changeLanguage);
    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", changeLanguage);
    };
  }, [i18n]);

  return (
    <>
      <CustomTableContainer className="mypagelist-container mt-2">
        <ButtonGroup
          style={{
            zIndex: 5,
          }}
          aria-label="SearchType"
          className="w-100"
        >
          <Button
            variant={searchType != "article" ? "secondary" : "primary"}
            onClick={() => changeSearchType("article")}
          >
            {t("mypagebutton.article")}
          </Button>
          <Button
            variant={searchType != "reply" ? "secondary" : "primary"}
            onClick={() => changeSearchType("reply")}
          >
            {" "}
            {t("mypagebutton.reply")}
          </Button>
          <Button
            variant={searchType != "like" ? "secondary" : "primary"}
            onClick={() => changeSearchType("like")}
          >
            {t("mypagebutton.like")}
          </Button>
        </ButtonGroup>
        <Table className="post-table w-100 mt-0">
          {searchType === "article" && (
            <ColGroup>
              <col span="1" style={{ width: "8%", minWidth: "60px" }} />
              <col span="1" style={{ width: "64%" }} />
              <col span="1" style={{ width: "20%", minWidth: "180px" }} />
              <col span="1" style={{ width: "8%", minWidth: "60px" }} />
            </ColGroup>
          )}
          {searchType === "reply" && (
            <ColGroup>
              <col span="1" style={{ width: "70%" }} />
              <col span="1" style={{ width: "30%" }} />
            </ColGroup>
          )}
          {searchType === "like" && (
            <ColGroup>
              <col span="1" style={{ width: "8%", minWidth: "60px" }} />
              <col span="1" style={{ width: "64%" }} />
              <col span="1" style={{ width: "8%", minWidth: "60px" }} />
              <col span="1" style={{ width: "20%", minWidth: "180px" }} />
            </ColGroup>
          )}

          <TableHead>
            {searchType === "article" && (
              <TableTR>
                <TableTH>{t("mypagelist.board")}</TableTH>
                <TableTH>{t("mypagelist.title")}</TableTH>
                <TableTH>{t("mypagelist.createAt")}</TableTH>
                <TableTH>{t("mypagelist.likecount")}</TableTH>
              </TableTR>
            )}
            {searchType === "reply" && (
              <TableTR>
                <TableTH>{t("mypagelist.reply")}</TableTH>
                <TableTH>{t("mypagelist.createAt")}</TableTH>
              </TableTR>
            )}
            {searchType === "like" && (
              <TableTR>
                <TableTH>{t("mypagelist.board")}</TableTH>
                <TableTH>{t("mypagelist.title")}</TableTH>
                <TableTH>{t("mypagelist.author")}</TableTH>
                <TableTH>{t("mypagelist.createAt")}</TableTH>
              </TableTR>
            )}
          </TableHead>
          <TableBody>{TableBodyContent(searchType, items)}</TableBody>
        </Table>
      </CustomTableContainer>
      <Row className="mt-1 mb-1 d-flex justify-content-center">
        <Col xs={12} className="d-flex justify-content-center">
          <PaginationComponent
            className="pagination"
            totalItems={totalElements}
            itemsPerPage={limit}
            onPageChange={pageHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default MypageList;

const CustomTableContainer = styled.div`
  height: 100%;
`;
