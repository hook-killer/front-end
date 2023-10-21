import React, { useState, useEffect } from "react";
import { addReply } from "../../api/ReplyApi";
import { useParams } from "react-router";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ReplyAdd = (props) => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState('');
  const token = props.token;

  const {articleId} = useParams();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value; // 첫 번째 input의 값 (내용을 입력하는 부분)
    handleButtonSubmit(inputValue); // 버튼 클릭 핸들러 호출
  };
  
  const handleButtonSubmit = (value) => {
    const replyContent = value;
    // value로 입력된 내용을 받아서 처리
    const addReplyForm = {
      articleId: parseInt(articleId),
      orgReplyLanguage: i18n.language, // i18n 혹은 현재 설정된 언어를 받아와야함
      content: replyContent
    };
    addReply(addReplyForm, i18n.language, token)
    .then((response) => console.log("response : ", response))
    .catch((error) => {
      console.log("error : ", error);
      alert("댓글 등록 실패! 내용이 너무 길거나 권한이 없습니다!");
    });
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>댓글 작성하기</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                댓글 작성
              </Form.Label>
              <Col sm={10}>
                <Form.Control 
                as="textarea"
                rows={10}
                placeholder="내용을 입력하세요." 
                style={{ resize: 'none' }}
              />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onSubmit={() => handleButtonSubmit(this.value)}>작성하기</Button>
              </Col>
            </Form.Group>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ReplyAdd;