"use client";

import { useState, JSX, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./sidebar.css";

import { Clipboard, Home, ScissorsIcon, Settings, Users2 } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

interface MenuItem {
  label: string;
  path?: string;
  subMenu?: MenuItem[];
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { label: "DASHBOARD", path: "/dashboard" },
    {
      label: "CUTTING MODULES",
      subMenu: [{ label: "QR CODE BUILDING MODULES", path: "/cutting" }],
    },
    {
      label: "IE DEPARTMENTS",
      subMenu: [
        { label: "OPERATION MASTER", path: "/operationmaster" },
        {
          label: "OPERATION WISE HOURLY PRODUCTION REPORTS",
          path: "/iedepartments/operationwisehourly",
        },
      ],
    },
    {
      label: "QUALITY MODULES",
      subMenu: [
        { label: "AQL FORMS", path: "/qualitymodules/aqlforms" },
        { label: "QUALITY REPORTS", path: "/qualitymodules/qualityreports" },
      ],
    },
  ];

  const iconMap: Record<string, JSX.Element> = {
    DASHBOARD: <Home className="w-4 h-4 text-gray-700 dark:text-gray-300" />,
    "CUTTING MODULES": (
      <ScissorsIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
    ),
    "IE DEPARTMENTS": (
      <Users2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
    ),
    "QUALITY MODULES": (
      <Clipboard className="w-4 h-4 text-gray-700 dark:text-gray-300" />
    ),
    "OPERATION MASTER": <Settings className="w-4 h-4 text-[#2196f3]" />,
  };

  // const handleLinkClick = (path?: string, label?: string) => {
  //   if (path) {
  //     setOpenSubMenu(null); 
  //     router.push(path);
  //   } else if (label) {
  //     setOpenSubMenu(openSubMenu === label ? null : label);
  //   }
  // };
  const addToRecentTabs = (label: string, path: string) => {
    const existing = sessionStorage.getItem("recentTabs");
    let recentTabs = existing ? JSON.parse(existing) : [];

    recentTabs = recentTabs.filter((item: any) => item.path !== path);
    recentTabs.unshift({ label, path });
    recentTabs = recentTabs.slice(0, 5);

    sessionStorage.setItem("recentTabs", JSON.stringify(recentTabs));

    window.dispatchEvent(new Event("recentTabsUpdated"));
  };

  const handleLinkClick = (path?: string, label?: string) => {
    if (path && label) {
      addToRecentTabs(label, path);
      setOpenSubMenu(null);
      router.push(path);
    } else if (label) {
      setOpenSubMenu(openSubMenu === label ? null : label);
    }
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed left-0 top-0
        mt-24 md:mt-14
        h-[calc(100vh-6rem)] md:h-[calc(100vh-3.5rem)]
        w-52
        bg-white dark:bg-gray-800
        border-r border-gray-100 dark:border-gray-600
        shadow-xl dark:shadow-blue-500/10
        transform transition-transform duration-300 ease-in-out
        ${collapsed ? "translate-x-0" : "-translate-x-full"}
        z-50
      `}
    >
      <ul className="mt-4 px-2 relative">
        {menuItems.map((item) => {
          const isParentActive =
            item.path === pathname ||
            item.subMenu?.some((sub) => pathname.startsWith(sub.path || ""));

          const isOpen = openSubMenu === item.label; 

          return (
            <li key={item.label} className="relative mx-2 my-2">
              <button
                onClick={() => handleLinkClick(item.path, item.label)}
                
                className={`
  w-full text-left px-3 py-2 rounded-md text-xs
  transition-all cursor-pointer
                  ${
                    isParentActive
                      ? "my-gradient border-l-4 border-[#2196f3] dark:bg-gray-700 dark:text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  }
                `}
              >
                <div className={`flex gap-3 ${collapsed ? "w-full" : ""}`}>
                  {iconMap[item.label]}
                  {collapsed && (
                    <span className="text-xs font-semibold">{item.label}</span>
                  )}
                </div>
              </button>

              {item.subMenu && (
                <div
                  className={`
                    absolute left-full top-0 ml-2 w-64
                    bg-white dark:bg-gray-800
                    rounded-lg shadow-xl
                    transition-all duration-200
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                    z-50
                  `}
                  
                >
                  <div className="px-4 py-3">
                    <p className="text-xs font-semibold text-[#2196f3]">
                      {item.label}
                    </p>
                  </div>

                  <ul className="p-2 space-y-1">
                    {item.subMenu.map((sub) => {
                      const isSubActive = pathname.startsWith(sub.path || "");

                      return (
                        <li key={sub.label}>
                          <button
                           onClick={() => handleLinkClick(sub.path, sub.label)}
                            className={`
                              w-full text-left px-3 py-2 rounded-md text-xs
                              transition-all cursor-pointer
                              ${
                                isSubActive
                                  ? "bg-blue-200 text-blue-900 font-bold border-l-4 border-[#2196f3]"
                                  : "text-gray-700 font-semibold hover:bg-blue-100 hover:border-l-4 hover:border-[#2196f3]"
                              }
                            `}
                          >
                            {sub.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
