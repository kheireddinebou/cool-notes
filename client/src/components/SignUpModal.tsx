import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

interface PropsType {
  setShowSignInModal: (s: boolean) => void;
  setShowSignUpModal: (s: boolean) => void;
}

const SignUpModal = ({ setShowSignInModal, setShowSignUpModal }: PropsType) => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
      const res = await axios.post("/auth/register", formInput);
      dispatch(setUser(res.data));
      setShowSignUpModal(false);
    } catch (error) {
      setError((error as any).response?.data);
    } finally {
      setLoading(false);
    }
  };

  const showSignIn = () => {
    setShowSignInModal(true);
    setShowSignUpModal(false);
  };

  return (
    <div className="modal bg-black bg-opacity-75 d-block">
      <div className="modal-dialog ">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <span className="modal-email text-light fs-5">Sign up</span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowSignUpModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} id="addNoteform">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="flex-grow-1">
                  <label
                    htmlFor="validationCustom02 "
                    className="form-label text-light"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={formInput.firstName}
                    name="firstName"
                    onChange={handleChange}
                    required
                    placeholder="First Name"
                  />
                </div>

                <div className="flex-grow-1">
                  <label
                    htmlFor="validationCustom02 "
                    className="form-label text-light"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={formInput.lastName}
                    name="lastName"
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                  />
                </div>
              </div>

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
            If you have an account{" "}
            <span onClick={() => showSignIn()} className="text-primary pointer">
              Sing in
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
                "Sign up"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
