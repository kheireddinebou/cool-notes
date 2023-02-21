import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { UserState } from "./redux/userSlice";
import Welcome from "./pages/Welcome";

function App() {
  const user = useSelector((state: UserState) => state.user);
  return (
    <div className="App bg-black">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Welcome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
