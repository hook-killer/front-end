import React, { useState, useEffect } from "react";
import { detailArticle as detailArticleAxios, deleteArticle as deleteArticleAxios, likeArticle as likeArticleAxios, dislikedArticle as dislikedArticleAxios} from "../../api/ArticleApi";
import styled from"styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ArticleDetail = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState('');
  const token = props.token;
  const navigate = useNavigate();

  const {articleId} = useParams();
  const [liked, setLiked] = useState(false);

  const setArticleByServer = async () => {
    try {
      console.log('useEffect 들어옴')
      detailArticleAxios(articleId, i18n.language, token)
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

  const checkIfLiked = async () => {
    try {
      const response = await dislikedArticleAxios(articleId, i18n.language, token);
      if (response.status === 200) {
        setLiked(response.data.result); // 서버에서 받은 정보에 따라 좋아요 상태 설정
        console.log("좋아요 상태 확인 : ", response);
      } else {
        console.error("좋아요 상태 확인 실패");
      }
    } catch (error) {
      console.error("좋아요 상태 확인 중 오류 발생");
    }
  };

  const handleLike = async () => {
    try {
      const response = await likeArticleAxios(articleId, i18n.language, token);
      
      if (response.status === 200) {
        console.log("좋아요 업데이트 성공");
        setLiked(!liked);
      } else {
        console.error("좋아요 업데이트 실패");
      }
    } catch (error) {
      console.error("좋아요 업데이트 중 오류 발생");
      console.log(articleId);
      console.log(token);
    }
  };


  useEffect(() => {
    setArticleByServer();
    checkIfLiked();
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

  const handleDelete = async () => {
    const token = props.token
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    
    if (confirmed) {
      try {
      const response = await deleteArticleAxios(articleId, i18n.language, token);
      if (response.status === 200) {
        console.log("기사 삭제 성공");
        
      } else {
        console.error("기사 삭제 실패");
      }
    } catch (error) {
      console.error("기사 삭제 중 오류 발생");
      
    }
    // alert("삭제 성공!")
    navigate("/");
    }
  }
  

  return (
    <>
    <TableContainer>
      <Table>
        <TableBody>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.No')}</th>
            <td>{data.articleId}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.Title')}</th>
            <td>{data.title}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.Author')}</th>
            <td>{data.createdUser ? data.createdUser.nickName : '유저 정보 없음'}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.Date')}</th>
            <td>{data.createAt}</td>
          </tr>
          <tr>
            <th style={{textAlign: 'center'}}>{t('articledetail.Content')}</th>
            <td dangerouslySetInnerHTML={{ __html : data.content }}></td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
    
    <Row className="mt-5">
      <Col className="d-flex justify-content-end justify-content-center" xs={12}>
        
        <Link to={ `/article/update/${data.id}` }>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t('articledetail.Modification')}</Button>
        </Link>

        &nbsp;&nbsp;

          {/* TODO 원래 페이지로 redirect 시키기 */}
        <Link to={{ pathname:'/' }}>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t('articledetail.List')}</Button>
        </Link>

        &nbsp;&nbsp;

      <Button
        style={{ backgroundColor: "#6A24FE", border: "none" }} variant="primary" onClick={() => handleDelete()}>
        {t('articledetail.Delete')}
      </Button>
      <Button
        style={{ backgroundColor: "#6A24FE", border: "none" }} variant="primary" onClick={handleLike}>
          {liked ? "싫어요" : "좋아요"}
           {/* {liked ? "싫어요" : "좋아요"} 이미 좋아요를 누른 경우 버튼 텍스트 변경 */}
        {/* {t('articledetail.Like')} */}
      </Button>
      <div>
        <p>추천: {data.likeCount}</p>
      </div>

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