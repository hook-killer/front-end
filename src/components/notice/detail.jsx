import React, { useState, useEffect } from "react";
import { noticeDetail as noticeAxios, noticeDelete as noticeDeleteAxios } from "../../api/NoticeApi";
import styled from"styled-components";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NoticeDetail = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState('');
  const token = props.token;
  const {noticeArticleId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const languageChangeHandler = () => {
    console.log('useEffect 들어옴')
    noticeAxios(noticeArticleId, i18n.language, token)
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

  const handleDelete = async () => {
    const token = props.token;
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmed) {
      try {
        const response = await noticeDeleteAxios(noticeArticleId, i18n.language, token);
        if (response.status === 200) {
          console.log("삭제 성공");
        } else {
          console.error("삭제 실패");
        }
      } catch (error) {
        console.error("삭제 중 오류 발생");
      }
      navigate("/notice");
    }
  }

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
            {t("noticedetail.Modification")}
          </Button>
        </Link>

        &nbsp;&nbsp;

        <Link to={{ pathname:'/notice' }}>
          <Button 
            style={{backgroundColor:'#6A24FE', border:'none'}} 
            variant="primary" 
            className="w-100 text-center">
            {t("noticedetail.List")}
          </Button>
        </Link>

        &nbsp;&nbsp;

        <Button 
          style={{backgroundColor:'#6A24FE', border:'none'}} 
          variant="primary" 
          onClick={() => handleDelete()}>
          {t("noticedetail.Delete")}
        </Button>
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

