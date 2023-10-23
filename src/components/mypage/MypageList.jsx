import React, { useState, useEffect } from "react";
import { myPageList as myPageListAxios } from "../../api/MypageApi";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const TableBodyContent = (searchType, rowDatas) => {
  if (searchType == "article") {
    return ArticleRow(rowDatas);
  }
  if (searchType == "reply") {
    return ReplyRow(rowDatas);
  }
  return LikeRow(rowDatas);
};

const ArticleRow = (rowDatas) =>
  rowDatas.map((rowData, index) => (
    <tr key={`ArticleRow_${rowData.boardId}_${index}`}>
      <td>{rowData.boardId}</td>
      <td>{rowData.title}</td>
      <td>{rowData.createAt}</td>
      <td>{rowData.likeCount}</td>
    </tr>
  ));

const ReplyRow = (rowDatas) =>
  rowDatas.map((rowData, index) => (
    <tr key={`ReplyRow_${rowData.articleId}_${index}`}>
      <td>{rowData.articleId}</td>
      <td>{rowData.title}</td>
      <td>{rowData.content}</td>
      <td>{rowData.createAt}</td>
    </tr>
  ));

const LikeRow = (rowDatas) =>
  rowDatas.map((rowData, index) => (
    <tr key={`LikeRow_${rowData.boardId}_${index}`}>
      <td>{rowData.boardId}</td>
      <td>{rowData.title}</td>
      <td>{rowData.createdUser?.nickName}</td>
      <td>{rowData.createAt}</td>
    </tr>
  ));

const MypageList = ({ language, token }) => {
  const { t, i18n } = useTranslation();
  const [searchType, setSearchType] = useState("article");

  const [items, setItems] = useState([]);

  const myCreatedListRender = async () => {
    try {
      const response = await myPageListAxios(i18n.language, token, searchType);
      if (response.status == 200) {
        setItems(response.data);
        return;
      }
      throw new Error("Not Success Error");
    } catch (error) {
      console.log("fucking");
    }
  };
  useEffect(() => {
    myCreatedListRender();
  }, [searchType]);

  useEffect(() => {
    myCreatedListRender();
    // 리스너 등록
    i18n.on("languageChanged", myCreatedListRender);
    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", myCreatedListRender);
    };
  }, [i18n]);

  const changeSearchType = (searchTypeValue) => {
    setSearchType(searchTypeValue);
  };

  return (
    <>
      <div>
        <button onClick={() => changeSearchType("article")}>
          {t("mypagebutton.article")}
        </button>
        <button onClick={() => changeSearchType("reply")}>
          {t("mypagebutton.reply")}
        </button>
        <button onClick={() => changeSearchType("like")}>
          {t("mypagebutton.like")}
        </button>
      </div>

      <TableContainer className="mypagelist-container">
        <Table className="post-table">
          <ColGroup>
            <col span="1" style={{ width: "15%" }} />
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "5%" }} />
          </ColGroup>
          <TableHead>
            <tr>
              {searchType === "article" && (
                <>
                  <th>{t("mypagelist.board")}</th>
                  <th>{t("mypagelist.title")}</th>
                  <th>{t("mypagelist.createAt")}</th>
                  <th>{t("mypagelist.likecount")}</th>
                </>
              )}
              {searchType === "reply" && (
                <>
                  <th>{t("mypagelist.board")}</th>
                  <th>{t("mypagelist.title")}</th>
                  <th>{t("mypagelist.reply")}</th>
                  <th>{t("mypagelist.likecount")}</th>
                </>
              )}
              {searchType === "like" && (
                <>
                  <th>{t("mypagelist.board")}</th>
                  <th>{t("mypagelist.title")}</th>
                  <th>{t("mypagelist.author")}</th>
                  <th>{t("mypagelist.createAt")}</th>
                </>
              )}
            </tr>
          </TableHead>
          <TableBody>{TableBodyContent(searchType, items)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MypageList;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Table = styled.table`
  // background-color: transparent;
  width: 80%;
  margin-top: 10px;
  border: 2px solid #c9e5df;
`;

const ColGroup = styled.colgroup`
  border: 1px solid white;
  background-color: #ffffff;
  padding: 8px;
`;

const TableHead = styled.thead`
  tr {
    th {
      border: 1px solid #c9e5df;
      text-align: center;
      background-color: #ffffff;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    td {
      white-space: nowrap;
      border: 1px solid #c9e5df;
      padding: 8px;
      text-align: center;
      font-size: 14px;
      border-spacing: 0;
    }
  }
`;
