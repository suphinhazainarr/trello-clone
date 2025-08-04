import React, { useState, useRef } from "react"; // <-- Import useRef
import Split from "react-split";
import InboxSection from "../components/InboxSection";
import PlannerPanel from "../components/PlannerPanel";
import BoardWorkspace from "../components/BoardWorkspace";
import BottomDock from "../components/BottomDock";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";

// Define a minimum width in pixels for each panel.
const MIN_PANEL_WIDTH_PX = 250;

export default function BoardForm() {
  const [showInbox, setShowInbox] = useState(true);
  const [showPlanner, setShowPlanner] = useState(true);
  const [showBoard, setShowBoard] = useState(true);
  const layout = useResponsiveLayout();
  const containerRef = useRef(null); // Ref to get the container's width

  // This function is called every time the user drags a gutter
  const handleDrag = (sizes) => {
    if (!containerRef.current) return;

    // Get the total width of the container
    const containerWidth = containerRef.current.clientWidth;
    
    // Calculate the minimum size as a percentage of the container width
    const minSizePercent = (MIN_PANEL_WIDTH_PX / containerWidth) * 100;

    // Create a map of currently visible panels to check against their new sizes
    const visiblePanelSetters = [];
    if (showInbox) visiblePanelSetters.push(setShowInbox);
    if (showPlanner) visiblePanelSetters.push(setShowPlanner);
    if (showBoard) visiblePanelSetters.push(setShowBoard);

    // Check if any panel has been resized to be smaller than the minimum
    sizes.forEach((size, index) => {
      if (size < minSizePercent) {
        // If it is, call its setter to hide it
        visiblePanelSetters[index](false);
      }
    });
  };

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
        minSize={MIN_PANEL_WIDTH_PX} // This still prevents dragging smaller than the min
        gutterSize={10}
        onDrag={handleDrag} // <-- This is the key change!
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
    // This logic remains the same
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
      {/* Attach the ref to this container */}
      <div ref={containerRef} className="flex flex-1 p-4 md:p-6 pb-20 overflow-hidden">
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