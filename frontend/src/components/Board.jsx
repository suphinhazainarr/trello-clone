import { LayoutGrid, Users, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";

const BoardCard = ({ title, isTemplate, color, img }) => (
  <div
    className={`relative rounded-xl bg-[#22272b] border border-[#39424e] w-72 h-40 flex flex-col justify-end overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-150`}
  >
    {img && (
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
    )}
    <div
      className={`relative z-10 p-5 flex flex-col gap-2 ${
        color ? `bg-${color}` : ""
      }`}
    >
      <span className="font-semibold text-lg text-white">{title}</span>
      {isTemplate && (
        <span className="absolute top-3 right-3 text-sm bg-[#22272b] text-white px-3 py-1 rounded font-bold tracking-wide">
          TEMPLATE
        </span>
      )}
    </div>
  </div>
);

const WorkspaceBoardCard = ({ title, img, color }) => (
  <div
    className="relative rounded-xl bg-[#22272b] border border-[#39424e] w-72 h-40 flex flex-col justify-end overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-150"
  >
    {img && (
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
    )}
    <div className="relative z-10 p-5 flex flex-col gap-2">
      <span className="font-semibold text-lg text-white">{title}</span>
    </div>
  </div>
);

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  // For demo: recently viewed = first 4 boards, workspace = all boards
  useEffect(() => {
    const getBoards = async () => {
      try {
        setLoading(true);
        const data = await fetchBoards();
        setBoards(data);
      } catch (err) {
        // handle error (e.g., show message)
        setBoards([]);
      } finally {
        setLoading(false);
      }
    };
    getBoards();
  }, []);

  return (
    <div className="p-12 text-white bg-[#22272b] min-h-screen w-full">
      {/* Recently viewed */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="inline-block">
            <svg
              className="w-6 h-6 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Recently viewed
        </h2>
        <div className="flex space-x-8 overflow-x-auto pb-4">
          {loading ? (
            <span className="text-[#b6c2cf]">Loading...</span>
          ) : boards.length === 0 ? (
            <span className="text-[#b6c2cf]">No boards found.</span>
          ) : (
            boards.slice(0, 4).map((board) => (
              <BoardCard
                key={board._id}
                title={board.title}
                img="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&w=400&h=200&fit=crop"
              />
            ))
          )}
        </div>
      </div>

      {/* Your Workspaces */}
      <div>
        <h2 className="text-sm uppercase text-[#a5adba] font-bold mb-4 tracking-wider">
          Your Workspaces
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-base font-bold">
            S
          </div>
          <span className="font-semibold text-xl text-white">
            {/* You can fetch and display the user's name here if you want */}
            Your Workspace
          </span>
          <div className="flex gap-3 ml-6">
            <button className="flex items-center gap-2 bg-[#22272b] border border-[#39424e] text-white text-base px-4 py-2 rounded hover:bg-[#2c3e50]">
              <LayoutGrid className="w-5 h-5" />
              Boards
            </button>
            <button className="flex items-center gap-2 bg-[#22272b] border border-[#39424e] text-white text-base px-4 py-2 rounded hover:bg-[#2c3e50]">
              <Users className="w-5 h-5" />
              Members
            </button>
            <button className="flex items-center gap-2 bg-[#22272b] border border-[#39424e] text-white text-base px-4 py-2 rounded hover:bg-[#2c3e50]">
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button className="flex items-center gap-2 bg-[#39424e] text-white text-base px-4 py-2 rounded">
              Upgrade
            </button>
          </div>
        </div>
        <div className="flex space-x-8 overflow-x-auto pb-4">
          {loading ? (
            <span className="text-[#b6c2cf]">Loading...</span>
          ) : boards.length === 0 ? (
            <span className="text-[#b6c2cf]">No boards found.</span>
          ) : (
            boards.map((board) => (
              <WorkspaceBoardCard
                key={board._id}
                title={board.title}
                img="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&w=400&h=200&fit=crop"
              />
            ))
          )}
          <div className="relative rounded-xl bg-[#22272b] border border-[#39424e] w-72 h-40 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow duration-150 cursor-pointer">
            <span className="text-[#b6c2cf] font-semibold mb-2">
              Create new board
            </span>
            <span className="text-sm text-[#b6c2cf]">7 remaining</span>
          </div>
        </div>
        <button className="mt-10 bg-[#22272b] border border-[#39424e] text-white px-6 py-3 rounded hover:bg-[#2c3e50] text-lg">
          View all closed boards
        </button>
      </div>
    </div>
  );
}