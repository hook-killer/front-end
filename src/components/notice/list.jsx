import React, { useState, useEffect } from "react";
import { noticeList as noticeAxios } from "../../api/NoticeApi";
import styled from "styled-components";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useTranslation } from "react-i18next";
import { isNull } from "../../utils/NullUtils";
import PaginationComponent from "../common/PaginationComponent";
import { CenterFocusStrong } from "@mui/icons-material";
import "./pagination.css"

const NoticeList = ( props ) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const token = props.token;
  const role = props.role;

  console.log("role: ", role);
  console.log("token: ", token);

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
    noticeAxios(`?page=${page}&articleLimit=${articleLimit}`, i18n.language)
      .then((response) => {
        console.log(response);
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
  useEffect(() => {
    getListSearch();

    // 리스너 등록
    i18n.on("languageChanged", getListSearch);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", getListSearch);
    };
  }, [i18n, page, articleLimit]);

  console.log(`totalPage : ${totalPage}, totalElements : ${totalElements}`);
  return (
    <>
      <TableContainer className="list-container">
        <Table className="notice-table">
          <ColGroup>
            <col span="1" style={{ width: "5%" }} />
            <col span="1" style={{ width: "35%" }} />
            <col span="1" style={{ width: "11%" }} />
          </ColGroup>
          <TableHead>
            <tr>
              <th>{t("noticelist.No")}</th>
              <th>{t("noticelist.Title")}</th>
              <th>{t("noticelist.Date")}</th>
            </tr>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <Link style={customLinkStyle} to={`/notice/${item.id}`}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.createAt}</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationComponent
        className="pagination"
        totalItems={totalElements}
        itemsPerPage={articleLimit}
        onPageChange={pageHandler}
      />
      <Row className="mt-5">
        <Col
          className="d-flex justify-content-end justify-content-center"
          xs={12}
        >
          {role === 'ADMIN' && (
          <Link to={{ pathname: "/notice/add" }}>
            <Button
              style={{ backgroundColor: "#6A24FE", border: "none" }}
              variant="primary"
              className="w-100 text-center"
            >
              {t("noticelist.New Article")}
            </Button>
          </Link>
          )}
          
        </Col>
      </Row>
    </>
  );
};

export default NoticeList;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Table = styled.table`
  // background-color: transparent;
  width: 80%;
  margin-top: 10px;
  border: 2px solid #c9e5df;
`;

const ColGroup = styled.colgroup`
  border: 1px solid white;
  background-color: #ffffff;
  padding: 8px;
`;

const TableHead = styled.thead`
  tr {
    th {
      border: 1px solid #c9e5df;
      text-align: center;
      background-color: #ffffff;
      height: 50px;
    }
  }
`;

const TableBody = styled.tbody`
  align-item: center;
  tr {
    td {
      white-space: nowrap;
      border: 1px solid #c9e5df;
      padding: 8px;
      text-align: center;
      font-size: 14px;
      border-spacing: 0;
    }
  }
`;
