import React from "react";
import { LayoutGrid, Users, Settings } from "lucide-react";

const BoardCard = ({ title, isTemplate, color, img }) => (
  <div
    className={`relative rounded-lg bg-[#22272b] border border-[#39424e] w-56 h-28 flex flex-col justify-end overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150`}
  >
    {img && (
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
    )}
    <div
      className={`relative z-10 p-3 flex flex-col gap-1 ${
        color ? `bg-${color}` : ""
      }`}
    >
      <span className="font-semibold text-white">{title}</span>
      {isTemplate && (
        <span className="absolute top-2 right-2 text-xs bg-[#22272b] text-white px-2 py-1 rounded font-bold tracking-wide">
          TEMPLATE
        </span>
      )}
    </div>
  </div>
);

const WorkspaceBoardCard = ({ title, img, color }) => (
  <div
    className="relative rounded-lg bg-[#22272b] border border-[#39424e] w-56 h-28 flex flex-col justify-end overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150"
  >
    {img && (
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
    )}
    <div className="relative z-10 p-3 flex flex-col gap-1">
      <span className="font-semibold text-white">{title}</span>
    </div>
  </div>
);

export default function Boards() {
  return (
    <div className="p-8 text-white bg-[#22272b] min-h-screen w-full">
      {/* Most popular templates */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-1">Most popular templates</h2>
        <p className="text-[#b6c2cf] mb-4 text-sm">
          Get going faster with a template from the Trello community or team.
        </p>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <BoardCard
            title="Basic Board"
            isTemplate
            color="blue-600"
            img="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <BoardCard
            title="Kanban Template"
            isTemplate
            color="cyan-400"
            img="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <BoardCard
            title="Daily Task Management"
            isTemplate
            color="gray-700"
            img="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <BoardCard
            title="Remote Team Hub"
            isTemplate
            color="yellow-600"
            img="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
        </div>
        <a
          href="#"
          className="text-sm text-blue-400 hover:underline mt-2 inline-block"
        >
          Browse the full template gallery
        </a>
      </div>

      {/* Recently viewed */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <span className="inline-block">
            <svg
              className="w-5 h-5 inline-block mr-1"
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
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <BoardCard
            title="hi"
            img="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <BoardCard
            title="hi"
            img="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <BoardCard
            title="Basic Board"
            isTemplate
            color="blue-600"
            img="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <BoardCard
            title="dropshipping"
            color="pink-500"
            img="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
        </div>
      </div>

      {/* Your Workspaces */}
      <div>
        <h2 className="text-xs uppercase text-[#a5adba] font-bold mb-2 tracking-wider">
          Your Workspaces
        </h2>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-green-600 rounded flex items-center justify-center text-xs font-bold">
            S
          </div>
          <span className="font-semibold text-white">
            suphinhassainar2004's workspace
          </span>
          <div className="flex gap-2 ml-4">
            <button className="flex items-center gap-1 bg-[#22272b] border border-[#39424e] text-white text-sm px-3 py-1 rounded hover:bg-[#2c3e50]">
              <LayoutGrid className="w-4 h-4" />
              Boards
            </button>
            <button className="flex items-center gap-1 bg-[#22272b] border border-[#39424e] text-white text-sm px-3 py-1 rounded hover:bg-[#2c3e50]">
              <Users className="w-4 h-4" />
              Members
            </button>
            <button className="flex items-center gap-1 bg-[#22272b] border border-[#39424e] text-white text-sm px-3 py-1 rounded hover:bg-[#2c3e50]">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-1 bg-[#39424e] text-white text-sm px-3 py-1 rounded">
              Upgrade
            </button>
          </div>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <WorkspaceBoardCard
            title="dropshipping"
            img="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <WorkspaceBoardCard
            title="hi"
            img="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <WorkspaceBoardCard
            title="hi"
            img="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400&h=200&fit=crop"
          />
          <div className="relative rounded-lg bg-[#22272b] border border-[#39424e] w-56 h-28 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer">
            <span className="text-[#b6c2cf] font-semibold mb-1">
              Create new board
            </span>
            <span className="text-xs text-[#b6c2cf]">7 remaining</span>
          </div>
        </div>
        <button className="mt-6 bg-[#22272b] border border-[#39424e] text-white px-4 py-2 rounded hover:bg-[#2c3e50]">
          View all closed boards
        </button>
      </div>
    </div>
  );
}
