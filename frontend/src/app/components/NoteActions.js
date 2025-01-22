import React from 'react';

const NoteActions = ({
  note,
  handlePublish,
  handleDelete,
  handleUpdate,
  setEditingNote,
  setUpdatedContent,
  updatedContent,
  editingNote
}) => {

  return (
    <div className="space-y-2">
      {/* Display the note details */}
      <p><strong>User ID:</strong> {note.user_id}</p>
      <p><strong>Content:</strong> {note.content}</p>
      <p><strong>Date Added:</strong> {new Date(note.date_added).toLocaleString()}</p>
      
      {/* Display action buttons based on editing state */}
      {editingNote === note.id ? (
        <>
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="w-full border rounded p-2 text-black mb-2"
            rows={4}
          />
          <button
            onClick={() => handleUpdate(note.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditingNote(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEditingNote(note.id);
              setUpdatedContent(note.content);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
          >
            Modify
          </button>
          <button
            onClick={() => handlePublish(note.id)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Publish
          </button>
          <button
            onClick={() => handleDelete(note.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default NoteActions;
