import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { searchResult, searchAllResult } from "../../api/SearchApi"
import styled from 'styled-components';
import { Link } from "react-router-dom";
import PaginationComponent from "../common/PaginationComponent";

const SearchResultList = () => {
  const [data, setData] = useState([]);
  const [wholeData, setWholeData] = useState([]);
  const [wholeDataSize, setWholeDataSize] = useState(0);
  const [myOffset, setMyOffset] = useState(0);
  const [myLimit, setMyLimit] = useState(10);

  const {word} = useParams();

  const maxLength = 15;

  const state = window.history.state;

  const handlePageChange = (newOffset, newLimit) => {
    console.log("newOffset : ", newOffset, " newLimit : ", newLimit);
    setMyOffset(newOffset);
    setMyLimit(newLimit);

    // API 호출
    fetchDataFromApi(newOffset, newLimit);
  };

  const fetchDataFromApi = (offset, limit) => {
    // API 호출을 수행하고 데이터를 업데이트합니다.
    // 결과 데이터는 setData를 사용하여 업데이트합니다.
    console.log("fetch에서의 Offset : ", offset, " limit : ", limit);

    searchResult(word, offset, limit)
    .then((res) => {
      if (res.data && res.data.length > 0) {
        console.log("Data : ", data)
        setData(res.data);
        setMyOffset(offset);
        console.log("myOffset : ", myOffset);
        setMyLimit(limit);
        console.log("myLimit : ", myLimit);
        console.log("searchResult Data: ", data);
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
    searchAllResult(word)
    .then((res) => {
      if (res.data && res.data.length > 0) {
        setWholeData(res.data);
        console.log("data: ", res.data)
        setWholeDataSize(wholeData.length);
        console.log("whole Data : ", wholeDataSize)
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
    searchResult(word, myOffset, state.limit)
    .then((res) => {
      if (res.data && res.data.length > 0) {
        setData(res.data);
        for (let i = 0; i < data.length; i++) {
          console.log(i, "번째 data : ", data[i]);
        }
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

  return (
    <SearchResultInfoContainer>
      <ul className="list-unstyled">
        {data.map((item, index) => (
          <SearchResultInfo key={index} style={{backgroundColor: 'lightblue'}}>
            <SearchResultInnerBox>{item.createdUserNickName}</SearchResultInnerBox>
            {item.title.length > maxLength ? (
              <SearchResultInnerBox>
                {item.title.slice(0, maxLength) + '...'}
              </SearchResultInnerBox>
              ) : ( 
              <SearchResultInnerBox>{item.title}</SearchResultInnerBox>
            )}
            {item.content.length > maxLength ? (
              <SearchResultInnerBox dangerouslySetInnerHTML={{ __html : item.content }} />
              ) : (
                <SearchResultInnerBox dangerouslySetInnerHTML={{ __html : item.content}} />
            )}
            <SearchResultInnerBox>{item.likeCount}</SearchResultInnerBox>
            <SearchResultInnerBox>
            <Link to={`/article/${item.articleId}`} style={{ textDecoration: "none" }}>
              <button className="list-group-item list-group-item-action px-4">
                <small>게시글 바로가기</small>
              </button>
            </Link>
            </SearchResultInnerBox>
          </SearchResultInfo>
        ))}
      </ul>

      <PaginationComponent
      totalItems={wholeDataSize} // 전체 아이템 수 (API에서 받아온 값으로 대체)
      itemsPerPage={state.limit} // 페이지당 아이템 수
      onPageChange={handlePageChange} // 페이지 변경 시 호출될 함수
      />
    </SearchResultInfoContainer>
  )
}

export default SearchResultList;

const SearchResultInfoContainer = styled.div`
  position: relative;
  width: 98%;
`;

const SearchResultInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SearchResultInnerBox = styled.div`
  width: 20%;
  text-align: center;
`;