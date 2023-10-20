import React, { useState, useEffect } from "react";
import { myPageList as myPageListAxios } from "../../api/MypageApi";
import styled from "styled-components";

const TableBodyContent = (searchType, rowDatas) => {
  console.log("TableBodyContent : >>> ", searchType, rowDatas);
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

const MypageList = ({ token, language }) => {
  // const { searchType } = useParams(); // URL에서 searchType을 가져옴

  const [searchType, setSearchType] = useState("article");

  const [items, setItems] = useState([]);

  const myCreatedListRender = async () => {
    try {
      const response = await myPageListAxios(language, token, searchType);
      if (response.status == 200) {
        console.log("response : ", response);
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

  const changeSearchType = (searchTypeValue) => {
    setSearchType(searchTypeValue);
  };

  return (
    <>
      <div>
        <button onClick={() => changeSearchType("article")}>게시글</button>
        <button onClick={() => changeSearchType("reply")}>댓글</button>
        <button onClick={() => changeSearchType("like")}>좋아요</button>
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
                  <th>게시판</th>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>추천수</th>
                </>
              )}
              {searchType === "reply" && (
                <>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>댓글</th>
                  <th>작성일</th>
                </>
              )}
              {searchType === "like" && (
                <>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
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
