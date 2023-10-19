import React, { useState, useEffect } from "react";
import { articleDetail } from "../../api/ArticleApi";
import styled from"styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ArticleDetail = () => {
  const { t, i18n } = useTranslation();

  const [data, setData] = useState('');

  const {articleId} = useParams();

  const setArticleByServer = async () => {
    try {
      articleDetail(articleId, i18n.language)
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

  useEffect(() => {
    setArticleByServer();
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

  return (
    <>
    <TableContainer className="noticeDetailTable">
      <Table>
        <TableBody>
          <tr>
            <th style={{textAlign: 'center'}}>번호</th>
            <td>{data.articleId}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>제목</th>
            <td>{data.title}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>제목</th>
            <td>{data.createdUser.nickName}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>작성일</th>
            <td>{data.createAt}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>내용</th>
            <td dangerouslySetInnerHTML={{ __html : data.content }}></td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>첨부파일</th>
            <td>{data.file}</td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
    
    <Row className="mt-5">
      <Col className="d-flex justify-content-end justify-content-center" xs={12}>
        
        <Link to={ `/notice/update/${data.id}` }>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">수정</Button>
        </Link>

        &nbsp;&nbsp;

        <Link to={{ pathname:'/notice' }}>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">목록</Button>
        </Link>

        &nbsp;&nbsp;

        <Link to={{ pathname:'/notice' }}>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">삭제</Button>
        </Link>
      </Col>
    </Row>
    </>
  ) 
}

export default ArticleDetail;

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