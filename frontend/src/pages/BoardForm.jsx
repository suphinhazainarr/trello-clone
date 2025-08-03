import React, { useState } from "react";
import Split from "react-split"; // Import the resizable component
import InboxSection from "../components/InboxSection";
import PlannerPanel from "../components/PlannerPanel";
import BoardWorkspace from "../components/BoardWorkspace";
import BottomDock from "../components/BottomDock";
// Assuming Navbar is part of a different layout or not needed here. If needed, add it back.

export default function BoardForm() {
  // State to control the visibility of each panel
  const [showInbox, setShowInbox] = useState(true);
  const [showPlanner, setShowPlanner] = useState(true);
  const [showBoard, setShowBoard] = useState(true);

  // Create a dynamic list of visible panels to render
  const visiblePanels = [];
  if (showInbox) visiblePanels.push(<InboxSection />);
  if (showPlanner) visiblePanels.push(<PlannerPanel />);
  if (showBoard) visiblePanels.push(<BoardWorkspace />);
  
  // Calculate initial sizes based on visible panels
  const getInitialSizes = () => {
    const count = visiblePanels.length;
    if (count === 3) return [20, 30, 50]; // Inbox, Planner, Board
    if (count === 2) return [40, 60];
    if (count === 1) return [100];
    return [];
  };

  return (
    <div className="min-h-screen bg-[#181c20] flex flex-col font-sans relative overflow-hidden">
      {/* Main content area */}
      <div className="flex flex-1 p-6 pb-20 overflow-hidden">
        {visiblePanels.length > 0 ? (
          <Split
            className="flex flex-1" // Important: Split needs to be a flex container
            sizes={getInitialSizes()}
            minSize={250} // Minimum width in pixels for each panel
            gutterSize={10}
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
          >
            {visiblePanels.map((panel, index) => (
              <div key={index} className="overflow-auto h-full">
                {panel}
              </div>
            ))}
          </Split>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Show a panel to get started
          </div>
        )}
      </div>

      {/* Bottom Dock to control visibility */}
      <BottomDock
        showInbox={showInbox} setShowInbox={setShowInbox}
        showPlanner={showPlanner} setShowPlanner={setShowPlanner}
        showBoard={showBoard} setShowBoard={setShowBoard}
      />
    </div>
  );
}