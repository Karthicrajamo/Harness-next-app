import React, { ReactNode } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiMessageSquare,
  FiCalendar,
  FiSettings,
  FiHelpCircle,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";
import "primeicons/primeicons.css";

// --- 1. Type Definitions ---

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

// --- 2. Navigation Data ---

const navigation: NavItem[] = [
  // { name: "Tickets", href: "/", icon: FiClipboard, current: true },
  // { name: "Search", href: "/search", icon: FiSearch, current: false },
  // { name: "Emails", href: "/emails", icon: FiMessageSquare, current: false },
  // { name: "Calendar", href: "/calendar", icon: FiCalendar, current: false },
  { name: "Users", href: "/users", icon: FiUsers, current: false },
  { name: "Help", href: "/help", icon: FiHelpCircle, current: false },
  { name: "Settings", href: "/settings", icon: FiSettings, current: false },
];

// --- 3. Sidebar Component ---

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50 relative">
    {/* Sidebar */}
    <div className="group flex flex-col w-16 hover:w-64 bg-white border-r border-gray-200 fixed top-0 left-0 min-h-screen z-10 transition-all duration-300 ease-in-out">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 ">
        {/* <span className="text-xl font-bold text-gray-800 hidden group-hover:block">
          Harness App
        </span> */}
        <span className="block group-hover:hidden text-xl font-bold text-gray-800">
          <i className="pi pi-slack" style={{ color: "black" }}></i>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center p-1 group-hover:p-3 rounded-lg text-sm font-medium transition-all duration-200
              ${
                item.current
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
            aria-current={item.current ? "page" : undefined}
          >
            <item.icon className="h-5 w-5 min-w-[20px]" aria-hidden="true" />
            <span className="hidden group-hover:inline ml-3 whitespace-nowrap">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer (User Profile) */}
      <div className="p-4 border-t border-gray-200 hidden group-hover:block transition-all duration-300">
        <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="text-sm font-medium text-gray-700">Admin</div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div
      className="
        flex-1 transition-all duration-300 ease-in-out
        ml-16 group-hover:ml-64 bg-white
      "
    >
      <main className="flex-1">{children}</main>
    </div>
  </div>
);

// --- 4. Dashboard Layout Wrapper ---

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <Sidebar>{children}</Sidebar>;
};

export default DashboardLayout;
