import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

function App() {
  return (
    <>
      <div className="flex flex-col items-center text-center text-white m-4 p-4 text-3xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
