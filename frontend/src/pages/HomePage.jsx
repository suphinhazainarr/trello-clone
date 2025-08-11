// pages/HomePage.jsx
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Board from "../components/Board";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <Sidebar />
          <div className="flex-1 overflow-auto w-full h-full">
      <Routes>
        <Route index element={<Board />} />
        <Route path="board" element={<Board />} />
      </Routes>
    </div>
      </div>
    </div>
  );
};

export default HomePage;
