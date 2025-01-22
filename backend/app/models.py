from pydantic import BaseModel, constr
from datetime import datetime


class NoteInput(BaseModel):
    user_id: str  # Unique user ID
    observations: constr(min_length=1, max_length=1000)  # 1-1000 characters
    session_type: constr(min_length=1)  # Ensure non-empty
    duration: int


class Note(BaseModel):
    id: str  # Unique note ID
    user_id: str
    observations: str
    session_type: str
    duration: int
    content: str
    date_added: datetime
    status: str  # "in-progress" or "completed"
