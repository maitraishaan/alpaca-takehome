"use client";
import React from "react";
import NoteActions from "./NoteActions"; // Import the NoteActions component

const NotesList = ({
  inProgressNotes,
  completedNotes,
  handlePublish,
  handleDelete,
  handleUpdate,
  handleRegenerateSection, // New prop for regenerating sections
  editingNote,
  setEditingNote,
  setUpdatedContent,
  updatedContent
}) => {
  return (
    <div>
      <div className="mt-6">
        <h2 className="text-xl font-bold">In-Progress Notes</h2>
        <ul className="space-y-4">
          {inProgressNotes.map((note) => (
            <li key={note.id} className="border p-4 rounded">
              <NoteActions
                note={note}
                handlePublish={handlePublish}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                setEditingNote={setEditingNote}
                setUpdatedContent={setUpdatedContent}
                updatedContent={updatedContent}
                editingNote={editingNote}
              />
              
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Completed Notes</h2>
        <ul className="space-y-4">
          {completedNotes.map((note) => (
            <li key={note.id} className="border p-4 rounded">
              <p><strong>User ID:</strong> {note.user_id}</p>
              <p><strong>Content:</strong> {note.content}</p>
              <p><strong>Date Added:</strong> {new Date(note.date_added).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotesList;
