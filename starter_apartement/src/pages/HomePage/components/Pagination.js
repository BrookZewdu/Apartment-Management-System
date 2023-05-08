import React from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((page) => page + 1);

  return (
    <nav className="pagination">
      <ul>
        {currentPage !== 1 && (
          <li>
            <button
              className="prev"
              onClick={() => onPageChange(currentPage - 1)}
            >
              &laquo; Prev
            </button>
          </li>
        )}
        {pages.map((page) => (
          <li key={page}>
            <button
              className={currentPage === page ? "active" : ""}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage !== totalPages && (
          <li>
            <button
              className="next"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next &raquo;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
