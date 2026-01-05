"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-950">
      {/* 1. FIXED HEADER */}
      <div className="h-14 w-full fixed top-0 left-0 z-20 p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center transition-colors">
        <div className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dcgpglrqt/image/upload/v1765774217/Group_454_ynotl6.png"
            alt="Harness ERP Logo"
            width={38}
            height={38}
            className="h-6 md:h-8 w-auto mr-3 brightness-100 dark:brightness-125"
          />
          <h1
            onClick={() => router.push("/dashboard")}
            className="flex items-center cursor-pointer font-semibold text-lg text-[#3b82f6] dark:text-blue-400"
          >
            Harness ERP
          </h1>
          <span className="hidden sm:inline pi pi-chevron-right ml-2 text-gray-400 text-[0.7rem]"></span>
          <h3 className="hidden sm:flex mx-2 items-center text-gray-600 dark:text-gray-400 text-sm">
            Home
          </h3>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:ring-2 ring-blue-500 transition-all"
          >
            <i className={`pi ${darkMode ? "pi-sun" : "pi-moon"}`}></i>
          </button>

          <div className="relative hidden sm:block w-32 md:w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pi pi-search text-gray-500 dark:text-gray-400 text-xs"></span>
            <input
              type="text"
              className="pl-9 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white w-full py-1 text-sm outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>

          <span className="pi pi-bell text-gray-500 dark:text-gray-400 cursor-pointer"></span>

          <span className="hidden sm:block text-sm font-bold text-black dark:text-white">
            JJ Mills Bangladesh Pvt
          </span>

          <div className="relative group">
            <h1 className="bg-orange-400 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white text-sm font-bold cursor-pointer">
              KA
            </h1>
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg hidden group-hover:block z-20">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <span className="pi pi-sign-out mr-2"></span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:flex pt-14">
        {/* 2. SIDEBAR */}
        <div className="hidden md:flex flex-col justify-between md:w-1/5 pt-6 pl-6 pr-4 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-10 sticky top-14 h-[calc(100vh-3.5rem)] transition-colors">
          <div>
            <h1 className="text-sm font-bold text-[#3b82f6] dark:text-blue-400 mb-5 tracking-wider uppercase">
              Modules
            </h1>

            {/* Reusable Sidebar Module Item */}
            {[
              ["Cutting Module", "/cutting"],
              ["IE Department", "/iedepartment"],
              ["Quality Modules", "/quality"],
              ["System", "/system"],
              ["Printing", "/printing"],
            ].map(([label, path]) => (
              <div key={label} className="relative group">
                {/* MODULE BUTTON */}
                <button
                  onClick={() => router.push(path)}
                  className="w-full flex items-center justify-between text-sm font-medium mb-3 p-2 rounded-lg 
                 text-gray-700 dark:text-gray-300 
                 hover:bg-blue-50 dark:hover:bg-blue-900/30 
                 hover:text-blue-700 dark:hover:text-blue-400 
                 transition-all duration-200"
                >
                  <span>{label}</span>
                </button>
                {/* Hover Panel */}
                <div className="absolute left-full top-0 ml-3 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl opacity-0 invisible translate-x-2 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="text-sm font-semibold dark:text-white">
                      {label}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Reports & Operations
                    </p>
                  </div>
                  <ul className="p-2 space-y-1">
                    <li className="p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer transition-colors">
                      View All Reports
                    </li>
                    <li className="p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer transition-colors">
                      Manage Operations
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="py-3 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
              JJ Mills Bangladesh
            </p>
          </div>
        </div>

        {/* 3. MAIN DISPLAY AREA */}
        <div className="w-full md:w-4/5 p-4 md:p-8 bg-[#3b83f60e] dark:bg-gray-950 transition-colors">
        <div className="mb-8">
            <div className="flex items-center justify-between font-bold">
              <h1 className="text-sm font-bold text-[#3b82f6] tracking-wider">
                RECENTLY USED
              </h1>
              <span className="pi pi-ellipsis-h bg-[#3b83f6ce] p-2 rounded-sm text-white text-xs"></span>
            </div>
            {/* Card Layout: Changes from horizontal flex to stacked columns on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
              <div className="border border-[#3b82f6]/30 rounded-md p-3 flex items-start">
                <div className="flex items-center">
                  <span className="pi pi-globe mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                  <h6 className="group-hover:text-white">
                    Cut Panel Bundle Audit
                  </h6>
                </div>
              </div>
              <div className="border border-[#3b82f6]/30 rounded-md p-3 flex items-start">
                <div className="flex items-center">
                  <span className="pi pi-building mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                  <h6 className="group-hover:text-white">Bundle Audit</h6>
                </div>
              </div>
              <div className="border border-[#3b82f6]/30 rounded-md p-3 flex items-start">
                <div className="flex items-center">
                  <span className="pi pi-globe mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                  <h6 className="group-hover:text-white">Operation Master</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="text-sm font-bold text-[#3b82f6] dark:text-blue-400 mb-5 tracking-wider uppercase">
              Applications
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Example (Applied to all) */}
              {[
                "Cutting Module",
                "IE Department",
                "Quality Modules",
                "System",
                "Printing",
              ].map((title) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-900 border border-[#3b82f6]/30 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 "
                >
                  <div className="text-base font-bold text-gray-800 dark:text-white mb-4">
                    {title}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    <div className="group flex items-center text-sm p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                      <i
                        className="pi pi-file mr-3 text-blue-500 transition-colors duration-200 group-hover:text-white dark:text-blue-400"
                      ></i>
                      <h6 className="font-medium">Daily Reports</h6>
                    </div>
                    <div className="group flex items-center text-sm p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                      <i
                        className="pi pi-cog mr-3 text-blue-500 transition-colors duration-200 group-hover:text-white dark:text-blue-400"
                      ></i>
                      <h6 className="font-medium">Operations Master</h6>
                    </div>
                  </div>
                  <div className="group flex items-center text-sm p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                      <i className="pi pi-box mr-3 text-blue-500 transition-colors duration-200 group-hover:text-white dark:text-blue-400"></i>
                      <h6 className="font-medium">Report</h6>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-track { background: #111827; }
        html.dark { color-scheme: dark; }
      `}</style> */}
    </div>
  );
}
