import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { useMemo } from "react";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  deleteNote: (note: NoteModel) => void;
}

const Note = ({ note, deleteNote }: NoteProps) => {
  const timeText = useMemo(() => {
    if (note.updatedAt > note.createdAt) {
      return "Updated: " + formatDate(note.updatedAt);
    } else {
      return "Created: " + formatDate(note.createdAt);
    }
  }, [note]);

  return (
    <div className="card bg-dark bg-opacity-50 mb-3 noteCard">
      <div className="card-body cardBody">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title text-light">{note.title}</h5>
          <button
            onClick={e => {
              deleteNote(note);
              e.stopPropagation();
            }}
            className="btn fs-4 p-0 m-0 text-light"
          >
            <MdDelete />
          </button>
        </div>
        <p className="card-text text-light pt-1">{note?.text}</p>
      </div>
      <p className="card-footer text-light mb-0">{timeText}</p>
    </div>
  );
};

export default Note;
