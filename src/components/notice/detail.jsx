import React, { useState, useEffect } from "react";
import { noticeDetail as noticeDetailAxios } from "../../api/NoticeApi";
import styled from"styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

const NoticeDetail = () => {
  const [data, setData] = useState('');

  const {noticeArticleId} = useParams();

  useEffect(() => {
    console.log('useEffect 들어옴')
    noticeDetailAxios(noticeArticleId)
      .then((response) => {
        console.log("response : ", response)
        console.log("response.data.length : ", response.data.length)
        if (response.data) {
          setData(response.data);
          console.log("test")
          console.log("test : ", response.content);
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
  }, []);

  return (
    <>
    <TableContainer className="noticeDetailTable">
      <Table>
        <TableBody>
          <tr>
            <th style={{textAlign: 'center'}}>번호</th>
            <td>{data.id}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>제목</th>
            <td>{data.title}</td>
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
  );
};

export default NoticeDetail;

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

