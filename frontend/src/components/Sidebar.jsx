import { LayoutGrid, Home, Users, Settings, Folder } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-120 bg-[#22272b] h-full p-4 flex flex-col pt-12 pl-39 pr-4 pb-4  text-[#b6c2cf]">
      {/* Top: Boards */}
      <div>
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded bg-[#2c3e50] text-white font-semibold mb-2">
          <LayoutGrid className="w-5 h-5" />
          Boards
        </button>
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-[#282e33]">
          <Folder className="w-5 h-5" />
          Templates
        </button>
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-[#282e33]">
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-[#39424e] my-4"></div>

      {/* Workspaces */}
      <div>
        <div className="text-xs uppercase text-[#a5adba] mb-2 px-3">Workspaces</div>
        <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#282e33] font-semibold text-white mb-1">
          <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-xs font-bold">S</div>
          suphinhassainar2004's workspace
        </div>
        <button className="flex items-center gap-2 w-full px-8 py-2 rounded hover:bg-[#282e33]">
          <LayoutGrid className="w-4 h-4" />
          Boards
        </button>
        <button className="flex items-center gap-2 w-full px-8 py-2 rounded hover:bg-[#282e33]">
          <Users className="w-4 h-4" />
          Members
        </button>
        <button className="flex items-center gap-2 w-full px-8 py-2 rounded hover:bg-[#282e33]">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-[#39424e] my-4"></div>

      {/* Premium Promo */}
      <div className="bg-[#282e33] rounded p-3 text-xs text-[#b6c2cf]">
        <div className="font-semibold mb-1">Try Trello Premium</div>
        <div className="mb-2">
          Get Planner (full access), Atlassian Intelligence, card mirroring, list colors, and more.
        </div>
        <a href="#" className="text-blue-400 hover:underline">Start free trial</a>
      </div>
    </aside>
  );
}
