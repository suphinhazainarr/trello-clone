// components/InboxSection.jsx
import { Mail, Users, Slack, Smartphone, Lock } from "lucide-react";

export default function InboxSection() {
  return (
    <aside className="bg-gradient-to-b from-[#1b2a47] to-[#22335a] text-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 w-72 min-w-[260px] h-full">
      <div>
        <h2 className="font-bold text-xl mb-4">Inbox</h2>
        <button className="w-full bg-[#22335a] hover:bg-[#2c3e66] text-left px-4 py-2 rounded-lg mb-6 transition">
          Add a card
        </button>
        <div className="text-sm text-blue-100 mb-6">
          <b>Consolidate your to-dos</b>
          <br />
          Email it, say it, forward it—however it comes, get it into Trello fast.
        </div>
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="bg-[#223366] p-3 rounded-full"><Mail /></div>
          <div className="bg-[#223366] p-3 rounded-full"><Users /></div>
          <div className="bg-[#223366] p-3 rounded-full"><Slack /></div>
          <div className="bg-[#223366] p-3 rounded-full"><Smartphone /></div>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2 text-xs text-blue-100">
        <Lock className="w-4 h-4" />
        Inbox is only visible to you
      </div>
    </aside>
  );
}