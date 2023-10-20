import React, { useState, useEffect } from "react";
import { noticeDetail as noticeAxios } from "../../api/NoticeApi";
import styled from"styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NoticeDetail = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState('');
  const token = props.token;
  const {noticeArticleId} = useParams();

  useEffect(() => {
    const languageChangeHandler = () => {
    console.log('useEffect 들어옴')
    noticeAxios(noticeArticleId, i18n.language)
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
  };
  
  languageChangeHandler();

  // 리스너 등록
  i18n.on("languageChanged", languageChangeHandler);

  // 컴포넌트가 언마운트될 때 리스너 제거
  return () => {
    i18n.off("languageChanged", languageChangeHandler);
  };
}, [i18n]);

console.log(data);

  return (
    <>
    <TableContainer className="noticeDetailTable">
      <Table>
        <TableBody>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.번호')}</th>
            <td>{data.id}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.제목')}</th>
            <td>{data.title}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.작성일')}</th>
            <td>{data.createAt}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.내용')}</th>
            <td dangerouslySetInnerHTML={{ __html : data.content }}></td>
            {/* <td dangerouslySetInnerHTML={{ __html : data.file }}></td> */}
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.첨부파일')}</th>
            <td dangerouslySetInnerHTML={{ __html : data.file }}></td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
    
    <Row className="mt-5">
      <Col className="d-flex justify-content-end justify-content-center" xs={12}>
        
        <Link to={ `/notice/update/${data.id}` }>
          <Button 
            style={{backgroundColor:'#6A24FE', border:'none'}} 
            variant="primary" 
            className="w-100 text-center">
            {t("noticedetail.수정")}
          </Button>
        </Link>

        &nbsp;&nbsp;

        <Link to={{ pathname:'/notice' }}>
          <Button 
            style={{backgroundColor:'#6A24FE', border:'none'}} 
            variant="primary" className="w-100 text-center">
            {t("noticedetail.목록")}
            </Button>
        </Link>

        &nbsp;&nbsp;

        <Link to={`/notice/delete/${data.id}`}>
          <Button 
            style={{backgroundColor:'#6A24FE', border:'none'}} 
            variant="primary" 
            className="w-100 text-center">
            {t("noticedetail.삭제")}
          </Button>
        </Link>
      </Col>  
    </Row>
    </>
  );
};

export default NoticeDetail;

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

