// /src/app/dashboard/page.tsx
"use client";

import Link from "next/link";

export default function DashboardPage() {
  // ERP Modules based on your image
  const erpModules = [
    // Row 1 - Administration
    {
      name: "ADMINISTRATION",
      subModules: [
        {
          name: "IT DEPARTMENT",
          code: 1,
          icon: "💻",
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "IE DEPARTMENT",
          code: 2,
          icon: "📊",
          color: "from-green-500 to-green-600",
        },
        {
          name: "PRODUCTION DEPARTMENT",
          code: 3,
          icon: "🏭",
          color: "from-purple-500 to-purple-600",
        },
      ],
    },

    // Row 2 - Manufacturing
    {
      name: "MANUFACTURING",
      subModules: [
        {
          name: "CUTTING MODULES",
          code: 5,
          icon: "✂️",
          color: "from-red-500 to-red-600",
        },
        {
          name: "PRINTING MODULES",
          code: 6,
          icon: "🖨️",
          color: "from-orange-500 to-orange-600",
        },
        {
          name: "EMBROIDERY MODULES",
          code: 7,
          icon: "🧵",
          color: "from-pink-500 to-pink-600",
        },
        {
          name: "QUALITY MODULES",
          code: 8,
          icon: "✅",
          color: "from-teal-500 to-teal-600",
        },
      ],
    },

    // Row 3 - Quality & HR
    {
      name: "QUALITY & HR",
      subModules: [
        {
          name: "QMS MODULES",
          code: 9,
          icon: "📋",
          color: "from-indigo-500 to-indigo-600",
        },
        {
          name: "COMPLIANCE & HR MODULES",
          code: 10,
          icon: "👥",
          color: "from-yellow-500 to-yellow-600",
        },
        {
          name: "FGS MODULES",
          code: 11,
          icon: "📦",
          color: "from-lime-500 to-lime-600",
        },
        {
          name: "COMMON MODULES",
          code: 12,
          icon: "🔄",
          color: "from-cyan-500 to-cyan-600",
        },
      ],
    },

    // Row 4 - Design & Finance
    {
      name: "DESIGN & FINANCE",
      subModules: [
        {
          name: "CAD MODULES",
          code: 13,
          icon: "🎨",
          color: "from-violet-500 to-violet-600",
        },
        {
          name: "FINANCE MODULES",
          code: 14,
          icon: "💰",
          color: "from-emerald-500 to-emerald-600",
        },
        {
          name: "MERCHANDISING MODULES",
          code: 15,
          icon: "🛍️",
          color: "from-rose-500 to-rose-600",
        },
        {
          name: "BUSINESS INTELLIGENCE",
          code: 16,
          icon: "📈",
          color: "from-amber-500 to-amber-600",
        },
      ],
    },

    // Row 5 - System
    {
      name: "SYSTEM",
      subModules: [
        {
          name: "ADMIN",
          code: 17,
          icon: "⚙️",
          color: "from-gray-500 to-gray-600",
        },
        {
          name: "MAINTENANCE",
          code: 18,
          icon: "🔧",
          color: "from-slate-500 to-slate-600",
        },
      ],
    },
  ];

  // Quick stats for the header
  const quickStats = [
    { label: "Active Orders", value: "1,234", trend: "+12%" },
    { label: "Pending Tasks", value: "56", trend: "-5%" },
    { label: "Today's Production", value: "89%", trend: "+3%" },
    { label: "System Health", value: "98%", trend: "Stable" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        {/* <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ERP Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome to your enterprise management system
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last sync</p>
              <p className="text-sm font-medium text-gray-700">Just now</p>
            </div>
          </div>
        </div> */}

        {/* Quick Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="flex items-baseline justify-between mt-2">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <span
                  className={`text-xs font-medium ${
                    stat.trend.includes("+")
                      ? "text-green-500"
                      : stat.trend.includes("-")
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* ERP Modules Grid */}
      <div className="space-y-8">
        {erpModules.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Category Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
              <h2 className="text-xl font-bold text-white">{category.name}</h2>
            </div>

            {/* Modules Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.subModules.map((module, moduleIndex) => (
                  <Link
                    key={module.code}
                    href={`/module/${module.code}`}
                    className="group block"
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 group-hover:scale-105">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${module.color} shadow-md`}
                        >
                          <span className="text-2xl text-white">
                            {module.icon}
                          </span>
                        </div>
                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{module.code}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                        {module.name}
                      </h3>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Click to access
                        </span>
                        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Harness ERP System v1.0 • {new Date().getFullYear()} • All modules are
          securely integrated
        </p>
      </div>
    </div>
  );
}
