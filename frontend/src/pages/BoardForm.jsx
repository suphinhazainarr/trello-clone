// pages/BoardPage.jsx
import InboxSection from "../components/InboxSection";
import PlannerPanel from "../components/PlannerPanel";
import BoardWorkspace from "../components/BoardWorkspace";
import BottomDock from "../components/BottomDock";
import Navbar from "../components/Navbar";

export default function BoardForm() {
  return (
    <div className="min-h-screen bg-[#181c20] flex flex-col font-sans relative">
      {/* Main content */}
      <div className="flex flex-1 gap-4 p-6 pb-20">
        <InboxSection />
        <PlannerPanel />
        <BoardWorkspace />
      </div>
      <BottomDock />
    </div>
  );
}