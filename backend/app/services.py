from openai import OpenAI
from app.models import NoteInput, Note
from datetime import datetime
import uuid

client = OpenAI(api_key="")

def generate_note_content(input_data: NoteInput, section=None) -> str:
    try:
        # If section is specified, regenerate that part only
        if section == "observations":
            content = f"Observations: {input_data.observations}\n"
        elif section == "session_summary":
            content = f"Session Summary: Client engaged well during the session for {input_data.duration} minutes, addressing relevant topics and exploring coping strategies."
        else:
            # Full note generation
            content = f"Generate professional notes for the following session:\nObservations: {input_data.observations}\nSession Type: {input_data.session_type}\nDuration: {input_data.duration} minutes."

        # Request to OpenAI to generate the content
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant generating professional therapy notes."},
                {"role": "user", "content": content}
            ],
            max_tokens=500
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise ValueError(f"Error generating note: {str(e)}")

def create_note(input_data: NoteInput, content: str) -> Note:
    return Note(
        id=str(uuid.uuid4()),
        user_id=input_data.user_id,
        observations=input_data.observations,
        session_type=input_data.session_type,
        duration=input_data.duration,
        content=content,
        date_added=datetime.utcnow(),
        status="in-progress"
    )
