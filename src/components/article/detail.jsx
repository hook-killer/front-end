import React, { useState, useEffect } from "react";
import { detailArticle as articleAxios } from "../../api/ArticleApi";
import styled from"styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ArticleDetail = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState('');
  const token = props.token;

  const {articleId} = useParams();

  const setArticleByServer = async () => {
    try {
      console.log('useEffect 들어옴')
      articleAxios(articleId, i18n.language, token)
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
    <TableContainer>
      <Table>
        <TableBody>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.번호')}</th>
            <td>{data.articleId}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.제목')}</th>
            <td>{data.title}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.작성자')}</th>
            <td>{data.createdUser ? data.createdUser.nickName : '유저 정보 없음'}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.작성일')}</th>
            <td>{data.createAt}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.내용')}</th>
            <td dangerouslySetInnerHTML={{ __html : data.content }}></td>
          </tr>
          {/* <tr>
            <th style={{textAlign: 'center'}}>첨부파일</th>
            <td>{data.file}</td>
          </tr> */}
        </TableBody>
      </Table>
    </TableContainer>
    
    <Row className="mt-5">
      <Col className="d-flex justify-content-end justify-content-center" xs={12}>
        
        <Link to={ `/article/update/${data.id}` }>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t('articledetail.수정')}</Button>
        </Link>

        &nbsp;&nbsp;

          {/* TODO 원래 페이지로 redirect 시키기 */}
        <Link to={{ pathname:'/' }}>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t('articledetail.목록')}</Button>
        </Link>

        &nbsp;&nbsp;


        <Link to={`/article/delete/${data.articleId}`}>
      <Button
        style={{ backgroundColor: "#6A24FE", border: "none" }}
        variant="primary"
        className="w-100 text-center"
      >
        {t('articledetail.삭제')}
      </Button>
    </Link>
        {/* <Link to={`/article/${data.articleId}` }>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t('articledetail.삭제')}</Button>
        </Link> */}
      </Col>
    </Row>
    </>
  ) 
}

export default ArticleDetail;

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