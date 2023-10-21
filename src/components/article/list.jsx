import React, { useState, useEffect } from "react";
import { listArticle as articleAxios } from "../../api/ArticleApi";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ListArticleForm = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const { boardId } = useParams();
  
  const customLinkStyle = {
    textDecoration: 'none',
    color: 'black'
  }

  useEffect(() => {
    const languageChangeHandler = () => {
      // 언어 변경 이벤트가 발생하면 새로운 언어로 업데이트
      articleAxios(boardId, i18n.language)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setData(response.data);
            console.log(response.data);
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

    languageChangeHandler();

    // 리스너 등록
    i18n.on("languageChanged", languageChangeHandler);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", languageChangeHandler);
    };
  }, [i18n, boardId]);

  console.log(data);

  return (
    <>
      <TableContainer className="list-container">
        <Table className="post-table">
          <ColGroup>
            <col span="1" style={{ width: "5%" }} />
            <col span="1" style={{ width: "35%" }} />
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "5%" }} />
          </ColGroup>
          <TableHead>
            <tr>
              <th>NO</th>
              <th>{t("articlelist.Title")}</th>
              <th>{t("articlelist.Recommend")}</th>
              <th>{t("articlelist.Author")}</th>
              <th>{t("articlelist.Date")}</th>
            </tr>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.articleId}</td>
                <td><Link style={customLinkStyle} to={`/article/${item.articleId}`}>{item.title}</Link></td>
                <td>{item.likeCount}</td>
                <td>{item.createdUser.nickName}</td>
                <td>{item.createAt}</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Row className="mt-5">
        <Col
          className="d-flex justify-content-end justify-content-center"
          xs={12}
        >
          <Link to={{ pathname: "/article/add" }}>
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

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scrolling */
  overflow-x: hidden;
  word-break: break-all;
  white-space: pre-wrap;
  ::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }
  ::-custom-scrollbar-container {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Set the color of the scrollbar thumb */
    border-radius: 5px; /* Round the edges of the scrollbar thumb */
  }
`;

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
    }
  }
`;

const TableBody = styled.tbody`
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
