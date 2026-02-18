"use client";

import Image from "next/image";
import femaleUser from "@/assets/Employee_Image.png";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { LogOut, Key, ChevronDown, Search, X } from "lucide-react";

export default function NavBar({ onMenuClick }) {
  const [isClient, setIsClient] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsProfileDropdownOpen(false);
        setIsSearchExpanded(false);
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    if (isClient) {
      router.push("/login");
    }
    setIsProfileDropdownOpen(false);
  };

  const handleResetPassword = () => {
    console.log("Reset password clicked");
    setIsProfileDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const handleSearchBlur = () => {
    if (!searchQuery && window.innerWidth < 768) {
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-blue-600 shadow-md z-40 flex items-center justify-between px-4 md:px-6">
      {/* Left Section: Menu Button and Logo */}
      <div className="flex items-center flex-1">
        <button
          onClick={onMenuClick}
          className="text-white hover:opacity-80 transition flex items-center"
          aria-label="Toggle menu"
        >
          <div className="flex items-center">
            {/* <Image
              src="/assets/jj_logo1.png"
              alt="Harness ERP Logo"
              width={38}
              height={38}
              className="h-6 md:h-8 w-auto mr-2 filter brightness-0 invert"
              priority
            /> */}

            <Image
              src="https://res.cloudinary.com/dcgpglrqt/image/upload/v1765774217/Group_454_ynotl6.png"
              alt="Harness ERP Logo"
              width={38}
              height={38}
              className="h-6 md:h-8 w-auto mr-3"
              priority
            />
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isProfileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
        <span className="text-white font-bold text-lg md:text-xl hidden md:inline">
          {"   "}
        </span>
        <span className="text-white font-bold text-lg md:text-xl hidden md:inline">
          Harness ERP
        </span>
        <span className="text-white mx-2 font-bold text-lg md:text-xl hidden md:inline">
          ›
        </span>
        <span className="font-medium text-white text-lg md:text-sm hidden md:inline">
          Home
        </span>
      </div>

      {/* Center Section: Search Bar */}
      <div
        className={`${
          isSearchExpanded ? "flex" : "hidden"
        } md:flex flex-1 max-w-md mx-4`}
      >
        <div className="w-full">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
                onClick={() => searchInputRef.current?.focus()}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={handleSearchBlur}
                className="w-full pl-10 pr-10 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Search Controls */}
      <div className="md:hidden flex items-center mr-3">
        {isSearchExpanded ? (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsSearchExpanded(false);
            }}
            className="text-white hover:opacity-80 transition p-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSearchIconClick}
            className="text-white hover:opacity-80 transition p-1"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Right Section: Company Name and Profile */}
      <div className="flex items-center justify-end flex-1">
        {/* Company Name - Moved to right */}
        <div className="hidden md:block mr-4">
          <div className="flex flex-col items-end">
            <span className="text-white font-medium text-sm whitespace-nowrap">
              Jay Jay Mills (Bangladesh) Private Limited
            </span>
            <span className="text-white text-xs opacity-90 ">Fabric</span>
          </div>
        </div>

        {/* Mobile Company Name - Truncated */}
        <div
          className={`md:hidden mr-2 ${isSearchExpanded ? "hidden" : "block"}`}
        >
          <div className="flex flex-col items-end">
            <span className="text-white font-medium text-xs whitespace-nowrap">
              Jay Jay Mills
            </span>
            <span className="text-white text-xs opacity-90">Fabric</span>
          </div>
        </div>

        {/* Profile Section with Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            ref={profileButtonRef}
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 text-white hover:opacity-80 transition px-2 py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800"
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="true"
          >
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white border-2 border-blue-400 overflow-hidden flex items-center justify-center">
              <Image
                src={femaleUser}
                alt="User Profile"
                width={32}
                height={32}
                className="object-cover"
                priority
              />
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isProfileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          <div
            className={`absolute right-0 top-full mt-2 w-56 md:w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 transition-all duration-200 ease-out ${
              isProfileDropdownOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            }`}
            role="menu"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white border-2 border-blue-400 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Image
                    src={femaleUser}
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    Shajalal
                  </p>
                  <p className="text-xs text-gray-600">Executive</p>
                  <p className="text-xs text-gray-500 mt-1 truncate hidden md:block">
                    shajalal@example.com
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={handleResetPassword}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                role="menuitem"
              >
                <Key className="w-4 h-4 flex-shrink-0" />
                <span>Reset Password</span>
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors"
                role="menuitem"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop for dropdown */}
      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsProfileDropdownOpen(false)}
        />
      )}
    </header>
  );
}
