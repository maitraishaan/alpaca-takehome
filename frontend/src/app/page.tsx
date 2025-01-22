"use client";
import { useState } from "react";
import NotesFetcher from "./components/NotesFetcher";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Alert from "./components/Alert";
import LoadingSpinner from "./components/LoadingSpinner";

// Define the type for the expected note structure
interface Note {
  id: string;
  user_id: string;
  content: string;
  date_added: string;
}

export default function NoteManagement() {
  const [observations, setObservations] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [duration, setDuration] = useState("");
  const [userId, setUserId] = useState("");
  const [inProgressNotes, setInProgressNotes] = useState<Note[]>([]);
  const [completedNotes, setCompletedNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle note creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!observations.trim() || !sessionType || !duration || !userId) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/generate-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observations,
          session_type: sessionType,
          duration: parseInt(duration),
          user_id: userId,
        }),
      });

      const data = await response.json();

      // Type assertion to ensure correct structure of the returned note data
      const note: Note = data.note;

      if (response.ok) {
        setInProgressNotes([
          ...inProgressNotes,
          {
            id: note.id,
            user_id: userId,
            content: note.content,
            date_added: new Date().toISOString(),
          },
        ]);
      } else {
        setError(data.detail || "An error occurred while generating the note.");
      }
    } catch (error) {
      setError("Error generating note. Please try again.");
      console.error("Error generating note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle regenerating specific sections of the note
const handleRegenerateSection = async (noteId: string, section: string) => {
  try {
    const response = await fetch("http://localhost:8000/generate-note-section", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        note_id: noteId,  // Pass the note ID
        section: section,  // Pass the section ("observations" or "session_type")
      }),
    });

    const data = await response.json();
    
    // Log the data to inspect the structure
    console.log("Data received from backend:", data);

    if (response.ok) {
      const updatedNote = data.note;
      setInProgressNotes(
        inProgressNotes.map((note) =>
          note.id === noteId ? { ...note, content: updatedNote.content } : note
        )
      );
      alert(`${section} regenerated successfully!`);
    } else {
      alert(`Failed to regenerate ${section}.`);
    }
  } catch (error) {
    console.error("Error regenerating section:", error);
    alert("Error regenerating section. Please try again.");
  }
};

  


  // Handle publishing note
  const handlePublish = async (noteId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/publish-note/${noteId}`, {
        method: "PUT",
      });

      if (response.ok) {
        const updatedNote = inProgressNotes.find((note) => note.id === noteId);
        if (updatedNote) {
          setInProgressNotes(inProgressNotes.filter((note) => note.id !== noteId));
          setCompletedNotes([...completedNotes, updatedNote]);
        }
        alert("Note published successfully!");
      } else {
        alert("Failed to publish note.");
      }
    } catch (error) {
      console.error("Error publishing note:", error);
      alert("Error publishing note. Please try again.");
    }
  };

  // Handle deleting note
  const handleDelete = async (noteId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/delete-note/${noteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInProgressNotes(inProgressNotes.filter((note) => note.id !== noteId));
        setCompletedNotes(completedNotes.filter((note) => note.id !== noteId));
        alert("Note deleted successfully!");
      } else {
        alert("Failed to delete note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note. Please try again.");
    }
  };

  // Handle updating note
  const handleUpdate = async (noteId: string) => {
    if (!updatedContent.trim()) {
      alert("Updated content cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/update-note/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updated_content: updatedContent }),
      });

      if (response.ok) {
        setInProgressNotes(
          inProgressNotes.map((note) =>
            note.id === noteId ? { ...note, content: updatedContent } : note
          )
        );
        setCompletedNotes(
          completedNotes.map((note) =>
            note.id === noteId ? { ...note, content: updatedContent } : note
          )
        );
        setEditingNote(null); // Exit edit mode
        setUpdatedContent(""); // Clear the updated content
        alert("Note updated successfully!");
      } else {
        alert("Failed to update note.");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Error updating note. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Note Management</h1>

      {/* Form to add notes */}
      <NoteForm
        observations={observations}
        sessionType={sessionType}
        duration={duration}
        userId={userId}
        setObservations={setObservations}
        setSessionType={setSessionType}
        setDuration={setDuration}
        setUserId={setUserId}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {/* Display error message */}
      {error && <Alert message={error} type="error" />}

      {/* Show loading spinner while fetching or submitting */}
      {loading && <LoadingSpinner />}

      {/* Fetch notes from server */}
      <NotesFetcher setInProgressNotes={setInProgressNotes} setCompletedNotes={setCompletedNotes} setError={setError} />

      {/* List notes with regenerate section button */}
      <NotesList
        inProgressNotes={inProgressNotes}
        completedNotes={completedNotes}
        handlePublish={handlePublish}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleRegenerateSection={handleRegenerateSection} // Pass regenerate function to NotesList
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        setUpdatedContent={setUpdatedContent}
        updatedContent={updatedContent}
      />
    </div>
  );
}
