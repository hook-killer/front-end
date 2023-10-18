import React from "react";
import styled from "styled-components";

export const AuthInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 6px;
  border: var(--bs-border-width) solid var(--bs-border-color);
  background-color: #f8f8f8;
  ::placeholer {
    color: #d2d2d2;
  }
  &:focus,
  &:active,
  &:hover {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: #86b7fe;
    background-color: #fff;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;