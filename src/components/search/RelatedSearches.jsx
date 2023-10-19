import React, { useEffect, useState } from 'react';
import { searchListDown } from "../../api/SearchApi";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const RelatedSearches = ({ searchTerm }) => {
  // relatedSearches에 api 통신을 통한 데이터들이 들어올 예정
  const [data, setData] = useState([]);

  const maxLength = 15;

  if (searchTerm.length > 0) {
    searchListDown(searchTerm, 0, 7)
    .then((res) => {
      if (res.data && res.data.length > 0) {
        setData(res.data);
        console.log(data);
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
      </SearchResultInfoContainer>
    );  
  }
}

export default RelatedSearches;

const SearchResultInfoContainer = styled.div`
  position: absolute;
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