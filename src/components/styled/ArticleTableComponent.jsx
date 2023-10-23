import React from "react";
import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin-top: 10px;
`;

export const ColGroup = styled.colgroup``;

export const TableHead = styled.thead``;

export const TableTH = styled.th`
  padding: 8px;
  text-align: center;
  border-top: 3px solid #c9e5df;
  border-bottom: 3px solid #c9e5df;
  border-left: 0;
  border-right: 0;
`;

export const TableTR = styled.tr`
  border: 2px solid #c9e5df;
  border-left: 0;
  border-right: 0;
`;

export const TableTextLeftTD = styled.td`
  padding: 8px;
  text-align: left;
`;

export const TableTextCenterTD = styled.td`
  padding: 8px;
  text-align: Center;
`;

export const TableBody = styled.tbody``;
