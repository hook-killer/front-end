import React, { useState, useEffect} from "react";
import { noticeList as noticeListAxios } from "../../api/NoticeApi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NoticeList = ({props}) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);

  const customLinkStyle = {
    textDecoration: 'none',
    color: 'black'
  }

  useEffect(() => {
    const languageChangeHandler = () => {
    noticeListAxios(i18n.language)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log('Server Error: ', error.response.data);
        } else if (error.request) {
          console.log('No response from server: ', error.request);
        } else {
          console.log('Request Error: ', error.message);
        }
      });
  };
  
  languageChangeHandler();

    // 리스너 등록
    i18n.on("languageChanged", languageChangeHandler);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", languageChangeHandler);
    };
  }, [i18n]);

  console.log(data);

  return (
    <>
    <h4 style={{
      marginTop: "30px"}}
      >공지사항</h4>
    <TableContainer className="list-container">
      <Table className="notice-table">
        <ColGroup>
          <col span="1" style={{ width: "5%" }} />
          <col span="1" style={{ width: "35%"}} />
          <col span="1" style={{ width: "11%"}} />
        </ColGroup>
        <TableHead>
          <tr>
            <th>{t('noticelist.번호')}</th>
            <th>{t('noticelist.제목')}</th>
            <th>{t('noticelist.작성일')}</th>
          </tr>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
                <td><Link style={customLinkStyle} to={`/notice/${item.id}`}>{item.title}</Link></td>
              <td>{item.createAt}</td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Row className="mt-5">
      <Col className="d-flex justify-content-end justify-content-center" xs={12}>
        <Link to={{ pathname:'/notice/add' }}>
          <Button style={{backgroundColor:'#6A24FE', border:'none'}} variant="primary" className="w-100 text-center">{t('noticelist.새글')}</Button>
        </Link>
      </Col>
    </Row>
    </>
  );
};

export default NoticeList;

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
      height: 50px;
    }
  }
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
