import React from "react";
import { Search, Bell, HelpCircle, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#22272b] text-white px-4 py-3 flex items-center justify-between shadow sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="hover:bg-[#2c2f33] p-2 rounded">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M4 4h5v5H4V4zm0 11h5v5H4v-5zm11-11h5v5h-5V4zm0 11h5v5h-5v-5z" />
          </svg>
        </button>
        <div className="flex items-center gap-1">
          <img
            src="/assets/images/trello.png"
            alt="Trello"
            className="w-6 h-6"
          />
          <span className="text-white font-semibold">Trello</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 px-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full max-w-md px-3 py-1 rounded bg-[#2c2f33] text-sm text-white placeholder-gray-400 outline-none"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <button
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm font-medium"
          onClick={() => navigate("/create-board")}
        >
          Create
        </button>
        <Volume2 className="w-5 h-5 text-white cursor-pointer" />
        <Bell className="w-5 h-5 text-white cursor-pointer" />
        <HelpCircle className="w-5 h-5 text-white cursor-pointer" />
        <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
          S
        </div>
      </div>
    </nav>
  );
}
