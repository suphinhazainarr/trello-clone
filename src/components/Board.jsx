import React from "react";

const BoardCard = ({ title, isTemplate, color }) => (
  <div className={`rounded bg-${color} p-4 text-white w-40 h-24 flex flex-col justify-between shadow`}>
    <div className="font-semibold">{title}</div>
    {isTemplate && <span className="text-xs bg-black bg-opacity-50 px-2 py-1 rounded self-start">TEMPLATE</span>}
  </div>
);

export default function Boards() {
  return (
    <div className="p-6 text-white bg-[#1d2125] min-h-screen">
      {/* Most popular templates */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Most popular templates</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <BoardCard title="Basic Board" isTemplate color="blue-600" />
          <BoardCard title="Kanban Template" isTemplate color="pink-400" />
          <BoardCard title="Daily Task Management" isTemplate color="gray-700" />
          <BoardCard title="Remote Team Hub" isTemplate color="yellow-600" />
        </div>
        <a href="#" className="text-sm text-blue-400 hover:underline mt-2 inline-block">
          Browse the full template gallery
        </a>
      </div>

      {/* Recently viewed */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Recently viewed</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <BoardCard title="hi" color="gray-700" />
          <BoardCard title="Basic Board" isTemplate color="blue-600" />
          <BoardCard title="dropshipping" color="pink-500" />
        </div>
      </div>

      {/* Your Workspaces */}
      <div>
        <h2 className="text-lg font-bold mb-2">Your Workspaces</h2>
        <div className="mb-2 text-sm font-medium">suphinhassainar2004’s workspace</div>
        <div className="flex space-x-4">
          <BoardCard title="hi" color="gray-700" />
          <BoardCard title="dropshipping" color="pink-500" />
        </div>
      </div>
    </div>
  );
}
