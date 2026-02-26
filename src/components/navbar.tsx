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
  KeyRound,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./searchbar";
import NavBarDropDown from "./navbardropdown";
import UserIcon from "./usericon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, resetStore, RootState } from "@/redux/mainStore";
import { logout } from "@/features/slice/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Popup from "./popup";

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
  const user = useSelector((state: RootState) => state.authSlice.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showLogoutConfirm) {
      setUserMenuOpen(false);
      setMenuOpen(false);
    }
  }, [showLogoutConfirm]);
  const handleOpenPopup = () => {
    setUserMenuOpen(false);
    setMenuOpen(false);
    setOpenPopup(true);
  };
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setOpenPopup(false);
    // dispatch(logout()); // clear slice state
    resetStore(); // clear persisted state
    router.push("/");
  };

  useEffect(() => {
    if (!userMenuOpen && !menuOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [userMenuOpen, menuOpen]);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const isDark =
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      if (isDark) document.documentElement.classList.add("dark");
      return isDark;
    }
    return false;
  });

  useEffect(() => {
    // Sync effect for theme changes from other tabs/windows
    const handleStorageChange = () => {
      const isDark = localStorage.getItem("theme") === "dark";
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
      // if (!showLogoutConfirm) {
      setUserMenuOpen(false);
      // }
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
      setUserMenuOpen(false);
    }
  };
  const hanldeForget = () => {
    router.push("/forgetPassword");
  };
  const menuItems = [
    {
      icon: KeyRound,
      label: "Reset Password",
      iconClass: "text-[#2196f3]",
      onClick: hanldeForget,
    },
    { icon: Bell, label: "Notification", iconClass: "text-[#2196f3]" },
    {
      icon: LogOut,
      label: "Logout",
      iconClass: "text-red-600",
      onClick: handleOpenPopup,
    },
    {
      icon: Settings,
      label: "Settings",
      iconClass: "text-[#2196f3]",
    },

    {
      icon: UserIcon,
      label: user?.userName,
      text: user?.userName.charAt(0)?.toUpperCase(),
      iconClass: "text-gray-600 dark:text-yellow-400",
    },
    {
      icon: darkMode ? Sun : Moon,
      label: darkMode ? "Light Mode" : "Dark Mode",
      onClick: toggleDarkMode,
      iconClass: "text-gray-600 dark:text-yellow-400",
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 text-black shadow-lg dark:shadow-blue-500/10 z-50 py-2 px-2">
        <div className=" flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1 rounded-md cursor-pointer transition-all">
              <Image
                src="/Group 454.svg"
                alt="Logo"
                width={30}
                height={30}
                priority
                //  className="ml-1"
                onClick={() => setCollapsed((prev) => !prev)}
              />
            </div>
            <h1 className="text-blue-400 text-sm sm:text-base md:text-sm font-semibold">
              Harness ERP
            </h1>
          </div>
          <div className="flex items-center relative">
            <div className="hidden sm:flex items-center space-x-4 relative">
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 dark:text-yellow-400 transition-all"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <SearchBar />

              <span className="hidden md:block text-xs font-semibold text-black-700 dark:text-white">
                JJ Mills Bangladesh Private Limited (Fabric)
              </span>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => {
                    if (!showLogoutConfirm) {
                      setUserMenuOpen(!userMenuOpen);
                    }
                  }}
                >
                  <UserIcon
                    size={34}
                    text={
                      user?.userName?.charAt(0)?.toUpperCase() || "djhasjdja"
                    }
                  />
                </button>

                {/* user dropdown */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 
                  bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                  rounded-xl shadow-2xl 
                  border border-gray-200 dark:border-gray-500
                  p-2 z-[999]"
                  >
                    <div className="px-3 mb-2 border-b border-b-gray-100 dark:border-b-gray-600">
                      <div className="flex gap-2 items-start">
                        <UserIcon size={30} />

                        <div className="flex flex-col">
                          <span className="text-xs font-semibold dark:text-white">
                            {user?.userName}
                          </span>
                          <span className="text-[11px] text-gray-500 dark:text-white">
                            Executive Manager
                          </span>
                          <span className="text-[11px] text-gray-500 dark:text-white">
                            admin@gmail.com
                          </span>
                        </div>
                      </div>
                    </div>
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
          <div className="sm:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-xl border-t border-t-gray-200 z-[999]">
            <div className="px-3 m-2 border-b border-b-gray-100">
              <div className="flex gap-2 items-start">
                <UserIcon size={30} />

                <div className="flex flex-col">
                  <span className="text-xs font-semibold dark:text-white">
                    {user?.userName}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-white">
                    Executive Manager
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-white">
                    admin@gmail.com
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2">
              {menuItems.map((item, index) => (
                <NavBarDropDown
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  iconClass={item.iconClass}
                  onClick={item.onClick}
                />
              ))}
            </div>
          </div>
        )}
        {openPopup && (
          <Popup
            text={"Are you sure you want to logout?"}
            setOpenPopup={setOpenPopup}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </>
  );
}
