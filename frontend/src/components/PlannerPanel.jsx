// components/PlannerPanel.jsx
export default function PlannerPanel() {
  return (
 <section className="bg-[#0d1117] rounded-2xl shadow-lg p-6 w-full md:w-[400px] md:min-w-[320px] md:max-w-[480px] flex flex-col gap-4">      <h2 className="text-2xl font-bold text-white mb-1">Planner</h2>
      <p className="text-sm text-gray-300 mb-1">
        Drag, drop, get it done. Schedule your to-dos on your calendar and make time for what truly matters.
      </p>
      <a href="#" className="text-blue-400 underline text-sm mb-2">Try Premium</a>
      <div className="bg-[#181c20] rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-[#23272f] px-2 py-1 rounded text-white">Wed 23</span>
          <span className="text-xs text-gray-400">Only you can see your Planner.</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-2 transition">
          Connect a calendar
        </button>
        {/* Calendar events */}
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-green-700/60 rounded w-2/3"></div>
          <div className="h-4 bg-green-700/60 rounded w-1/2"></div>
          <div className="h-4 bg-purple-700/60 rounded w-3/4 relative">
            <div className="absolute left-1/2 -top-4 -translate-x-1/2 cursor-grab shadow-lg bg-[#23272f] rounded-lg px-4 py-2 flex items-center gap-2 border border-gray-700">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span className="text-xs text-white">Draggable card</span>
            </div>
          </div>
          <div className="h-4 bg-orange-700/60 rounded w-1/3"></div>
        </div>
      </div>
    </section>
  );
}