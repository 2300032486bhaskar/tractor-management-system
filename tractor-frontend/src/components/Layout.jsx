import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 h-full transition-transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-green-50">

        {/* Top Bar */}
        <div className="bg-white shadow p-4 flex items-center justify-between">

          {/* Hamburger Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h1 className="font-semibold text-green-700">
            Tractor Management System
          </h1>

        </div>

        <div className="p-6">{children}</div>

      </div>

    </div>
  );
}