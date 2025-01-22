"use client";
import React from "react";

const Alert = ({ message, type }) => {
  const alertStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`${alertStyles[type]} text-white p-4 rounded`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
