import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularArticle } from "../../api/ArticleApi";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const GetNumberIcon = (number) => {
  return number < 5 ? (
    <BeforeFiveIcon>{number + 1}</BeforeFiveIcon>
  ) : (
    <AfterFiveIcon>{number + 1}</AfterFiveIcon>
  );
};

const RenderRankingBox = (props, t) => {
  const board = props.board;
  const articles = props.articles;
  const articleLength = articles.length;

  const result = [];
  for (let i = 0; i < 10; i++) {
    if (i < articleLength) {
      const article = articles[i];
      result.push(
        <RankingLi key={`PopularRankingBox_${board.boardId}_${i + 1}`}>
          {GetNumberIcon(i)}
          <RankingLink
            to={`/article/${article.articleId}`}
            className="d-inline-block text-truncate"
          >
            {article.title}
          </RankingLink>
        </RankingLi>
      );
    } else {
      result.push(
        <RankingLi key={`PopularRankingBox_${board.boardId}_${i + 1}`}>
          {GetNumberIcon(i)}
        </RankingLi>
      );
    }
  }

  return (
    <RankingDivBox key={`popularRankingBox_${board.boardId}`}>
      <Row className="d-flex justify-content-end mb-0 align-items-end">
        <Col>
          <p className="h4 d-inline-block text-truncate">
            {t(`main.popular[${board.boardId}]`)}
          </p>
        </Col>
        <Col className="text-end">
          <Link
            to={`/article/list/${board.boardId}`}
            className="link-secondary"
          >
            more...
          </Link>
        </Col>
      </Row>
      <RankingUl className="ps-0">{result}</RankingUl>
    </RankingDivBox>
  );
};

const PopularBox = () => {
  const { t, i18n } = useTranslation();

  const [boards, setBoards] = useState([
    { boardId: 1, description: t("main.koPopular") },
    { boardId: 2, description: t("main.jpPopular") },
    { boardId: 3, description: t("main.cnPopular") },
  ]);
  const [articleData, setArticleData] = useState([]);

  const setArticleDataByServer = async () => {
    try {
      const requests = [];
      //순서 보장을위함
      for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        const response = await popularArticle(board.boardId, i18n.language);

        requests.push({
          board: board,
          articles: response.data,
        });
      }
      setArticleData(requests);
    } catch (error) {
      console.error("Axios Error");
    }
  };

  useEffect(() => {
    setArticleDataByServer();
  }, []);

  useEffect(() => {
    setArticleDataByServer();
    // 리스너 등록
    i18n.on("languageChanged", setArticleDataByServer);
    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", setArticleDataByServer);
    };
  }, [i18n]);

  return (
    <>
      {articleData.map((data, index) => {
        return RenderRankingBox(data, t);
      })}
    </>
  );
};

export default PopularBox;

const NumberIconDefault = styled.div`
  font-size: 16px;
  font-weight: bold;
  width: 20px;
  min-width: 20px;
  text-align: center;
  color: white; /* 텍스트 색상을 흰색(white)으로 설정 */
  padding: 1px;
  border-radius: 5px;
  margin-right: 10px;
`;
/* 1순위 ~ 5순위 */
const BeforeFiveIcon = styled(NumberIconDefault)`
  background-color: #ff5733;
`;

/* 6순위 ~ 10순위 */
const AfterFiveIcon = styled(NumberIconDefault)`
  background-color: gray;
`;

const RankingUl = styled.ul``;

const RankingLi = styled.li`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 15px;

  border-bottom: 1px solid #ccc;
  list-style: none;

  &:first-child {
    border-top: 2px solid black;
    margin-top: 4px;
  }

  /* 마지막 <li>에서는 아래 선을 제거. */
  &:last-child {
    border-bottom: none;
  }
`;

const RankingDivBox = styled.ul`
  border-radius: 5px;
  border: solid 1px;
  border-color: #d2d2d2;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 30px;
`;

const RankingLink = styled(Link)`
  color: inherit; /* 링크의 색상을 부모 요소로 상속 (일반 텍스트처럼 보이도록) */
  text-decoration: none; /* 밑줄 제거 */

  &:hover {
    color: red; /* hover 시 폰트 색상을 붉은색으로 변경 */
    text-decoration: underline; /* hover 시 언더라인 보이도록 설정 */
  }
`;
