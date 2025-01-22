"use client";
import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Prev
      </button>
      <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
