import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

interface PropsType {
  setShowSignInModal: (s: boolean) => void;
  setShowSignUpModal: (s: boolean) => void;
}

const SignInModal = ({ setShowSignInModal, setShowSignUpModal }: PropsType) => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    type: "",
  });

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/auth/login", formInput);
      dispatch(setUser(res.data));
      setShowSignInModal(false);
    } catch (error) {
      setError((error as any).response?.data);
    } finally {
      setLoading(false);
    }
  };

  const showSignIn = () => {
    setShowSignInModal(false);
    setShowSignUpModal(true);
  };

  return (
    <div className="modal bg-black bg-opacity-75 d-block">
      <div className="modal-dialog ">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <span className="modal-email text-light fs-5">Sign in</span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowSignInModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id="addNoteform">
              <div className="mb-3">
                <label
                  htmlFor="validationCustom02 "
                  className="form-label text-light"
                >
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={formInput.email}
                  name="email"
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
                {error.type === "email" && (
                  <span className="text-danger mt-1">{error.message}</span>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="validationTextarea"
                  className="form-label text-light"
                >
                  Password
                </label>
                <input
                  className="form-control"
                  placeholder="password"
                  value={formInput.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  required
                />
                {error.type === "password" && (
                  <span className="text-danger mt-1">{error.message}</span>
                )}
              </div>
            </form>
          </div>

          <span className="text-center text-light pb-3">
            If you don't have an account{" "}
            <span onClick={() => showSignIn()} className="text-primary pointer">
              Sing up
            </span>
          </span>

          <div className="modal-footer">
            <button
              disabled={loading}
              type="submit"
              form="addNoteform"
              className="btn btn-primary w-100"
            >
              {loading ? (
                <div className="spinner-border text-light"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
