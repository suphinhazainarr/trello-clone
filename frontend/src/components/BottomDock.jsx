// components/BottomDock.jsx
import { Inbox, Calendar, Layout, Shuffle, Rocket } from "lucide-react";

export default function BottomDock() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#23272f] text-white shadow-md hover:scale-105 transition">
        <Inbox className="w-5 h-5" /> Inbox
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#23272f] text-white shadow-md hover:scale-105 transition">
        <Calendar className="w-5 h-5" /> Planner
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white shadow-md hover:scale-105 transition">
        <Layout className="w-5 h-5" /> Board
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#23272f] text-white shadow-md hover:scale-105 transition">
        <Shuffle className="w-5 h-5" /> Switch boards
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white shadow-md hover:scale-105 transition ml-4">
        <Rocket className="w-5 h-5" /> Jira
      </button>
    </div>
  );
}