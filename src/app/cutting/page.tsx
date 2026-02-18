"use client";
import { useRouter } from "next/navigation";
import "primeicons/primeicons.css";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    // router.push("/login");
    router.push("/");
  };

  return (
    <div>
      {/* 1. FIXED HEADER (Responsive adjustments) */}
      <div className="h-14 w-full fixed top-0 left-0 z-10 p-3 border-b border-gray-200 bg-white flex justify-between items-center">
        {/* Left Side: Brand & Breadcrumb */}
        <div className="flex items-center">
          <Image
            src="https://res.cloudinary.com/dcgpglrqt/image/upload/v1765774217/Group_454_ynotl6.png" // Still uses the root-relative path
            alt="Harness ERP Logo"
            width={38} // Approximate width in pixels for md:h-8 (32px)
            height={38} // Approximate height in pixels for md:h-8 (32px)
            className="h-6 md:h-8 w-auto mr-3" // Tailwind classes for visual size
          />
          <h1
            onClick={() => router.push("/dashboard")}
            className="flex items-center cursor-pointer font-semibold text-lg text-[#3b82f6]"
          >
            Harness ERP
          </h1>
          {/* Hide breadcrumb separator and 'Dashboard' on small screens */}
          <span
            className="hidden sm:inline pi pi-chevron-right"
            style={{
              fontSize: "0.7rem",
              marginLeft: "6px",
              color: "gray",
            }}
          ></span>
          <h3
            onClick={() => router.push("/dashboard")}
            className="hidden sm:flex mx-2 items-center text-gray-600 text-sm cursor-pointer"
          >
            Home
          </h3>
        </div>

        {/* Right Side: Search, Notifications, User */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Bar - Hide completely on extra small screens, show on small screens and up */}
          <div className="relative hidden sm:block w-32 md:w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pi pi-search text-gray-500 text-xs md:text-sm"></span>
            <input
              type="text"
              className="pl-8 sm:pl-10 border border-gray-300 rounded-lg bg-gray-100 w-full py-1 text-sm"
              placeholder="Search..."
            />
          </div>

          <span className="pi pi-bell text-gray-500 text-sm md:text-base"></span>

          {/* Help Menu - Hide completely on small screens, show on medium and up */}
          <h3 className="hidden md:flex items-center text-gray-600 border-l pl-2 border-gray-200 text-sm">
            Help
            <span
              className="pi pi-chevron-down"
              style={{
                fontSize: "0.8rem",
                marginLeft: "4px",
                color: "lightgray",
              }}
            ></span>
          </h3>
          <span className="hidden sm:block text-sm font-bold text-black">
            JJ Mills Bangladesh Pvt
          </span>
          {/* User Profile and Logout Dropdown (New Group/Hover structure) */}
          <div className="relative group">
            {/* User Initial Badge (Modified: Added lg:text-sm) */}
            <h1 className="bg-orange-400 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white text-sm md:text-base **lg:text-sm** cursor-pointer">
              KA
            </h1>

            {/* Logout Dropdown */}
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg hidden **group-hover:block** z-20">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
              >
                <span className="pi pi-sign-out mr-2"></span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT WRAPPER (Responsive change from flex to block/column) */}
      <div className="block md:flex pt-14">
        <div className="hidden md:flex flex-col justify-between md:w-1/5 pt-6 pl-6 pr-4 border-r border-gray-100 bg-white shadow-xl z-10 sticky top-14 h-[calc(100vh-3.5rem)]">
          <div className="">
            <div>
              <h1 className="text-sm font-bold text-[#3b82f6] mb-5 tracking-wider">
                MODULES
              </h1>

              <div className="relative group">
                {/* MODULE BUTTON */}
                <button
                  onClick={() => router.push("/cutting")}
                  className="
      w-full flex items-center justify-between
      text-sm font-medium mb-3 p-2 rounded-lg
     bg-blue-50 text-blue-700
      transition-colors
    "
                >
                  <span>Cutting Module</span>
                  {/* <span className="text-xs opacity-60 group-hover:opacity-100">▶</span> */}
                </button>

                {/* HOVER PANEL */}
                <div
                  className="
      absolute left-full top-0 ml-3
      w-72
      bg-white
      border border-gray-200
      rounded-xl
      shadow-[0_20px_40px_rgba(0,0,0,0.18)]
      ring-1 ring-black/5

      opacity-0 invisible translate-x-2
      group-hover:opacity-100
      group-hover:visible
      group-hover:translate-x-0

      transition-all duration-200 ease-out
      z-50
    "
                >
                  {/* PANEL HEADER */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Cutting Module
                    </h3>
                    <p className="text-xs text-gray-500">
                      Reports & Operations
                    </p>
                  </div>

                  {/* MENU LIST */}
                  <ul className="p-2 space-y-1">
                    {[
                      "Cut Panel Bundle Audit",
                      "Daily Cutting CPI",
                      "CPI QR Code Building Report",
                      "Style Sys Id Tracking",
                      "Bundle Operation",
                    ].map((item) => (
                      <li
                        key={item}
                        className="
            flex items-center gap-2
            p-2 rounded-md
            text-sm text-gray-700
            cursor-pointer
            hover:bg-blue-500 hover:text-white
            transition-colors
          "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative group">
                {/* MODULE BUTTON */}
                <button
                  onClick={() => router.push("/iedepartment")}
                  className="
      w-full flex items-center justify-between
      text-sm font-medium mb-3 p-2 rounded-lg
      text-gray-700
      hover:bg-blue-50 hover:text-blue-700
      transition-colors
    "
                >
                  <span>IE Department</span>
                  {/* <span className="text-xs opacity-60 group-hover:opacity-100">▶</span> */}
                </button>

                {/* HOVER PANEL */}
                <div
                  className="
      absolute left-full top-0 ml-3
      w-72
      bg-white
      border border-gray-200
      rounded-xl
      shadow-[0_20px_40px_rgba(0,0,0,0.18)]
      ring-1 ring-black/5

      opacity-0 invisible translate-x-2
      group-hover:opacity-100
      group-hover:visible
      group-hover:translate-x-0

      transition-all duration-200 ease-out
      z-50
    "
                >
                  {/* PANEL HEADER */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">
                      IE Department
                    </h3>
                    <p className="text-xs text-gray-500">
                      Reports & Operations
                    </p>
                  </div>

                  {/* MENU LIST */}
                  <ul className="p-2 space-y-1">
                    {[
                      "Cut Panel Bundle Audit",
                      "Daily Cutting CPI",
                      "CPI QR Code Building Report",
                      "Style Sys Id Tracking",
                      "Bundle Operation",
                    ].map((item) => (
                      <li
                        key={item}
                        className="
            flex items-center gap-2
            p-2 rounded-md
            text-sm text-gray-700
            cursor-pointer
            hover:bg-blue-500 hover:text-white
            transition-colors
          "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative group">
                {/* MODULE BUTTON */}
                <button
                  onClick={() => router.push("/quality")}
                  className="
      w-full flex items-center justify-between
      text-sm font-medium mb-3 p-2 rounded-lg
      text-gray-700
      hover:bg-blue-50 hover:text-blue-700
      transition-colors
    "
                >
                  <span>Quality Modules</span>
                </button>

                {/* HOVER PANEL */}
                <div
                  className="
      absolute left-full top-0 ml-3
      w-72
      bg-white
      border border-gray-200
      rounded-xl
      shadow-[0_20px_40px_rgba(0,0,0,0.18)]
      ring-1 ring-black/5

      opacity-0 invisible translate-x-2
      group-hover:opacity-100
      group-hover:visible
      group-hover:translate-x-0

      transition-all duration-200 ease-out
      z-50
    "
                >
                  {/* PANEL HEADER */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Quality Modules
                    </h3>
                    <p className="text-xs text-gray-500">
                      Reports & Operations
                    </p>
                  </div>

                  {/* MENU LIST */}
                  <ul className="p-2 space-y-1">
                    {[
                      "Cut Panel Bundle Audit",
                      "Daily Cutting CPI",
                      "CPI QR Code Building Report",
                      "Style Sys Id Tracking",
                      "Bundle Operation",
                    ].map((item) => (
                      <li
                        key={item}
                        className="
            flex items-center gap-2
            p-2 rounded-md
            text-sm text-gray-700
            cursor-pointer
            hover:bg-blue-500 hover:text-white
            transition-colors
          "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative group">
                {/* MODULE BUTTON */}
                <button
                  onClick={() => router.push("/system")}
                  className="
      w-full flex items-center justify-between
      text-sm font-medium mb-3 p-2 rounded-lg
      text-gray-700
      hover:bg-blue-50 hover:text-blue-700
      transition-colors
    "
                >
                  <span>System</span>
                </button>

                {/* HOVER PANEL */}
                <div
                  className="
      absolute left-full top-0 ml-3
      w-72
      bg-white
      border border-gray-200
      rounded-xl
      shadow-[0_20px_40px_rgba(0,0,0,0.18)]
      ring-1 ring-black/5

      opacity-0 invisible translate-x-2
      group-hover:opacity-100
      group-hover:visible
      group-hover:translate-x-0

      transition-all duration-200 ease-out
      z-50
    "
                >
                  {/* PANEL HEADER */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">
                      System
                    </h3>
                    <p className="text-xs text-gray-500">
                      Reports & Operations
                    </p>
                  </div>

                  {/* MENU LIST */}
                  <ul className="p-2 space-y-1">
                    {[
                      "Cut Panel Bundle Audit",
                      "Daily Cutting CPI",
                      "CPI QR Code Building Report",
                      "Style Sys Id Tracking",
                      "Bundle Operation",
                    ].map((item) => (
                      <li
                        key={item}
                        className="
            flex items-center gap-2
            p-2 rounded-md
            text-sm text-gray-700
            cursor-pointer
            hover:bg-blue-500 hover:text-white
            transition-colors
          "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group">
                {/* MODULE BUTTON */}
                <button
                  onClick={() => router.push("/printing")}
                  className="
      w-full flex items-center justify-between
      text-sm font-medium mb-3 p-2 rounded-lg
      text-gray-700
      hover:bg-blue-50 hover:text-blue-700
      transition-colors
    "
                >
                  <span>Printing</span>
                  {/* <span className="text-xs opacity-60 group-hover:opacity-100">▶</span> */}
                </button>

                {/* HOVER PANEL */}
                <div
                  className="
      absolute left-full top-0 ml-3
      w-72
      bg-white
      border border-gray-200
      rounded-xl
      shadow-[0_20px_40px_rgba(0,0,0,0.18)]
      ring-1 ring-black/5

      opacity-0 invisible translate-x-2
      group-hover:opacity-100
      group-hover:visible
      group-hover:translate-x-0

      transition-all duration-200 ease-out
      z-50
    "
                >
                  {/* PANEL HEADER */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Printing
                    </h3>
                    <p className="text-xs text-gray-500">
                      Reports & Operations
                    </p>
                  </div>

                  {/* MENU LIST */}
                  <ul className="p-2 space-y-1">
                    {[
                      "Cut Panel Bundle Audit",
                      "Daily Cutting CPI",
                      "CPI QR Code Building Report",
                      "Style Sys Id Tracking",
                      "Bundle Operation",
                    ].map((item) => (
                      <li
                        key={item}
                        className="
            flex items-center gap-2
            p-2 rounded-md
            text-sm text-gray-700
            cursor-pointer
            hover:bg-blue-500 hover:text-white
            transition-colors
          "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:bg-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-sm font-bold text-[#3b82f6] mb-5 tracking-wider">
                Administrator
              </h1>
              <h1 className="text-sm font-medium mb-3 p-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                Customization
              </h1>
              <h1 className="text-sm font-medium mb-3 p-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                Tools
              </h1>
              <h1 className="text-sm font-medium mb-3 p-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                Users
              </h1>
            </div>
          </div>
          <div className=" flex justify-center  py-3 mt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
              JJ Mills Bangaladesh Pvt
            </p>
          </div>
        </div>
        {/* MAIN DISPLAY AREA / RIGHT PANE */}
        <div className="w-full md:w-4/5 p-4 md:p-8 font-sans bg-[#3b83f60e] min-h-screen">
          {/* Settings Section - Responsive Column Layout */}

          {/* REPORTS & MASTERS Section - Grid Layout */}
          <div className="pt-5">
            <div className="text-sm font-bold text-[#3b82f6] mb-5 tracking-wider">
              Cutting Module
            </div>

            {/* Grid Layout: 1 column on mobile, 2 on medium, 3 on large */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
              {/* Card 1: Cutting Module */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col w-5xl h-[500px] shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                {/* <div className="text-base font-semibold text-gray-800 mb-2">
                  Cutting Module
                </div> */}
                <div className="grow overflow-y-auto pr-2 custom-scrollbar">
                  <ul className="">
                    {/* 👇 Fixed and improved hover logic for all list items 👇 */}
                    <li className="menu-item group active-bullet p-2 rounded-md transition-colors hover:bg-blue-500 hover:text-white w-60">
                      <span className="pi pi-globe mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                      <h6 className="group-hover:text-white">
                        Cut Panel Bundle Audit
                      </h6>
                    </li>
                    <li className="menu-item group active-bullet p-2 rounded-md transition-colors hover:bg-blue-500 hover:text-white w-60">
                      <span className="pi pi-box mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                      <h6 className="group-hover:text-white">
                        Daily Cutting CPI
                      </h6>
                    </li>
                    <li className="menu-item group active-bullet p-2 rounded-md transition-colors hover:bg-blue-500 hover:text-white w-60">
                      <span className="pi pi-building mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                      <h6 className="group-hover:text-white">
                        CPI QR Code Building Report
                      </h6>
                    </li>
                    <li className="menu-item group active-bullet p-2 rounded-md transition-colors hover:bg-blue-500 hover:text-white w-60">
                      <span className="pi pi-globe mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                      <h6 className="group-hover:text-white">
                        {" "}
                        Style Sys Id Tracking
                      </h6>
                    </li>
                    <li className="menu-item group active-bullet p-2 rounded-md transition-colors hover:bg-blue-500 hover:text-white w-60">
                      <span className="pi pi-building mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                      <h6 className="group-hover:text-white">Bundle Audit</h6>
                    </li>
                    <li className="menu-item group active-bullet p-2 rounded-md transition-colors hover:bg-blue-500 hover:text-white w-60">
                      <span className="pi pi-globe mr-2 text-sm transition-colors text-blue-500 group-hover:text-white"></span>
                      <h6 className="group-hover:text-white">
                        Bundle Operation
                      </h6>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 5: Printing */}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* 1. Custom List Item Styling (Note: Hover styles are now in Tailwind classes) */
        .menu-item {
          font-size: 14px;
          color: #555;
          /* Removed padding: 8px 0; to let Tailwind p-2 control it */
          /* Removed border-bottom for cleaner Tailwind look */
          display: flex;
          align-items: center;
          list-style: none;
          cursor: pointer;
        }

        /* Add the grey bullet dot */
        /* ... (Keep or remove bullet styles as needed) */

        /* Blue dot for selected items (like in the Website container) */
        .active-bullet::before {
          color: #3b82f6; /* Tailwind blue-500 equivalent */
        }

        /* Remove border from the last item in the list */
        .menu-item:last-child {
          border-bottom: none;
        }

        /* 2. Scrollbar Hiding */
        /* For WebKit (Chrome, Safari, Edge) */
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Hide the scrollbar itself */
          width: 0; /* Ensures no space is reserved */
        }

        /* For Firefox */
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .last-child {
          border-bottom: none !important; /* Ensure last child border is hidden */
        }
      `}</style>
    </div>
  );
}
