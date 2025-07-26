import { MoreHorizontal, Star, UserPlus, Share2, SlidersHorizontal } from "lucide-react";

export default function Board() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#181c20] rounded-2xl overflow-hidden shadow-lg">
      {/* Board header */}
      <div className="flex items-center justify-between px-8 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-white">test</span>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          <Star className="w-5 h-5 text-gray-400" />
          <UserPlus className="w-5 h-5 text-gray-400" />
          <Share2 className="w-5 h-5 text-gray-400" />
          <button className="bg-[#22272b] text-white px-3 py-1 rounded flex items-center gap-1">
            <span>Share</span>
          </button>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      {/* Board background */}
      <div
        className="flex-1 bg-cover bg-center relative p-8"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        {/* Add a list */}
        <div className="bg-white/60 rounded-xl px-6 py-4 w-64 mb-4 cursor-pointer hover:bg-white/80 transition">
          <span className="text-lg text-gray-700 font-medium">+ Add a list</span>
        </div>
      </div>
    </div>
  );
}