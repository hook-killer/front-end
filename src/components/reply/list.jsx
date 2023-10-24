import React, { useState, useEffect } from "react";
import { listReply, deleteReply } from "../../api/ReplyApi";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

const ReplyList = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const { articleId } = useParams();
  const [show, setShow] = useState();
  const token = props.token;
  const hookVal = props.hookVal;

  const languageChangeHandler = () => {
    // 언어 변경 이벤트가 발생하면 새로운 언어로 업데이트
    listReply(articleId, i18n.language)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setData(response.data);
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
  };

  const handleButtonClick = (replyId) => {
    const token = props.token;
    const confirmed = window.confirm(i18n.t("reply.deleteConfirm"));
    if (confirmed) {
      deleteReply(replyId, i18n.language, token)
      .then((res) => {
        console.log(res)
        alert(i18n.t("reply.successConfirm"))
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      console.log("사용자가 취소를 누름");
    }
  };

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () => {});

    return (
      <button
        type="button"
        style={{ backgroundColor: "pink" }}
        onClick={decoratedOnClick}
      >
        {t('reply.wholeComment')}
      </button>
    );
  };

  useEffect(() => {
    languageChangeHandler();

    // 리스너 등록
    i18n.on("languageChanged", languageChangeHandler);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      i18n.off("languageChanged", languageChangeHandler);
    };
  }, [i18n, hookVal]);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{t("reply.viewComment")}</Accordion.Header>
        <Accordion.Body>
          <ListGroup as="ol">
            {data.map((item, index) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                style={{ width: "100%" }}
                key={index}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {t("reply.writer")} : {item.createUser.nickName}
                  </div>
                  {item.content.length > 10
                    ? item.content.slice(0, 9)
                    : item.content}
                  <Accordion defaultActiveKey="1">
                    <CustomToggle eventKey="0"></CustomToggle>
                    <Accordion.Collapse eventKey="0">
                      <div>{item.content}</div>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
                <Button
                  onClick={() => handleButtonClick(item.replyId)}
                  variant="warning"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {t("reply.delete")}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ReplyList;
