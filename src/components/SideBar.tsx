"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Scissors,
  ClipboardList,
  CheckSquare,
  Settings,
  ChevronRight,
  ChevronLeft,
  Monitor,
  BarChart3,
  Factory,
  TrendingUp,
  Clock,
  Package,
  Printer,
  Calendar,
  FileText,
  Users,
  RefreshCw,
  Layers,
  Target,
  Wrench,
  X,
  ArrowRight,
} from "lucide-react";

export default function SideBar({ open, onClose }) {
  const pathname = usePathname();
  const [hoveredModule, setHoveredModule] = useState(null);
  const [clickedModule, setClickedModule] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [isMouseOverPopup, setIsMouseOverPopup] = useState(false);
  const sidebarRef = useRef(null);
  const hoverPopupRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const menuData = [
    {
      title: "Home",
      icon: <Home className="w-5 h-5" />,
      link: "/dashboard",
      sub: [],
    },
    {
      title: "Cutting Modules",
      icon: <Scissors className="w-5 h-5" />,
      sub: [
        {
          name: "Cut Panel Bundle Audit",
          link: "/cutting/bundle-audit",
          icon: <Monitor className="w-4 h-4" />,
          description: "Audit and manage panel bundles",
        },
        {
          name: "Daily Cutting CPI",
          link: "/cutting/daily-cpi",
          icon: <BarChart3 className="w-4 h-4" />,
          description: "Daily cutting performance indicators",
        },
        {
          name: "CPI QR Code Building Report",
          link: "/cutting/cpi-qr-report",
          icon: <Factory className="w-4 h-4" />,
          description: "QR code building reports",
        },
        {
          name: "Style Sys ID Tracking",
          link: "/cutting/style-tracking",
          icon: <TrendingUp className="w-4 h-4" />,
          description: "Track style system IDs",
        },
        {
          name: "Bundle Operation",
          link: "/cutting/bundle-operation",
          icon: <Clock className="w-4 h-4" />,
          description: "Manage bundle operations",
        },
      ],
    },
    {
      title: "IE Department",
      icon: <ClipboardList className="w-5 h-5" />,
      sub: [
        {
          name: "Style Operation",
          link: "/ie/style-operation",
          icon: <Package className="w-4 h-4" />,
          description: "Style operation management",
        },
        {
          name: "Operation Master",
          link: "/ie/operation-master",
          icon: <Printer className="w-4 h-4" />,
          description: "Master operation settings",
        },
        {
          name: "IE Report",
          link: "/ie/ie-report",
          icon: <FileText className="w-4 h-4" />,
          description: "IE department reports",
        },
        {
          name: "Daily Forecast Report",
          link: "/ie/daily-forecast",
          icon: <Calendar className="w-4 h-4" />,
          description: "Daily production forecasts",
        },
        {
          name: "QR Operation Reports",
          link: "/ie/qr-reports",
          icon: <CheckSquare className="w-4 h-4" />,
          description: "QR operation reports",
        },
        {
          name: "Manpower Lost Time",
          link: "/ie/manpower-lost",
          icon: <Users className="w-4 h-4" />,
          description: "Track manpower lost time",
        },
      ],
    },
    {
      title: "Quality Modules",
      icon: <CheckSquare className="w-5 h-5" />,
      sub: [
        {
          name: "AQL Forms",
          link: "/quality/aql-forms",
          icon: <FileText className="w-4 h-4" />,
          description: "Acceptance Quality Level forms",
        },
        {
          name: "All Quality Check Forms",
          link: "/quality/all-forms",
          icon: <Users className="w-4 h-4" />,
          description: "All quality check forms",
        },
        {
          name: "Quality Report",
          link: "/quality/report",
          icon: <Package className="w-4 h-4" />,
          description: "Quality department reports",
        },
        {
          name: "Rework",
          link: "/quality/rework",
          icon: <RefreshCw className="w-4 h-4" />,
          description: "Rework tracking and management",
        },
        {
          name: "Fabric Inspection Report",
          link: "/quality/fabric-inspection",
          icon: <Layers className="w-4 h-4" />,
          description: "Fabric inspection reports",
        },
        {
          name: "Inline Quality Audit Report",
          link: "/quality/inline-audit",
          icon: <Target className="w-4 h-4" />,
          description: "Inline quality audit reports",
        },
      ],
    },
    {
      title: "System",
      icon: <Settings className="w-5 h-5" />,
      sub: [
        {
          name: "User Management",
          link: "/system/user-management",
          icon: <Users className="w-4 h-4" />,
          description: "Manage system users",
        },
        {
          name: "System Configuration",
          link: "/system/configuration",
          icon: <Settings className="w-4 h-4" />,
          description: "System configuration settings",
        },
        {
          name: "Maintenance",
          link: "/system/maintenance",
          icon: <Wrench className="w-4 h-4" />,
          description: "System maintenance tools",
        },
      ],
    },
  ];

  const handleMouseEnterModule = (index) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Only show hover popup for modules with submodules
    if (index > 0 && menuData[index].sub.length > 0) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredModule(index);
      }, 100);
    }
  };

  const handleMouseLeaveModule = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Only close if mouse is not over the popup
    if (!isMouseOverPopup) {
      closeTimeoutRef.current = setTimeout(() => {
        setHoveredModule(null);
      }, 200);
    }
  };

  const handlePopupMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsMouseOverPopup(true);
  };

  const handlePopupMouseLeave = () => {
    setIsMouseOverPopup(false);
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredModule(null);
    }, 200);
  };

  const handleModuleClick = (index) => {
    if (index === 0) {
      // Home - just navigate, no full screen
      setClickedModule(null);
      setShowFullScreen(false);
      return;
    }

    setClickedModule(index);
    setShowFullScreen(true);
    setHoveredModule(null); // Close hover popup when clicking
  };

  const handleHomeClick = () => {
    setClickedModule(null);
    setHoveredModule(null);
    setShowFullScreen(false);
  };

  const closeFullScreen = () => {
    setShowFullScreen(false);
    setClickedModule(null);
  };

  const isHomeActive = pathname === "/dashboard" || pathname === "/";

  // Close sidebar when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target.closest('button[aria-label="Toggle menu"]') === null
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  // Close hover popup when clicking outside
  useEffect(() => {
    const handleClickOutsidePopup = (event) => {
      if (
        hoverPopupRef.current &&
        !hoverPopupRef.current.contains(event.target) &&
        !event.target.closest(".sidebar-module-button")
      ) {
        setHoveredModule(null);
      }
    };

    if (hoveredModule !== null) {
      document.addEventListener("mousedown", handleClickOutsidePopup);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopup);
    };
  }, [hoveredModule]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onClose();
      setShowFullScreen(false);
      setClickedModule(null);
      setHoveredModule(null);
    }
  };

  return (
    <>
      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white shadow-2xl
          transform transition-transform duration-300 flex flex-col z-30
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-blue-800 border-b border-blue-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-blue-800 font-bold text-sm">JJ</span>
            </div>
            <h1 className="text-sm font-bold truncate">Harness ERP</h1>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-white hover:text-blue-200 p-1 rounded-lg hover:bg-blue-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* <div className="p-2 border-t border-blue-300 bg-gradient-to-r from-blue-300 to-blue-900">
          <div className="text-center">
            <p className="text-xs text-white-100 font-medium">Modules</p>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto bg-gradient-to-r from-blue-400 to-white-300">
          {menuData.map((module, index) => {
            // Skip the Home module (index 0)
            if (index === 0) return null;

            return (
              <div
                key={index}
                className="relative sidebar-module-button"
                onMouseEnter={() => handleMouseEnterModule(index)}
                onMouseLeave={handleMouseLeaveModule}
              >
                {/* Other modules with dropdown */}
                <button
                  onClick={() => handleModuleClick(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 border border-transparent sidebar-module-button ${
                    clickedModule === index || hoveredModule === index
                      ? "bg-gradient-to-r from-blue-600 to-blue-300 text-white border-l-4 border-yellow-400 shadow-md"
                      : "hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 text-blue-100 hover:border-blue-500"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-1 rounded ${
                        clickedModule === index || hoveredModule === index
                          ? "bg-white/20"
                          : ""
                      }`}
                    >
                      {module.icon}
                    </div>
                    <span className="text-sm font-medium">{module.title}</span>
                  </div>
                  {module.sub.length > 0 && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        clickedModule === index ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Version Panel */}
        <div className="p-4 border-t border-blue-300 bg-gradient-to-r from-blue-300 to-blue-900">
          <div className="text-center">
            <p className="text-xs text-white-300 font-medium">Harness ERP</p>
            <p className="text-xs text-white-300">v 1.0.0</p>
          </div>
        </div>
      </div>

      {/* Hover Popup Overlay on Dashboard Screen */}
      {hoveredModule !== null && menuData[hoveredModule]?.sub.length > 0 && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div
            ref={hoverPopupRef}
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
            className="absolute top-18 left-[calc(15rem+8px)] w-[260px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden pointer-events-auto"
            style={{
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Simple compact popup */}
            <div className="py-1 max-h-[430px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {menuData[hoveredModule]?.sub.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.link}
                  onClick={handleLinkClick}
                  className="group block"
                >
                  <div className="px-3 py-2.5 hover:bg-blue-50 active:bg-blue-100 transition-colors border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="p-1.5 bg-blue-50 rounded group-hover:bg-blue-100 transition-colors flex-shrink-0">
                          {subItem.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors truncate">
                            {subItem.name}
                          </div>
                        </div>
                      </div>
                      {/* <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors ml-2 flex-shrink-0" /> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Simple footer */}
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">
                  {menuData[hoveredModule]?.sub.length} modules available
                </span>
                <button
                  onClick={() => setHoveredModule(null)}
                  className="text-gray-500 hover:text-gray-700 text-xs px-2 py-1 hover:bg-gray-200 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Submodules Overlay - Dashboard Style */}
      {showFullScreen && clickedModule !== null && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 z-40 flex flex-col">
          {/* Fixed Header with equal spacing */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div className="w-full px-6 py-4">
              <div className="flex items-center">
                {/* Left Section - Takes 1/3 */}
                <div className="flex-1 flex items-center">
                  <button
                    onClick={closeFullScreen}
                    className="flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-colors mr-3"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center">
                    <span className="text-gray-800 font-bold text-lg">
                      Harness ERP
                    </span>
                    <span className="text-gray-800 mx-2 font-bold text-lg">
                      ›
                    </span>

                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-blue-50 rounded">
                        {menuData[clickedModule]?.icon}
                      </div>
                      <span className="font-medium text-gray-800 text-lg">
                        {menuData[clickedModule]?.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Takes 1/3 */}
                <div className="flex-1 flex items-center justify-end">
                  <div className="mr-4">
                    <div className="text-right">
                      <span className="text-gray-600 text-xs">
                        {menuData[clickedModule]?.sub.length} Modules Available
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={closeFullScreen}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuData[clickedModule]?.sub.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.link}
                    onClick={() => {
                      handleLinkClick();
                      closeFullScreen();
                    }}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 h-full">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors flex-shrink-0">
                          {subItem.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-base group-hover:text-blue-600 transition-colors mb-1">
                            {subItem.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {subItem.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="mt-auto bg-white border-t border-gray-200">
            <div className="w-full px-6 py-4">
              <div className="text-center text-gray-500 text-sm">
                <p>
                  Harness ERP System • © {new Date().getFullYear()} • All
                  modules are securely integrated
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
