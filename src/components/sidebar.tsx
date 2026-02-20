"use client";

import { useState, useEffect, JSX } from "react";
import { usePathname, useRouter } from "next/navigation";



import { Clipboard, ClipboardCheck, Home, ScissorsIcon, Settings, Users2 } from "lucide-react";

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
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { label: "DASHBOARD", path: "/dashboard" },
    {
      label: "CUTTING MODULES",
      subMenu: [
        {
          label: "QR CODE BUILDING MODULES",
          path: "/cuttingmodules/qrcodebuildingmodules",
        },
      ],
    },
    {
      label: "IE DEPARTMENTS",
      subMenu: [
        { label: "OPERATION MASTER", path: "/iedepartments/operationmaster" },
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
     DASHBOARD: <Home className="w-6 h-6 text-black" />,
    "CUTTING MODULES": <ScissorsIcon className="w-6 h-6 text-black" />,
     "IE DEPARTMENTS": <Users2 className="w-6 h-6 text-black" />,
     "QUALITY MODULES": <Clipboard className="w-6 h-6 text-black" />,
     "OPERATION MASTER": <Settings className="w-6 h-6 text-[#2196f3]" />,
  };

  useEffect(() => {
    const activeMenu = menuItems.find((item) =>
      item.subMenu?.some((sub) => sub.path === pathname)
    );
    if (activeMenu) setOpenSubMenu(activeMenu.label);
  }, [pathname]);

  const handleLinkClick = (path?: string, label?: string) => {
    if (path) {
      router.push(path);
      setOpenSubMenu(null);
    } else if (label) {
      setOpenSubMenu(openSubMenu === label ? null : label);
    }
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 mt-20 h-[calc(100vh-4rem)]
     ${collapsed ? "w-20 block" : "hidden"}
    text-gray-200 border-r bg-white shadow-xl
      `}
    >
      <ul className="mt-4 px-2 relative">
        {menuItems.map((item) => {
          const isOpen = openSubMenu === item.label;

          return (
            <li key={item.label} className="relative mx-2 my-2 border-b border-b-gray-100">
              {/* Parent Menu */}
              <button
                onClick={() => handleLinkClick(item.path, item.label)}
                className={`
                  flex items-center w-full px-3 py-2 rounded-lg
                  transition-all duration-200
                  ${
                    pathname === item.path
                      ? "bg-blue-100 text-white border-l-4 border-[#2196f3] border-b-1"
                      : "text-gray-300 hover:bg-blue-100 hover:text-white hover:border-l-4 hover:border-b-1 hover:border-[#2196f3]"
                  }
                `}
              >
                <div
                  className={`flex items-center gap-3 ${
                    collapsed ? "justify-center w-full" : ""
                  }`}
                >
                  {iconMap[item.label]}
                  {!collapsed && (
                    <span className="text-sm font-semibold text-black">
                      {item.label}
                    </span>
                  )}
                </div>
              </button>

              {/* Submenu Card */}
              { item.subMenu && (
                <div
                  className={`
                    absolute left-full top-0 ml-2 w-64
                     bg-white rounded-lg shadow-xl
                    transition-all duration-200
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                    z-50
                  `}
                >
                  {/* Card Title */}
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold  text-[#2196f3]">
                      {item.label}
                    </p>
                  </div>

                  {/* Card Items */}
                  <ul className="p-2 space-y-1">
                    {item.subMenu.map((sub) => (
                      <li key={sub.label}>
                        <button
                          onClick={() => handleLinkClick(sub.path)}
                          className={`
                            w-full text-left px-3 py-2 rounded-md text-sm
                            transition-colors cursor-pointer border-b border-b-gray-100
                            ${
                              pathname === sub.path
                                ? "bg-blue-100 text-black font-semibold hover:border-l-4 hover:border-b-1 hover:border-[#2196f3]"
                                : "text-black font-semibold hover:bg-blue-100 hover:border-l-4 hover:border-b-1 hover:border-[#2196f3]"
                            }
                          `}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
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
