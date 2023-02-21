import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser, UserState } from "../redux/userSlice";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const user = useSelector((state: UserState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <nav className="navbar bg-primary bg-opacity-50  border-bottom border-primary">
      <div className="container">
        <a className="navbar-brand text-light fs-3" href="/">
          Cool Notes
        </a>

        {user ? (
          <div className="d-flex gap-3 align-items-center">
            <span className="text-light text-capitalize">
              {user.firstName} {user.lastName}
            </span>
            <button onClick={() => handleLogout()} className="btn btn-primary">
              Logout
            </button>
          </div>
        ) : (
          <div className="d-flex gap-3">
            <button
              onClick={() => setShowSignInModal(true)}
              className="btn btn-primary"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignUpModal(true)}
              className="btn btn-primary"
            >
              Register
            </button>
          </div>
        )}
      </div>

      {showSignInModal && (
        <SignInModal
          setShowSignInModal={setShowSignInModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          setShowSignInModal={setShowSignInModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
