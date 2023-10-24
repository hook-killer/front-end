import React, { useState, useEffect } from "react";
import { noticeList as noticeAxios } from "../../api/NoticeApi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { isNull } from "../../utils/NullUtils";
import PaginationComponent from "../common/PaginationComponent";
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

const NoticeList = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const role = props.role;

  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = isNull(searchParams.get("page")) ? 0 : searchParams.get("page");
  const articleLimit = isNull(searchParams.get("articleLimit"))
    ? 10
    : searchParams.get("articleLimit");

  const getListSearch = () => {
    noticeAxios(`?page=${page}&articleLimit=${articleLimit}`, i18n.language)
      .then((response) => {
        if (response.data.data && response.data.data.length > 0) {
          setData(response.data.data);
          setTotalPage(response.data.totalPage);
          setTotalElements(response.data.totalElements);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server Error: ", error.response.data);
        } else if (error.request) {
          console.log("No response from server: ", error.request);
        } else {
          console.log("Request Error: ", error.message);
        }
      });
  };

  const pageHandler = (number) => {
    navigate(`/notice?page=${number}&articleLimit=${articleLimit}`);
  };

  const newNoticeOnCLikc = (e) => {
    navigate("/notice/add");
  };

  const ArticleTitleLinkStyle = {
    textDecoration: "none",
    color: "black",
  };

  useEffect(() => {
    getListSearch();

    // 리스너 등록
    i18n.on("languageChanged", getListSearch);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", getListSearch);
    };
  }, [i18n, page, articleLimit]);

  return (
    <>
      <TableContainer className="list-container mt-5 mb-5">
        <Table className="notice-table">
          <ColGroup>
            <col span="1" style={{ width: "10%", minWidth: "45px" }} />
            <col span="1" style={{ width: "70%" }} />
            <col span="1" style={{ width: "20", minWidth: "180px" }} />
          </ColGroup>
          <TableHead>
            <TableTR>
              <TableTH>{t("noticelist.No")}</TableTH>
              <TableTH>{t("noticelist.Title")}</TableTH>
              <TableTH>{t("noticelist.Date")}</TableTH>
            </TableTR>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableTR key={index}>
                <TableTextCenterTD>{item.id}</TableTextCenterTD>
                <TableTextLeftTD>
                  <Link style={ArticleTitleLinkStyle} to={`/notice/${item.id}`}>
                    {item.title}
                  </Link>
                </TableTextLeftTD>
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
      {role === "ADMIN" && (
        <Row className="mt-0 d-flex justify-content-end">
          <Col xs={4}>
            <Button
              style={{ backgroundColor: "#6A24FE", border: "none" }}
              variant="primary"
              className="w-100 text-center"
              onClick={newNoticeOnCLikc}
            >
              {t("noticelist.New Article")}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default NoticeList;
