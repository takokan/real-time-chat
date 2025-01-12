import Navbar from "./components/Navbar"
import {Route, Routes, Navigate} from "react-router"
import Home from "./pages/Home"
import Sign from "./pages/Sign"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Setting from "./pages/Setting"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

function App() {
  const {authUser, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <>
      <Navbar />
      <div>
        <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Sign /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
