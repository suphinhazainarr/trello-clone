import React, { useState } from "react";
import { Search, Bell, HelpCircle, Volume2, X } from "lucide-react";
import { createBoard } from "../services/boardService"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

// A sample list of backgrounds for the user to choose from
const backgrounds = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "#0079bf", "#d29034", "#519839", "#b04632", "#89609e", "#cd5a91", "#4bbf6b", "#00aecc"
];

export default function Navbar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState(backgrounds[0]);
  const [visibility, setVisibility] = useState("workspace");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Board title is required");
      return;
    }
    setLoading(true);
    try {
      // Call the API to create the board
      const newBoard = await createBoard({ title, background, visibility });
      
      // Reset form state and close the drawer
      setShowDrawer(false);
      setTitle("");
      setBackground(backgrounds[0]);
      setVisibility("workspace");
      setError("");
      
      // Navigate to the newly created board's page
      navigate(`/board/${newBoard._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create board");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            onClick={() => setShowDrawer(true)}
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

      {/* Side Drawer for Creating a Board */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setShowDrawer(false)}
          />
          {/* Drawer */}
          <div className="w-full max-w-sm bg-[#23272f] h-full shadow-2xl p-6 flex flex-col relative animate-slide-in-right">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowDrawer(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Create board</h2>
            
            {/* Background Selector */}
            <div className="mb-4">
              <label className="block text-white mb-2 font-semibold">Background</label>
              <div className="grid grid-cols-4 gap-2">
                {backgrounds.map((bg, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`h-12 rounded border-2 ${background === bg ? "border-blue-500 ring-2 ring-blue-400" : "border-transparent"}`}
                    style={{ 
                      backgroundImage: bg.startsWith('http') ? `url(${bg})` : 'none',
                      backgroundColor: bg.startsWith('#') ? bg : 'transparent',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onClick={() => setBackground(bg)}
                  />
                ))}
              </div>
            </div>
            
            {/* Board Form */}
            <form className="flex flex-col gap-4" onSubmit={handleCreate}>
              <div>
                <label className="block text-white mb-1 font-semibold">Board title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Enter board title..."
                  className={`p-3 rounded bg-[#22272b] text-white border ${error ? "border-red-500" : "border-[#39424e]"} focus:outline-none w-full`}
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    if (e.target.value.trim()) setError("");
                  }}
                  required
                />
                {error && (
                  <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span role="img" aria-label="warning">🔥</span> {error}
                  </div>
                )}
              </div>
              
              {/* Visibility Selector */}
              <div>
                <label className="block text-white mb-1 font-semibold">Visibility</label>
                <select
                  className="p-2 rounded bg-[#22272b] text-white border border-[#39424e] w-full"
                  value={visibility}
                  onChange={e => setVisibility(e.target.value)}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                  <option value="workspace">Workspace</option>
                </select>
              </div>
              
              {/* Create Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded mt-4 disabled:opacity-60 w-full"
                disabled={!title.trim() || loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </form>

            <div className="text-xs text-gray-400 mt-auto text-center">
              By using images from Unsplash, you agree to their license and terms.
            </div>
          </div>
          
          {/* CSS for Slide-in Animation */}
          <style>{`
            .animate-slide-in-right {
              animation: slideInRight 0.25s cubic-bezier(.4,0,.2,1);
            }
            @keyframes slideInRight {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}