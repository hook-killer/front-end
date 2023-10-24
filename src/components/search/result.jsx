import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { searchResult, searchAllResult } from "../../api/SearchApi"
import styled from 'styled-components';
import { Link } from "react-router-dom";
import PaginationComponent from "../common/PaginationComponent";
import NoResultPage from "./NoResult"
import "../common/pagination.css";
import { Col, Row } from "react-bootstrap";
import {
  TableContainer,
  ColGroup,
  Table,
  TableBody,
  TableHead,
  TableTH,
  TableTR,
  TableTextCenterTD,
  TableTextLeftTD,
} from "../styled/ArticleTableComponent";
import { useTranslation } from "react-i18next";

const SearchResultList = () => {
  const [data, setData] = useState([]);
  const [wholeData, setWholeData] = useState([]);
  const [wholeDataSize, setWholeDataSize] = useState(0);
  const [myOffset, setMyOffset] = useState(0);
  const [myLimit, setMyLimit] = useState(10);
  const { t, i18n } = useTranslation();

  const { word } = useParams();

  const maxLength = 15;

  const state = window.history.state;

  const languageChangeHandler = (() => {
    languageChangeHandler();

    // 리스너 등록
    i18n.on("languageChanged", languageChangeHandler);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", languageChangeHandler);
    };
  }, [i18n]);

  const handlePageChange = (newOffset, newLimit) => {
    setMyOffset(newOffset);
    setMyLimit(newLimit);

    // API 호출
    fetchDataFromApi(newOffset, newLimit);
  };

  const fetchDataFromApi = (offset, limit) => {
    // API 호출을 수행하고 데이터를 업데이트합니다.
    // 결과 데이터는 setData를 사용하여 업데이트합니다.
    console.log("fetch에서의 Offset : ", offset, " limit : ", limit);

    searchResult(i18n.language, word, offset, limit)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setData(res.data);
          setMyOffset(offset);
          setMyLimit(limit);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Server Error : ', error.response.data)
        } else if (error.request) {
          console.log('No response from server : ', error.request);
        } else {
          console.log('Request Error : ', error.message);
        }
      })
  };

  useEffect(() => {
    searchAllResult(i18n.language, word)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setWholeData(res.data);
          setWholeDataSize(wholeData.length);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Server Error : ', error.response.data)
        } else if (error.request) {
          console.log('No response from server : ', error.request);
        } else {
          console.log('Request Error : ', error.message);
        }
      })
  }, [data])

  useEffect(() => {
    searchResult(i18n.language, word, myOffset, state.limit)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setData(res.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Server Error : ', error.response.data)
        } else if (error.request) {
          console.log('No response from server : ', error.request);
        } else {
          console.log('Request Error : ', error.message);
        }
      })
  }, [data]);

  console.log("Data : ", data)

  if (data.length > 0) {
    return (
      <>
        <Row className="d-flex justify-content-center">
          <Col xs={12}>
            <TableContainer>
              <Table>
                <ColGroup>
                  <col span="1" style={{ width: "10%", minWidth: "45px" }} />
                  <col span="1" style={{ width: "85%" }} />
                  <col span="1" style={{ width: "5%", minWidth: "45px" }} />
                </ColGroup>
                <TableHead>
                  <TableTR>
                    <TableTH>{t("articlelist.Author")}</TableTH>
                    <TableTH>{t("articlelist.Title")}</TableTH>
                    <TableTH>{t("articlelist.Recommend")}</TableTH>
                  </TableTR>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableTR key={index} style={{ backgroundColor: '#FFFFFF' }}>
                      <TableTextCenterTD>{item.createdUserNickName}</TableTextCenterTD>
                      {item.title.length > maxLength ? (
                        <TableTextLeftTD>
                          {item.title.slice(0, maxLength) + '...'}
                        </TableTextLeftTD>
                      ) : (
                        <TableTextLeftTD>
                          <Link to={`/article/${item.articleId}`} style={{ textDecoration: "none", color: "black" }}>
                            {item.title}
                          </Link>
                        </TableTextLeftTD>
                      )}
                      <TableTextCenterTD>{item.likeCount}</TableTextCenterTD>
                    </TableTR>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
        </Row>
        <Row className="mt-1 mb-1 d-flex justify-content-center">
          <Col xs={12} className="d-flex justify-content-center">
            <PaginationComponent
              className="pagination"
              totalItems={wholeDataSize} // 전체 아이템 수 (API에서 받아온 값으로 대체)
              itemsPerPage={state.limit} // 페이지당 아이템 수
              onPageChange={handlePageChange} // 페이지 변경 시 호출될 함수
            />
          </Col>
        </Row></>
    )
  } else {
    return <NoResultPage />
  }
  
}

export default SearchResultList;
