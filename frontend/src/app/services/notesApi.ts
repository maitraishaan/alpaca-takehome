export const fetchNotes = async () => {
    const [inProgressResponse, completedResponse] = await Promise.all([
      fetch("/in-progress-notes"),
      fetch("/completed-notes"),
    ]);
    const inProgressData = await inProgressResponse.json();
    const completedData = await completedResponse.json();
    return { inProgressData, completedData };
  };
  
  export const generateNote = async (data: any) => {
    const response = await fetch("/generate-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  