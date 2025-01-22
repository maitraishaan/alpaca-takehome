// src/components/NotesFetcher.js
"use client";

import React, { useEffect } from 'react';

const NotesFetcher = ({ setInProgressNotes, setCompletedNotes, setError }) => {
  const fetchNotes = async () => {
    try {
      const [inProgressResponse, completedResponse] = await Promise.all([
        fetch("http://localhost:8000/in-progress-notes"),
        fetch("http://localhost:8000/completed-notes"),
      ]);

      if (!inProgressResponse.ok || !completedResponse.ok) {
        throw new Error("Failed to fetch notes");
      }

      const inProgressData = await inProgressResponse.json();
      const completedData = await completedResponse.json();

      setInProgressNotes(inProgressData);
      setCompletedNotes(completedData);
    } catch (error) {
      setError("Error fetching notes: " + error.message);
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return null; // No need to render anything for this component
};

export default NotesFetcher;
