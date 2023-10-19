import React, { useState, useEffect } from "react";
import { listArticle as articleAxios } from "../../api/ArticleApi";
import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const ListArticleForm = ({props}) => {
  const { t, i18n } = useTranslation();
  const [ data, setData] = useState([]);
  const { boardId } = useParams();

  useEffect(() => {
    articleAxios(boardId)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Server Error:', error.response.data);
        } else if (error.request) {
          console.log('No response from server:', error.request);
        } else {
          console.log('Request Error:', error.message);
        }
      });
  }, []); // 빈 배열을 전달하여 이펙트가 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.


return (
  <>
  {/* <div>
  <button onClick={() => i18n.changeLanguage('en')}>English</button>
  <button onClick={() => i18n.changeLanguage('ko')}>한국어</button>
  <button onClick={() => i18n.changeLanguage('jp')}>日本語</button>
  <button onClick={() => i18n.changeLanguage('cn')}>中文</button>
  </div> */}
  
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
          <th></th>
          <th>{t('list.제목')}</th>
          <th>{t('list.작성자')}</th>
          <th>{t('list.작성일')}</th>
          <th>{t('list.추천')}</th>
        </tr>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.articleId}</td>
            <td>{item.title}</td>
            <td>{item.createAt}</td>
            <td>{item.likeCount}</td>
          </tr>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Row className="mt-5">
    <Col className="d-flex justify-content-end justify-content-center" xs={12}>
      <Link to={{ pathname:'/article/add' }}>
      {/* <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">새글</Button> */}
      <Button style={{ backgroundColor: '#6A24FE', border: 'none' }} variant="primary" className="w-100 text-center">{t('list.새글')}</Button>
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
  word-break:break-all;
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
`

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
  border: 2px solid #C9E5DF;
`;

const ColGroup = styled.colgroup`
  border: 1px solid white;
  background-color: #FFFFFF;
  padding: 8px;
`;

const TableHead = styled.thead`
  tr {
    th {
      border: 1px solid #C9E5DF;
      text-align: center;
      background-color: #FFFFFF;
    }
  }
`;

const TableBody = styled.tbody`
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
`
