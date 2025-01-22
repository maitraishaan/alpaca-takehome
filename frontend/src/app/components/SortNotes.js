"use client";
import React from "react";

const SortNotes = ({ setSortOrder }) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => setSortOrder("asc")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sort by Date (Asc)
      </button>
      <button
        onClick={() => setSortOrder("desc")}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Sort by Date (Desc)
      </button>
    </div>
  );
};

export default SortNotes;
