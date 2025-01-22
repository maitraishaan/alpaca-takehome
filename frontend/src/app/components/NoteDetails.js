"use client";
import React from "react";

const NoteDetails = ({ note }) => {
  return (
    <div className="space-y-2">
      <p><strong>User ID:</strong> {note.user_id}</p>
      <p><strong>Content:</strong> {note.content}</p>
      <p><strong>Date Added:</strong> {new Date(note.date_added).toLocaleString()}</p>
    </div>
  );
};

export default NoteDetails;
