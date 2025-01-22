"use client";
import React from "react";

const NoteForm = ({ 
  observations, 
  sessionType, 
  duration, 
  userId, 
  setObservations, 
  setSessionType, 
  setDuration, 
  setUserId, 
  handleSubmit, 
  loading 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="block font-medium">User ID:</label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border rounded p-2 text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="observations" className="block font-medium">Observations:</label>
        <textarea
          id="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full border rounded p-2 text-black"
          rows={4}
          required
        />
      </div>
      <div>
        <label htmlFor="sessionType" className="block font-medium">Session Type:</label>
        <select
          id="sessionType"
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          className="w-full border rounded p-2 text-black"
          required
        >
          <option value="" disabled>Select session type</option>
          <option value="individual">Individual Therapy</option>
          <option value="group">Group Therapy</option>
          <option value="assessment">Assessment</option>
        </select>
      </div>
      <div>
        <label htmlFor="duration" className="block font-medium">Duration (in minutes):</label>
        <input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border rounded p-2 text-black"
          required
        />
      </div>
      <div className="space-x-2">
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
