// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BoardForm from "./pages/BoardForm";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import './App.css';

function AppLayout() {
  const location = useLocation();
  // Hide Navbar on landing, login, and signup pages
  const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/create-board" element={<BoardForm />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/board/:boardId" element={<BoardForm />} />

      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
