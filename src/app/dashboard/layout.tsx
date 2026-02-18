"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import "@/styles/globals.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Navbar */}
      <NavBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex h-full pt-16">
        {/* Sidebar - Fixed position without overlay effect */}
        <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Page content with sidebar margin */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-0"
          } h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100`}
        >
          {/* Padding for the hover popup */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
