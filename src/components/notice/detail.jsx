import React, { useState, useEffect } from "react";
import { noticeDetail as noticeDetailAxios } from "../../api/NoticeApi";
import styled from"styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NoticeDetail = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState('');

  const {noticeArticleId} = useParams();

  useEffect(() => {
    const languageChangeHandler = () => {
    console.log('useEffect 들어옴')
    noticeDetailAxios(noticeArticleId, i18n.language)
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
            <th style={{textAlign: 'center'}}>{t('noticedetail.No')}</th>
            <td>{data.id}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.Title')}</th>
            <td>{data.title}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.Date')}</th>
            <td>{data.createAt}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.Content')}</th>
            <td dangerouslySetInnerHTML={{ __html : data.content }}></td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('noticedetail.Attachment')}</th>
            <td>{data.file}</td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
    
    <Row className="mt-5">
      <Col className="d-flex justify-content-end justify-content-center" xs={12}>
        
        <Link to={ `/notice/update/${data.id}` }>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t("noticedetail.Modification")}</Button>
        </Link>

        &nbsp;&nbsp;

        <Link to={{ pathname:'/notice' }}>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t("noticedetail.List")}</Button>
        </Link>

        &nbsp;&nbsp;

        <Link to={{ pathname:'/notice' }}>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t("noticedetail.Delete")}</Button>
        </Link>
      </Col>
    </Row>
    </>
  );
};

export default NoticeDetail;

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

