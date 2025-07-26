// components/BoardWorkspace.jsx
import { ChevronDown, SlidersHorizontal, Star, Users, Share2, MoreHorizontal } from "lucide-react";

export default function BoardWorkspace() {
  return (
    <section className="flex-1 flex flex-col h-full rounded-2xl shadow-lg overflow-hidden relative">
      {/* Board header */}
      <div className="flex items-center justify-between px-8 pt-6 pb-2 z-10 relative">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-white">test</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          <Star className="w-5 h-5 text-gray-400" />
          <Users className="w-5 h-5 text-gray-400" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      {/* Board background */}
      <div
        className="flex-1 bg-cover bg-center relative p-8"
        style={{
          backgroundImage: "linear-gradient(rgba(24,28,32,0.4),rgba(24,28,32,0.4)),url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        {/* Add a list */}
        <div className="bg-white/60 rounded-xl px-6 py-4 w-64 mb-4 cursor-pointer hover:bg-white/80 transition shadow-lg">
          <span className="text-lg text-gray-700 font-medium">+ Add a list</span>
        </div>
      </div>
    </section>
  );
}