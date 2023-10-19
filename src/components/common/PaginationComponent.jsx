import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    console.log("페이지네이션에서 handlePageChange 실행");
    setActivePage(page);
    // onPageChange((page - 1) * itemsPerPage, itemsPerPage);
    onPageChange((page - 1), itemsPerPage);
  };

  return (
    <Pagination>
      <Pagination.First disabled={activePage === 1} onClick={() => handlePageChange(1)} />
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => handlePageChange(activePage - 1)}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === activePage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={activePage === totalPages}
        onClick={() => handlePageChange(activePage + 1)}
      />
      <Pagination.Last
        disabled={activePage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      />
    </Pagination>
  );
};

export default PaginationComponent;
