# ABA Session Note Generator

## Approach and Challenge

### How to run:
- Should be relatively simple to run and compile. Will note that there was an issue initially with the fastapi dev main.py so I used uvicorn main:app --reload. 
- Also used openai migrate.

### Approach:
- **Frontend Development:**
  - Built a React-based frontend using modular components (see src/app/components) to manage the user interface and interactions, including forms, note lists, and real-time updates.
  - Integrated TailwindCSS for styling to ensure a clean and responsive UI with good readability.

- **Backend Development:**
  - Used FastAPI to handle note generation, updates, deletions, and publishing operations.

- **State Management:**
  - Managed the application state using React hooks to track in-progress and completed notes.

- **Error Handling:**
  - Included robust error handling mechanisms for API failures, form validations, and user feedback through alerts and status messages.

---

## Design Decisions

1. **Frontend-Backend Communication:**
   - Chose RESTful APIs for simplicity and scalability. Each endpoint was clearly defined for operations like note generation, deletion, updates, and publishing.

2. **Component-Based Architecture:**
   - Designed reusable components (`NoteForm`, `NotesList`, `NoteActions`, etc.) to ensure modularity and code reusability.

3. **Styling with TailwindCSS:**
   - Opted for TailwindCSS to accelerate development and maintain a consistent design language.

4. **State Management with React Hooks:**
   - Hooks like `useState` were used for state updates to manage notes dynamically without introducing complex state management libraries.

---

## Assumptions

1. **Single User Use Case:**
   - The application assumes that the session notes are handled by one user at a time.

2. **Note Content Structure:**
   - The format of the notes (e.g., `id`, `user_id`, `content`, `date_added`) remains consistent as defined in the API contract.

3. **No Concurrent Editing:**
   - Assumes no simultaneous edits or conflicts in note updates.

---

## Sources

- **Frameworks and Libraries:**
  - [React](https://reactjs.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [FastAPI](https://fastapi.tiangolo.com/)

