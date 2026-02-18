"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface AppHeaderProps {
  companyName?: string;
  userInitials?: string;
  onLogout?: () => void;
  navTab: string;
}

export default function AppHeader({
  companyName = "JJ Mills Bangladesh Pvt",
  userInitials = "KA",
  onLogout,
  navTab,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <div className="h-14 w-full fixed top-0 left-0 z-10 p-3 border-b border-gray-200 bg-white flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://res.cloudinary.com/dcgpglrqt/image/upload/v1765774217/Group_454_ynotl6.png"
          alt="Harness ERP Logo"
          width={38}
          height={38}
          className="h-6 md:h-8 w-auto mr-3"
        />

        <h1
          onClick={() => router.push("/dashboard")}
          className="flex items-center cursor-pointer font-semibold text-lg text-[#3b82f6]"
        >
          Harness ERP
        </h1>

        <span
          className="hidden sm:inline pi pi-chevron-right"
          style={{ fontSize: "0.7rem", marginLeft: "6px", color: "gray" }}
        />

        <h3
          onClick={() => router.push("/dashboard")}
          className="hidden sm:flex mx-2 items-center text-gray-600 text-sm cursor-pointer"
        >
          {navTab}
        </h3>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search */}
        <div className="relative hidden sm:block w-32 md:w-48">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pi pi-search text-gray-500 text-xs md:text-sm"></span>
          <input
            type="text"
            className="pl-8 sm:pl-10 border border-gray-300 rounded-lg bg-gray-100 w-full py-1 text-sm"
            placeholder="Search..."
          />
        </div>

        <span className="pi pi-bell text-gray-500 text-sm md:text-base"></span>

        <h3 className="hidden md:flex items-center text-gray-600 border-l pl-2 border-gray-200 text-sm">
          Help
          <span
            className="pi pi-chevron-down"
            style={{
              fontSize: "0.8rem",
              marginLeft: "4px",
              color: "lightgray",
            }}
          />
        </h3>

        <span className="hidden sm:block text-sm font-bold text-black">
          {companyName}
        </span>

        {/* Profile */}
        <div className="relative group">
          <h1 className="bg-orange-400 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white text-sm md:text-base cursor-pointer">
            {userInitials}
          </h1>

          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-20">
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <span className="pi pi-sign-out mr-2"></span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
