import Image from "next/image";
import React from "react";
// Assuming you've installed React Bits:
// import { Button } from 'reactbits';
import { FiPlus } from "react-icons/fi";

// --- Type Definitions ---
interface HeaderProps {
  title: string;
  showCreateButton?: boolean; // Optional prop to control button visibility
  onCreateClick?: () => void; // Function to handle the 'Create' button click
}

// --- Main Header Component ---
const Header: React.FC<HeaderProps> = ({
  title,
  showCreateButton = true,
  onCreateClick,
}) => {
  // Placeholder for the React Bits Button functionality
  const AnimatedCreateButton: React.FC = () => {
    return (
      <button
        // This is the CRITICAL line that calls the function passed from ListPage
        onClick={onCreateClick}
        className="
          flex items-center space-x-2 
          bg-[#3788E5] text-white 
          px-4 py-1 rounded-lg 
          shadow-md hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-all duration-200 ease-in-out text-sm
        "
      >
        <FiPlus className="w-5 h-5" />
        <span className="font-semibold">Add Operations</span>
      </button>
    );
  };

  return (
    // Top bar spanning the width of the main content area
      <>
      // Top bar spanning the width of the main content area
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
          <h1 className="flex items-center font-semibold text-lg text-[#3b82f6]">
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
          <h3 className="hidden sm:flex mx-2 items-center text-gray-600 text-sm">
            Admin
          </h3><span
            className="hidden sm:inline pi pi-chevron-right"
            style={{
              fontSize: "0.7rem",
              marginLeft: "6px",
              color: "gray",
            }}
          ></span>
          <h3 className="hidden sm:flex mx-2 items-center text-gray-600 text-sm">
            Operation Master
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
              placeholder="Search..." />
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
<h3 className="hidden sm:flex mx-2 items-center text-black font-bold mr-6 text-sm">
            JJ Mills Bangaladesh Pvt
          </h3>
          {/* User Profile and Logout Dropdown (New Group/Hover structure) */}
          <div className="relative group">
            {/* User Initial Badge (Modified: Added lg:text-sm) */}
            <h1 className="bg-orange-400 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white text-sm md:text-base **lg:text-sm** cursor-pointer">
              KA
            </h1>

            {/* Logout Dropdown */}
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg hidden **group-hover:block** z-20">
              <button
                // onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
              >
                <span className="pi pi-sign-out mr-2"></span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div><header className="bg-white border-b border-gray-200 sticky top-0 z-5 p-4 md:p-4 shadow-sm mt-7">
        <div className="flex justify-between items-center">
          {/* Page Title */}
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>

          {/* Action Button */}
          {showCreateButton && (
            <div>
              <AnimatedCreateButton />
            </div>
          )}
        </div>
      </header></>
  );
};

export default Header;
