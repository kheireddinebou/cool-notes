import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Note as NoteModel } from "../models/note";
import { UserState } from "../redux/userSlice";

interface PropsType {
  setShowModal: (s: boolean) => void;
  setNotes: (n: NoteModel[]) => void;
  notes: NoteModel[];
  editedNote?: NoteModel;
  setEditedNote?: (n: NoteModel | null) => void;
}

const AddEditNoteModal = ({
  editedNote,
  setEditedNote,
  setShowModal,
  setNotes,
  notes,
}: PropsType) => {
  const [formInput, setFormInput] = useState({
    title: editedNote?.title || "",
    text: editedNote?.text || "",
  });
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: UserState) => state.user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleClose = () => {
    if (editedNote) {
      setEditedNote && setEditedNote(null);
    } else {
      setShowModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editedNote) {
        const res = await axios.put(
          `/notes/${user._id}?noteId=${editedNote._id}`,
          formInput
        );
        setNotes(notes.map(n => (n._id === editedNote._id ? res.data : n)));
      } else {
        const res = await axios.post(`/notes/${user._id}`, formInput);
        setNotes([res.data, ...notes]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowModal(false);
      setEditedNote && setEditedNote(null);
    }
  };

  return (
    <div className="modal bg-black bg-opacity-75 d-block">
      <div className="modal-dialog ">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <span className="modal-title text-light fs-5">
              {editedNote ? "Edit" : "Add"} Note
            </span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id="addNoteform">
              <div className="mb-3">
                <label
                  htmlFor="validationCustom02 "
                  className="form-label text-light"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom02"
                  value={formInput.title}
                  name="title"
                  onChange={handleChange}
                  required
                  placeholder="Note Title"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="validationTextarea"
                  className="form-label text-light"
                >
                  Text
                </label>
                <textarea
                  className="form-control"
                  id="validationTextarea"
                  placeholder="Note Description"
                  value={formInput.text}
                  name="text"
                  onChange={handleChange}
                  rows={5}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button
              disabled={loading}
              type="submit"
              form="addNoteform"
              className="btn btn-primary"
            >
              {!loading ? (
                "Save"
              ) : (
                <div className="spinner-border text-light"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditNoteModal;
