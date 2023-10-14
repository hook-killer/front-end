import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

const footer = () => {
  const memberList = () => {
    const data = [
      { git: "https://github.com/donsonioc2010", memberName: "김종원" },
      { git: "https://github.com/bongsh0112", memberName: "봉세환" },
      { git: "https://github.com/wooni89", memberName: "서재운" },
      { git: "https://github.com/lljh1992", memberName: "이정훈" },
      { git: "https://github.com/lgsok00", memberName: "이진석" },
      { git: "https://github.com/kwchoi11", memberName: "최근우" },
    ];
    const result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(
        <MemberLi key={"footerMemberLi" + i}>
          <FooterATag href={data[i].git}>{data[i].memberName}</FooterATag>
        </MemberLi>
      );
    }
    return result;
  };

  return (
    <Footer>
      <CustomRow>
        <ProjectTitle>Oriental Unity</ProjectTitle>
        <Row>
          <Col>
            <MemberListUl>{memberList()}</MemberListUl>
          </Col>
        </Row>
        <Row>
          <Col>
            <CopyRight>
              <MarginRight10Li>
                <FooterATag href="https://github.com/hook-killer/">
                  Proeject Link
                </FooterATag>
              </MarginRight10Li>
            </CopyRight>
          </Col>
        </Row>
      </CustomRow>
    </Footer>
  );
};
const Footer = styled.footer`
  bottom: 0;
`;

const CustomRow = styled.div`
  height: 140px;
  position: relative;
  padding-top: 12px;
  padding-bottom: 10px;
  background-color: #120410;
  width: 100%;
`;

const ProjectTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  padding-left: 10px;
  margin-bottom: 0;
  margin-left: 15px;
`;

const MemberListUl = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const MemberLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-right: 15px;
`;

const FooterATag = styled.a`
  font-size: 12px;
  align-items: center;
  text-decoration: none;
`;

const CopyRight = styled.ul`
  color: #ffffff;
  font-size: 10px;
`;

const MarginRight10Li = styled.li`
  display: flex;
  justify-content: space-between;
`;

export default footer;
