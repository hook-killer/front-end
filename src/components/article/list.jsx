import React, { useState, useEffect } from "react";
import { listArticle as articleAxios } from "../../api/ArticleApi";
import styled from "styled-components";
import { useParams } from "react-router";

const ListArticleForm = ({props}) => {
  const [data, setData] = useState([]);

  const {boardId} = useParams();

  useEffect(() => {
    articleAxios(boardId)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Server Error:', error.response.data);
        } else if (error.request) {
          console.log('No response from server:', error.request);
        } else {
          console.log('Request Error:', error.message);
        }
      });
  }, []); // 빈 배열을 전달하여 이펙트가 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

//   return (
//     <div>
//       {data.map((item, index) => (
//         <div key={index}>
//           <br />
//           번호: {item.articleId} <br />
//           제목: {item.title} <br />
//           내용: <div dangerouslySetInnerHTML={{ __html: item.content }} />
//         </div>
//       ))}
//     </div>
//   );
// };

// return (
//   <div className="list-container">
//     <table className="post-table">
//       <colgroup>
//         <col span="1" style={{ width: "20%" }} />
//         <col span="1" style={{ width: "35%" }} />
//         <col span="1" style={{ width: "20%" }} />
//         <col span="1" style={{ width: "20%" }} />
//         <col span="1" style={{ width: "15%" }} />
//       </colgroup>
//       <thead>
//         <tr>
//           <th>번호</th>
//           <th>제목</th>
//           <th>작성자</th>
//           <th>작성일</th>
//           <th>추천</th>
          
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             <td>{item.articleId}</td>
//             <td>{item.title}</td>
//             <td>{item.createdUser}</td>
//             {/* <td><div dangerouslySetInnerHTML={{ __html: item.content }} /></td> */}
//             <td>{item.createAt}</td>
//             <td>{item.likeCount}</td>
            

//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
// console.log(item);
// }

return (
  <TableContainer className="list-container">
    <Table className="post-table">
      <ColGroup>
        <col span="1" style={{ width: "5%" }} />
        <col span="1" style={{ width: "35%" }} />
        <col span="1" style={{ width: "20%" }} />
        <col span="1" style={{ width: "20%" }} />
        <col span="1" style={{ width: "5%" }} />
      </ColGroup>
      <TableHead>
        <tr>
          <th></th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>추천</th>
        </tr>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.articleId}</td>
            <td>{item.title}</td>
            <td>{item.createdUser}</td>
            <td>{item.createAt}</td>
            <td>{item.likeCount}</td>
          </tr>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
};


export default ListArticleForm;

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scrolling */
  overflow-x: hidden;
  word-break:break-all;
  white-space: pre-wrap;
  ::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }
  ::-custom-scrollbar-container {
    background-color: #f1f1f1; 
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Set the color of the scrollbar thumb */
    border-radius: 5px; /* Round the edges of the scrollbar thumb */
  }
`

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
  border: 2px solid #C9E5DF;
`;

const ColGroup = styled.colgroup`
  border: 1px solid white;
  background-color: #FFFFFF;
  padding: 8px;
`;

const TableHead = styled.thead`
  tr {
    th {
      border: 1px solid #C9E5DF;
      text-align: center;
      background-color: #FFFFFF;
    }
  }
`;

const TableBody = styled.tbody`
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