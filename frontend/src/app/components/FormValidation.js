"use client";
import React from "react";

const FormValidation = ({ errors }) => {
  return (
    <div>
      {errors && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormValidation;
