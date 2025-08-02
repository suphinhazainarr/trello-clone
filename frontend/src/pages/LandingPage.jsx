import React from "react";
import { Link } from "react-router-dom"; // <-- 1. Import Link

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/trello-logo.svg" alt="Trello" className="h-8" />
          <span className="font-bold text-xl text-[#253858]">Trello</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#" className="text-[#253858] font-medium">Features</a>
          <a href="#" className="text-[#253858] font-medium">Solutions</a>
          <a href="#" className="text-[#253858] font-medium">Plans</a>
          <a href="#" className="text-[#253858] font-medium">Pricing</a>
          <a href="#" className="text-[#253858] font-medium">Resources</a>
          {/* 2. Change <a> to <Link> */}
          <Link to="/login" className="text-[#253858] font-medium">Log in</Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">Get Trello for free</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#253858] mb-4">
            Capture, organize, and tackle your to-dos from anywhere.
          </h1>
          <p className="text-lg text-[#42526e] mb-6">
            Escape the clutter and chaos—unleash your productivity with Trello.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* 3. Change <button> to <Link> and style it like a button */}
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition flex items-center"
            >
              Sign up – it’s free!
            </Link>
          </form>
          <p className="text-xs text-[#42526e] mt-2">
            By entering my email, I acknowledge the <a href="#" className="underline">Atlassian Privacy Policy</a>
          </p>
        </div>
        <div className="mt-10 md:mt-0">
          <img src="/trello-hero.png" alt="Trello App Preview" className="w-[350px] rounded-xl shadow-lg" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#172b4d] text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/trello-logo.svg" alt="Trello" className="h-8" />
            <span className="font-bold text-xl">Trello</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">About Trello</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Apps</a>
            <a href="#" className="hover:underline">Contact us</a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-300 mt-4">
          © 2024 Atlassian. All rights reserved.
        </div>
      </footer>
    </div>
  );
}