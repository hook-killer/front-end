import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const NoResultPage = () => {
  const {t, i18n} = useTranslation();

  const languageChangeHandler =
    (() => {
      languageChangeHandler();
      // 리스너 등록
      i18n.on("languageChanged", languageChangeHandler);
      // 컴포넌트가 언마운트될 때 리스너 제거
      return () => {
        i18n.off("languageChanged", languageChangeHandler);
      };
    },
    [i18n]);

  return (
    <Card className="text-center mt-5" style={{ "minHeight" : "720px" }}>
      <Card.Header>{t("searchBar.Message")}</Card.Header>
      <Card.Body style={{ "display" : "flex", "flexDirection" : "column", "justifyContent" : "center", "alignItems" : "center" }}>
        <Card.Title>{t("searchBar.NoResult")}</Card.Title>
        <Card.Text>
          {t("searchBar.advice")}
        </Card.Text>
        <Link to="/">
          <Button variant="secondary" style={{"width" : "100%"}}>{t("searchBar.GoToMain")}</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Oriental Unity</Card.Footer>
    </Card>
  );
}

export default NoResultPage;