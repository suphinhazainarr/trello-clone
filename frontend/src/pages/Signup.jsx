import React from "react";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#22272b]">
      <div className="bg-[#282e33] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Username" className="p-3 rounded bg-[#22272b] text-white border border-[#39424e] focus:outline-none" />
          <input type="email" placeholder="Email" className="p-3 rounded bg-[#22272b] text-white border border-[#39424e] focus:outline-none" />
          <input type="password" placeholder="Password" className="p-3 rounded bg-[#22272b] text-white border border-[#39424e] focus:outline-none" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded mt-2">Sign Up</button>
        </form>
        <p className="text-[#b6c2cf] mt-4 text-center text-sm">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
