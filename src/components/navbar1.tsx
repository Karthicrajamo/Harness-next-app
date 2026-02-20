"use client";

import React, { useEffect, useState } from "react";
// import {
//   Bars3CenterLeftIcon,
//   CloudArrowDownIcon,
//   ChartBarIcon,
//   UserCircleIcon,
//   ChevronDownIcon,
//   EllipsisVerticalIcon,
//   UserIcon,
//   Cog6ToothIcon,
//   ArrowRightStartOnRectangleIcon,
// } from "@heroicons/react/24/outline";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  onLogoutClick: () => void;
  showLogoutConfirm: boolean;
  setShowLogoutConfirm: (value: boolean) => void;
}

export default function Navbar({
  collapsed,
  setCollapsed,
  onLogoutClick,
  showLogoutConfirm,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (showLogoutConfirm) {
      setUserMenuOpen(false);
      setMenuOpen(false);
    }
  }, [showLogoutConfirm]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white text-black shadow-lg z-50">
        <div className="py-3 px-4 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center space-x-3">
            <div
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md cursor-pointer transition-all hover:bg-black/10 hover:shadow-md hover:scale-105"
            >
              {/* <Bars3CenterLeftIcon className="h-8 w-8 text-blue-900" /> */}
            </div>
            <h1 className="text-blue-900 text-sm sm:text-base md:text-lg font-semibold">
              Adhistam Ventures Private Limited <span className="italic font-medium text-lg text-blue-900">(fabric)</span>
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4 relative">
           

            {/* Desktop user menu */}
            <div className="hidden sm:flex relative">
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => {
                  if (!showLogoutConfirm) {
                    setUserMenuOpen(!userMenuOpen);
                  }
                }}
              >
                {/* <UserCircleIcon className="h-6 w-6 text-blue-900" /> */}
                <span className="text-blue-900">Admin</span>
                {/* <ChevronDownIcon className="h-4 w-4 text-blue-900 mt-1" /> */}
              </div>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-50 p-1 border border-gray-200">
                  <div
                    className="group px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 transition-all duration-200 border-l-4 border-l-transparent hover:bg-[#DBEAFA] hover:border-l-[#0F172A] hover:text-[#0F172A]"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogoutClick();
                    }}
                  >
                    {/* <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-gray-600 group-hover:text-[#0F172A]" /> */}
                    <span>Logout</span>
                  </div>

                  <div className="group px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 transition-all duration-200 border-l-4 border-l-transparent hover:bg-[#DBEAFA] hover:border-l-[#0F172A] hover:text-[#0F172A]">
                    {/* <UserIcon className="w-5 h-5 text-gray-600 group-hover:text-[#0F172A]" /> */}
                    <span>Profile</span>
                  </div>

                  <div className="group px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 transition-all duration-200 border-l-4 border-l-transparent hover:bg-[#DBEAFA] hover:border-l-[#0F172A] hover:text-[#0F172A]">
                    {/* <Cog6ToothIcon className="w-5 h-5 text-gray-600 group-hover:text-[#0F172A]" /> */}
                    <span>Settings</span>
                  </div>
                </div>
              )}
            </div>

      
             {/* <EllipsisVerticalIcon 
              className="h-6 w-6 text-black cursor-pointer transition-all hover:bg-black/10 hover:shadow-md hover:scale-105 sm:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            /> */}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden bg-dark-blue border-t border-blue-100 cursor-pointer z-50 absolute top-16 left-0 w-full">
            <div className="flex flex-col p-2">
              <div className="flex items-center space-x-2 p-3 rounded hover:bg-black/10 cursor-pointer">
                {/* <CloudArrowDownIcon className="h-6 w-6 text-white" /> */}
                <span className="text-white">Install app</span>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded hover:bg-black/10 cursor-pointer">
                {/* <ChartBarIcon className="h-6 w-6 text-white" /> */}
                <span className="text-white">Power BI</span>
              </div>

              <div className="flex flex-col w-full">
                <div
                  className="flex items-center space-x-2 p-3 rounded hover:bg-black/10 cursor-pointer justify-between"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex items-center space-x-2">
                    {/* <UserCircleIcon className="h-6 w-6 text-white" /> */}
                    <span className="text-white">Admin</span>
                  </div>
                  {/* <ChevronDownIcon
                    className={`h-4 w-4 text-white transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  /> */}
                </div>

                {userMenuOpen && (
                  <div className="flex flex-col bg-dark-blue/80 rounded-b overflow-hidden">
                    <div
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                        onLogoutClick();
                      }}
                      className="group flex items-center ml-4 gap-3 px-4 py-3 cursor-pointer
                      border-l-4 border-l-transparent
                      transition-all duration-200
                      hover:bg-[#DBEAFA] hover:border-l-[#0F172A]"
                    >
                      {/* <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-white group-hover:text-[#0F172A]" /> */}
                      <span className="text-white group-hover:text-gray-800 font-medium">
                        Logout
                      </span>
                    </div>

                    <div className="group flex items-center ml-4 gap-3 px-4 py-3 cursor-pointer
                    border-l-4 border-l-transparent
                    transition-all duration-200
                    hover:bg-[#DBEAFA] hover:border-l-[#0F172A]">
                      {/* <UserIcon className="w-5 h-5 text-white group-hover:text-[#0F172A]" /> */}
                      <span className="text-white group-hover:text-gray-800 font-medium">
                        Profile
                      </span>
                    </div>

                    <div className="group flex items-center ml-4 gap-3 px-4 py-3 cursor-pointer
                    border-l-4 border-l-transparent
                    transition-all duration-200
                    hover:bg-[#DBEAFA] hover:border-l-[#0F172A]">
                      {/* <Cog6ToothIcon className="w-5 h-5 text-white group-hover:text-[#0F172A]" /> */}
                      <span className="text-white group-hover:text-gray-800 font-medium">
                        Settings
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
