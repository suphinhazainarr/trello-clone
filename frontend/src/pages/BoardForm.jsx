import React, { useState } from "react";
import Split from "react-split";
import InboxSection from "../components/InboxSection";
import PlannerPanel from "../components/PlannerPanel";
import BoardWorkspace from "../components/BoardWorkspace";
import BottomDock from "../components/BottomDock";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout"; // Import the custom hook

export default function BoardForm() {
  const [showInbox, setShowInbox] = useState(true);
  const [showPlanner, setShowPlanner] = useState(true);
  const [showBoard, setShowBoard] = useState(true);
  const layout = useResponsiveLayout(); // Returns 'mobile' or 'desktop'

  // --- RENDER LOGIC FOR DESKTOP (Resizable Panels) ---
  const renderDesktopLayout = () => {
    const visiblePanels = [];
    if (showInbox) visiblePanels.push(<InboxSection />);
    if (showPlanner) visiblePanels.push(<PlannerPanel />);
    if (showBoard) visiblePanels.push(<BoardWorkspace />);

    const getInitialSizes = () => {
      const count = visiblePanels.length;
      if (count === 3) return [20, 30, 50];
      if (count === 2) return [40, 60];
      if (count === 1) return [100];
      return [];
    };

    if (visiblePanels.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Show a panel using the dock below to get started.
        </div>
      );
    }

    return (
      <Split
        className="flex flex-1"
        sizes={getInitialSizes()}
        minSize={250}
        gutterSize={10}
        snapOffset={30}
        direction="horizontal"
        cursor="col-resize"
      >
        {visiblePanels.map((panel, index) => (
          <div key={index} className="overflow-auto h-full">
            {panel}
          </div>
        ))}
      </Split>
    );
  };

  // --- RENDER LOGIC FOR MOBILE (Stacked Panels) ---
  const renderMobileLayout = () => {
    return (
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {showInbox && <InboxSection />}
        {showPlanner && <PlannerPanel />}
        {showBoard && <BoardWorkspace />}
        {!showInbox && !showPlanner && !showBoard && (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Show a panel to get started.
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#181c20] flex flex-col font-sans relative overflow-hidden">
      <div className="flex flex-1 p-4 md:p-6 pb-20 overflow-hidden">
        {/* Conditionally render the correct layout based on screen size */}
        {layout === 'desktop' ? renderDesktopLayout() : renderMobileLayout()}
      </div>

      <BottomDock
        showInbox={showInbox} setShowInbox={setShowInbox}
        showPlanner={showPlanner} setShowPlanner={setShowPlanner}
        showBoard={showBoard} setShowBoard={setShowBoard}
      />
    </div>
  );
}