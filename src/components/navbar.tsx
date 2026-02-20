"use client";

import {
  Bell,
  LogOut,
  Menu,
  MoreVertical,
  Settings,
  Sun,
  Moon,
  AlignLeft,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import NavBarDropDown from "./navbardropdown";
import UserIcon from "./usericon";
import { useDispatch } from "react-redux";
import { AppDispatch, resetStore } from "@/redux/mainStore";
import { logout } from "@/features/slice/auth/authSlice";
import { useRouter } from "next/navigation";

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (showLogoutConfirm) {
      setUserMenuOpen(false);
      setMenuOpen(false);
    }
  }, [showLogoutConfirm]);

   const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });

    dispatch(logout()); // clear slice state
    resetStore(); // clear persisted state

    router.push("/");
  };

  const menuItems = [
    { icon: Bell, label: "Notification", iconClass: "text-[#2196f3]" },
    { icon: LogOut, label: "Logout", iconClass: "text-red-600", onClick:{handleLogout}},
    { icon: Settings, label: "Settings", iconClass: "text-[#2196f3]" },
    { icon: UserIcon, label: "Profile", text:'M' },
    { icon: Moon, label: "Dark Mode" },
  ];

 

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white text-black shadow-lg z-50">
        <div className=" flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1 rounded-md cursor-pointer transition-all">
              <img
                src="/assets/group-454.jpg"
                className="w-12 h-12"
                alt="Logo"
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
            <h1 className="text-blue-500 text-sm sm:text-base md:text-sm font-semibold">
              Harness ERP
            </h1>
          </div>
          <div className="flex items-center space-x-4 relative">
            <div className="hidden sm:flex items-center space-x-4 relative">
              <SearchBar />

              <span className="hidden md:block text-xs font-semibold text-gray-700">
                JJ Mills Bangladesh Private Limited (Fabric)
              </span>

              <div className="relative">
                <button
                  onClick={() => {
                    if (!showLogoutConfirm) {
                      setUserMenuOpen(!userMenuOpen);
                    }
                  }}
                >
                  <UserIcon size={28} />
                </button>

                {/* user dropdown */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 
                  bg-white text-gray-800 
                  rounded-xl shadow-2xl 
                  border border-gray-200 
                  p-2 z-[999]"
                  >
                    {menuItems.map((item, index) => (
                      <NavBarDropDown
                        key={index}
                        icon={item.icon}
                        labelClass={"text-xs font-semibold"}
                        label={item.label}
                        onClick={item.onClick}
                        iconClass={item.iconClass}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:hidden flex items-center space-x-2">
              <MoreVertical
                size={32}
                className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          </div>
        </div>

        <div className="sm:hidden flex items-center space-x-2 my-1">
          <div className="w-full mx-5">
            <SearchBar />
          </div>
        </div>

        {/* for mobile view */}
        {menuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-t-gray-200 z-[999]">
            <div className="flex flex-col p-2">
              {menuItems.map((item, index) => (
                <NavBarDropDown
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  iconClass={item.iconClass}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
