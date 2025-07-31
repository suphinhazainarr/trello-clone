import React, { useState } from "react";
import { Search, Bell, HelpCircle, Volume2, X } from "lucide-react";
import { createBoard } from "../services/boardService"; // <-- Make sure this import is correct

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

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Board title is required");
      return;
    }
    setLoading(true);
    try {
      await createBoard({ title, background, visibility });
      // Optionally: refetch boards, show success, or navigate to the new board
      setShowDrawer(false);
      setTitle("");
      setBackground(backgrounds[0]);
      setVisibility("workspace");
      setError("");
    } catch (err) {
      setError("Failed to create board");
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

      {/* Side Drawer */}
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
            {/* Background preview */}
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                {backgrounds.slice(0, 2).map((bg, i) =>
                  typeof bg === "string" && bg.startsWith("http") ? (
                    <img
                      key={i}
                      src={bg}
                      alt=""
                      className={`w-20 h-12 rounded object-cover cursor-pointer border-2 ${background === bg ? "border-blue-500" : "border-transparent"}`}
                      onClick={() => setBackground(bg)}
                    />
                  ) : null
                )}
              </div>
              <div className="flex gap-2">
                {backgrounds.slice(2).map((bg, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${background === bg ? "border-blue-500" : "border-transparent"}`}
                    style={{ background: bg }}
                    onClick={() => setBackground(bg)}
                  />
                ))}
              </div>
            </div>
            {/* Board title */}
            <form className="flex flex-col gap-4" onSubmit={handleCreate}>
              <div>
                <input
                  type="text"
                  placeholder="Board title"
                  className={`p-3 rounded bg-[#22272b] text-white border ${error ? "border-red-500" : "border-[#39424e]"} focus:outline-none w-full`}
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                  required
                />
                {error && (
                  <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span role="img" aria-label="warning">🔥</span> {error}
                  </div>
                )}
              </div>
              {/* Visibility */}
              <div>
                <label className="block text-white mb-2">Visibility</label>
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
              {/* Info */}
              <div className="text-xs text-[#b6c2cf] mt-2">
                This Workspace has 6 boards remaining. Free Workspaces can only have 10 open boards. For unlimited boards, upgrade your Workspace.
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded mt-4 disabled:opacity-60 w-full"
                disabled={!title || loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </form>
            <button className="mt-4 w-full bg-[#2c2f33] text-white py-2 rounded hover:bg-[#39424e]">
              Start with a template
            </button>
            <div className="text-xs text-[#b6c2cf] mt-4">
              By using images from Unsplash, you agree to their <a href="https://unsplash.com/license" className="underline">license</a> and <a href="https://unsplash.com/terms" className="underline">Terms of Service</a>.
            </div>
          </div>
          {/* Animation */}
          <style>{`
            .animate-slide-in-right {
              animation: slideInRight 0.25s cubic-bezier(.4,0,.2,1);
            }
            @keyframes slideInRight {
              0% { transform: translateX(100%); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}