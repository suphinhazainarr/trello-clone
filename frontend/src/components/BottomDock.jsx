import { Inbox, Calendar, Layout, Shuffle, Rocket } from "lucide-react";

export default function BottomDock({
  showInbox, setShowInbox,
  showPlanner, setShowPlanner,
  showBoard, setShowBoard
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
      {/* Inbox Toggle Button */}
      <button 
        onClick={() => setShowInbox(prev => !prev)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:scale-105 transition ${
          showInbox ? "bg-blue-600 text-white" : "bg-[#23272f] text-white"
        }`}
      >
        <Inbox className="w-5 h-5" /> Inbox
      </button>

      {/* Planner Toggle Button */}
      <button 
        onClick={() => setShowPlanner(prev => !prev)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:scale-105 transition ${
          showPlanner ? "bg-blue-600 text-white" : "bg-[#23272f] text-white"
        }`}
      >
        <Calendar className="w-5 h-5" /> Planner
      </button>

      {/* Board Toggle Button */}
      <button 
        onClick={() => setShowBoard(prev => !prev)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:scale-105 transition ${
          showBoard ? "bg-blue-600 text-white" : "bg-[#23272f] text-white"
        }`}
      >
        <Layout className="w-5 h-5" /> Board
      </button>

      {/* Non-toggleable buttons */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#23272f] text-white shadow-md hover:scale-105 transition">
        <Shuffle className="w-5 h-5" /> Switch boards
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white shadow-md hover:scale-105 transition ml-4">
        <Rocket className="w-5 h-5" /> Jira
      </button>
    </div>
  );
}