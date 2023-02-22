import { useSelector } from "react-redux";
import { Note as NoteModel } from "../models/note";
import { UserState } from "../redux/userSlice";
import { publicRequest } from "../requestMethodes";
import Note from "./Note";

interface NotesProps {
  notes: NoteModel[];
  setNotes: (notes: NoteModel[]) => void;
  setEditedNote: (n: NoteModel | null) => void;
}

const Notes = ({ notes, setNotes, setEditedNote }: NotesProps) => {
  const user = useSelector((state: UserState) => state.user);

  const deleteNote = async (note: NoteModel) => {
    try {
      publicRequest.delete(`/notes/${user._id}?noteId=${note._id}`);
      setNotes(notes.filter(n => n._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row g-3 w-100">
      {notes?.map(note => (
        <div className="col-md-4">
          <div onClick={() => setEditedNote(note)}>
            <Note deleteNote={deleteNote} note={note} key={note._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notes;
