import React, { useState, useEffect } from "react";
import { myPageList as myPageListAxios } from "../../api/MypageApi";
import styled from "styled-components";

const MypageList = () => {
  // const { searchType } = useParams(); // URL에서 searchType을 가져옴

  const [searchType, setSearchType] = useState("ARTICLE");

  const [items, setItems] = useState([]);

  useEffect(() => {
    myPageListAxios(searchType)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setItems(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server Error:", error.response.data);
        } else if (error.request) {
          console.log("No response from server:", error.request);
        } else {
          console.log("Request Error:", error.message);
        }
      });
  }, [searchType]);

  return (
    <>
      <div>
        <button onClick={() => setSearchType("ARTICLE")}>게시글</button>
        <button onClick={() => setSearchType("REPLY")}>댓글</button>
        <button onClick={() => setSearchType("LIKE")}>좋아요</button>
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
              {searchType === "ARTICLE" && (
                <>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>추천수</th>
                </>
              )}
              {searchType === "REPLY" && (
                <>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>댓글</th>
                  <th>작성일</th>
                </>
              )}
              {searchType === "LIKE" && (
                <>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </>
              )}
            </tr>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <tr key={index}>
                {searchType === "ARTICLE" && (
                  <>
                    <td>{item.boardId}</td>
                    <td>{item.title}</td>
                    <td>{item.createAt}</td>
                    <td>{item.likeCount}</td>
                  </>
                )}
                {searchType === "REPLY" && (
                  <>
                    <td>{item.boardId}</td>
                    <td>{item.title}</td>
                    <td>{item.replyContent}</td>
                    <td>{item.createAt}</td>
                  </>
                )}
                {searchType === "LIKE" && (
                  <>
                    <td>{item.boardId}</td>
                    <td>{item.title}</td>
                    <td>{item.createUser}</td>
                    <td>{item.createAt}</td>
                  </>
                )}
              </tr>
            ))}
          </TableBody>
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
