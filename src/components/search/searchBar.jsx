import React from "react";
import styled from "styled-components";
import RelatedSearches from "./RelatedSearches";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onChange }) => {
  const { t, i18n } = useTranslation();
  

  return (
    <SearchForm className="searchForm">
      <SearchInput
        type="text"
        className="searchInput"
        placeholder={t('searchBar.검색어를 입력해주세요. ex) 응애, BongGuSu BabBurger~, 塔拉克电力钟原, モヤメルンダ')}
        name="searchInput"
        onChange={onChange}
        onKeyDown={(e) => keyEventControll(e)}
      />
    </SearchForm>
  );
};

/**
 * EnterKey시 페이지 이동 막으려고 처리한것..
 * @param {*} e
 */
const keyEventControll = (e) => {
  switch (e.code) {
    case "Enter":
      // TODO: Input창에서 Enter클릭시 처리할 이벤트 구현 -> article list 띄우기
      const inputValue = e.target.value;
      console.log("inputValue : ", inputValue);
      const state = { offset : 0, limit : 10 };
      history.pushState(state, null, `/search/result/${inputValue}`)
      window.location.href = `/search/result/${inputValue}`;
      e.preventDefault();
      break;
    default:
  }
};

const SearchForm = styled.form`
  display: flex;
  position: relative;
  border-radius: 5px;
  border: 5px solid #6a24fe;
  background: white;
  width: 100%;
  &:hover {
    box-shadow: 0 0 7px rgba(11, 195, 11, 0.74);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 80%;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1.1rem;
  padding: 5px;
`;

export default SearchBar;
