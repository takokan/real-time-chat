import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';


function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={authUser ? <Setting /> : <Navigate to="/login" />}
          />
        </Routes>

        
      </div>
    </>
  );
}

export default App;
