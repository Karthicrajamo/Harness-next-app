"use client";

import {
  Monitor,
  BarChart3,
  Factory,
  TrendingUp,
  ClipboardCheck,
  Clock,
  Package,
  Printer,
  Scissors,
  Calendar,
  CheckSquare,
  FileText,
  Settings,
  Wrench,
  Users,
  RefreshCw,
  Layers,
  Target,
  History,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  // const navigate = useNavigate();
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  // Track module clicks
  const handleModuleClick = (
    moduleName: any,
    categoryName: string,
    icon: any,
    route: any
  ) => {
    const newRecentlyUsed = [
      { name: moduleName, category: categoryName, icon, route },
      ...recentlyUsed.filter((item) => item.name !== moduleName),
    ].slice(0, 4);

    setRecentlyUsed(newRecentlyUsed);
    localStorage.setItem(
      "recentlyUsedModules",
      JSON.stringify(newRecentlyUsed)
    );
    console.log(`Navigating to ${moduleName}`);

    if (route) {
      navigate(route);
    }
  };

  // Load recently used from localStorage
  useEffect(() => {
    const savedRecentlyUsed = localStorage.getItem("recentlyUsedModules");
    if (savedRecentlyUsed) {
      setRecentlyUsed(JSON.parse(savedRecentlyUsed));
    }
  }, []);

  // ERP Modules data
  const erpModules = [
    {
      name: "RECENTLY USED",
      subModules:
        recentlyUsed.length > 0
          ? recentlyUsed.map((item) => ({
              name: item.name,
              icon: item.icon,
              category: item.category,
            }))
          : [
              {
                name: "No recently used modules",
                icon: <History className="w-7 h-7 text-gray-400" />,
                disabled: true,
              },
            ],
    },
    {
      name: "CUTTING MODULES",
      subModules: [
        {
          name: "CUT PANEL BUNDLE AUDIT",
          icon: <Monitor className="w-7 h-7 text-blue-600" />,
          route: "/cut-panel-audit-audit",
        },
        {
          name: "DAILY CUTTING CPI",
          icon: <BarChart3 className="w-7 h-7 text-green-600" />,
        },
        {
          name: "CPI QR CODE BUILDING REPORT",
          icon: <Factory className="w-7 h-7 text-orange-600" />,
        },
        {
          name: "STYLE SYS ID TRACKING",
          icon: <TrendingUp className="w-7 h-7 text-pink-600" />,
        },
        {
          name: "BUNDLE OPERATION",
          icon: <Clock className="w-7 h-7 text-yellow-600" />,
        },
      ],
    },
    {
      name: "IE DEPARTMENT",
      subModules: [
        {
          name: "STYLE OPERATION",
          icon: <Package className="w-7 h-7 text-red-600" />,
        },
        {
          name: "OPERATION MASTER",
          icon: <Printer className="w-7 h-7 text-blue-600" />,
        },
        {
          name: "IE REPORT",
          icon: <Scissors className="w-7 h-7 text-pink-600" />,
        },
        {
          name: "DAILY FORECAST REPORT",
          icon: <Calendar className="w-7 h-7 text-green-600" />,
        },
        {
          name: "QR OPERATION REPORTS",
          icon: <CheckSquare className="w-7 h-7 text-teal-600" />,
        },
        {
          name: "MANPOWER LOST TIME",
          icon: <FileText className="w-7 h-7 text-pink-600" />,
        },
      ],
    },
    {
      name: "QUALITY MODULES",
      subModules: [
        {
          name: "AQL FORMS",
          icon: <FileText className="w-7 h-7 text-indigo-600" />,
        },
        {
          name: "ALL QUALITY CHECK FORMS",
          icon: <Users className="w-7 h-7 text-yellow-600" />,
        },
        {
          name: "QUALITY REPORT",
          icon: <Package className="w-7 h-7 text-lime-600" />,
        },
        {
          name: "REWORK",
          icon: <RefreshCw className="w-7 h-7 text-cyan-600" />,
        },
        {
          name: "FABRIC INSPECTION REPORT",
          icon: <Layers className="w-7 h-7 text-blue-600" />,
        },
        {
          name: "INLINE QUALITY AUDIT REPORT",
          icon: <Target className="w-7 h-7 text-orange-600" />,
        },
      ],
    },
    {
      name: "SYSTEM",
      subModules: [
        {
          name: "ADMIN",
          icon: <Settings className="w-7 h-7 text-gray-600" />,
        },
        {
          name: "MAINTENANCE",
          icon: <Wrench className="w-7 h-7 text-slate-600" />,
        },
      ],
    },
  ];

  const maxPerRow = 4;

  const splitSubModules = (subModules) => {
    const rows = [];
    for (let i = 0; i < subModules.length; i += maxPerRow) {
      rows.push(subModules.slice(i, i + maxPerRow));
    }
    return rows;
  };

  return (
    <div className="p-6">
      {/* ERP Modules Grid */}
      <div className="space-y-6">
        {erpModules.map((category, categoryIndex) => {
          if (category.name === "RECENTLY USED") {
            return (
              <div
                key={categoryIndex}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-b border-blue-100">
                  <h2 className="text-lg font-bold text-blue-500 flex items-center">
                    <History className="w-5 h-5 mr-2" />
                    {category.name}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="relative">
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                      {category.subModules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="flex-shrink-0 w-72">
                          <button
                            onClick={() =>
                              !module.disabled &&
                              handleModuleClick(
                                module.name,
                                category.name,
                                module.icon,
                                module.route
                              )
                            }
                            className={`group block w-full ${
                              module.disabled
                                ? "cursor-default"
                                : "cursor-pointer"
                            }`}
                            disabled={module.disabled}
                          >
                            <div
                              className={`bg-gradient-to-br from-white to-gray-50 rounded-lg border p-4 ${
                                module.disabled
                                  ? "border-gray-100 opacity-60"
                                  : "border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
                              } h-full`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  {module.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-blue-600 transition-colors flex-1 text-left">
                                  {module.name}
                                </h3>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          const moduleRows = splitSubModules(category.subModules);
          const hasMultipleRows = moduleRows.length > 1;

          return (
            <div
              key={categoryIndex}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-700">
                  {category.name}
                  {hasMultipleRows && (
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      {category.subModules.length}
                    </span>
                  )}
                </h2>
              </div>
              <div className="p-4">
                {hasMultipleRows ? (
                  <div className="space-y-4">
                    {moduleRows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                      >
                        {row.map((module, moduleIndex) => (
                          <div key={moduleIndex}>
                            <button
                              onClick={() =>
                                handleModuleClick(
                                  module.name,
                                  category.name,
                                  module.icon,
                                  module.route
                                )
                              }
                              className="group block w-full"
                            >
                              <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 h-full">
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0">
                                    {module.icon}
                                  </div>
                                  <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-blue-600 transition-colors flex-1 text-left">
                                    {module.name}
                                  </h3>
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                      {category.subModules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="flex-shrink-0 w-64">
                          <button
                            onClick={() =>
                              handleModuleClick(
                                module.name,
                                category.name,
                                module.icon,
                                module.route
                              )
                            }
                            className="group block w-full"
                          >
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 h-full">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  {module.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-blue-600 transition-colors flex-1 text-left">
                                  {module.name}
                                </h3>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Harness ERP System v1.0.0 • {new Date().getFullYear()} • All modules
          are securely integrated
        </p>
      </div>
    </div>
  );
}
