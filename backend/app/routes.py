from fastapi import APIRouter, HTTPException
from app.models import NoteInput
from app.database import notes
from app.services import generate_note_content, create_note

router = APIRouter()

@router.post("/generate-note")
def generate_note(input_data: NoteInput):
    try:
        content = generate_note_content(input_data)  # Generate full note content
        note = create_note(input_data, content)
        notes.append(note)
        return {"message": "Note generated successfully", "note": note}
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/in-progress-notes")
def get_in_progress_notes():
    return sorted([note for note in notes if note.status == "in-progress"], key=lambda x: x.date_added, reverse=True)

@router.get("/completed-notes")
def get_completed_notes():
    return sorted([note for note in notes if note.status == "completed"], key=lambda x: x.date_added, reverse=True)

@router.put("/update-note/{note_id}")
def update_note(note_id: str, updated_content: dict):
    for note in notes:
        if note.id == note_id and note.status == "in-progress":
            note.content = updated_content["updated_content"]
            return {"message": "Note updated successfully"}
    raise HTTPException(status_code=404, detail="Note not found")

@router.delete("/delete-note/{note_id}")
def delete_note(note_id: str):
    global notes
    notes = [note for note in notes if note.id != note_id]
    return {"message": "Note deleted successfully"}

@router.put("/publish-note/{note_id}")
def publish_note(note_id: str):
    for note in notes:
        if note.id == note_id:
            note.status = "completed"
            return {"message": "Note published successfully", "note": note}
    raise HTTPException(status_code=404, detail="Note not found")

@router.post("/generate-note-section")
def regenerate_note_section(note_id: str, section: str):
    try:
        # Find the note using the provided note_id
        note = next((note for note in notes if note.id == note_id), None)
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        
        # Prepare input_data based on the found note
        input_data = NoteInput(
            user_id=note.user_id,
            observations=note.observations,
            session_type=note.session_type,
            duration=note.duration,
        )

        # Adjust content generation based on the section requested
        if section == "observations":
            content = generate_note_content(input_data, section="observations")
        elif section == "session_type":
            content = generate_note_content(input_data, section="session_type")
        else:
            raise HTTPException(status_code=400, detail="Invalid section to regenerate")
        
        # Update the note with the regenerated content
        note.content = content
        return {"message": f"{section} regenerated successfully", "note": note}
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))


