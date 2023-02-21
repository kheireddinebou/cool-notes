import axios from "axios";
import { useState, useEffect } from "react";
import AddEditNoteModal from "../components/AddEditNoteModal";
import Notes from "../components/Notes";
import { Note as NoteModel } from "../models/note";
import { FaPlus } from "react-icons/fa";
import { UserState } from "../redux/userSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [editedNote, setEditedNote] = useState<NoteModel | null>(null);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const user = useSelector((state: UserState) => state.user);

  useEffect(() => {
    const getNotes = async () => {
      try {
        setLoadingNotes(true);
        const res = await axios.get(`/notes/${user._id}`);
        setNotes(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingNotes(false);
      }
    };

    getNotes();
  }, [user._id]);

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="card bg-primary bg-opacity-10  border-bottom border-primary py-2 px-3 my-4 d-flex flex-row justify-content-between align-items-center align-self-stretch">
        <span className="card-text text-light text-capitalize fs-5">
          hello {user.firstName}!
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <FaPlus />
          Add Note
        </button>
      </div>

      {loadingNotes ? (
        <div
          className="spinner-border text-light mt-5"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
      ) : notes.length > 0 ? (
        <Notes
          setEditedNote={setEditedNote}
          setNotes={setNotes}
          notes={notes}
        />
      ) : (
        <p className="fs-2 mt-5 text-center text-light">
          You don't have any notes yet!
        </p>
      )}

      {showModal && (
        <AddEditNoteModal
          setShowModal={setShowModal}
          setNotes={setNotes}
          notes={notes}
        />
      )}

      {editedNote && (
        <AddEditNoteModal
          setShowModal={setShowModal}
          setNotes={setNotes}
          notes={notes}
          editedNote={editedNote}
          setEditedNote={setEditedNote}
        />
      )}
    </div>
  );
};

export default Home;
