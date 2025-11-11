// src/components/SideBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Administration Module", href: "/dashboard", icon: "🏢" },
  { name: "IT Dept", href: "/it", icon: "💻" },
  { name: "IE Dept", href: "/ie", icon: "📐" },
  { name: "Production Dept", href: "/production", icon: "🏭" },
  { name: "Cutting Module", href: "/cutting", icon: "✂️" },
  { name: "Accounts Dept", href: "/accounts", icon: "📒" },
  { name: "HR & Payroll", href: "/hr", icon: "👩‍💼" },
  { name: "Store & Inventory", href: "/inventory", icon: "📦" },
  { name: "Purchase Dept", href: "/purchase", icon: "🧾" },
  { name: "Sales & Marketing", href: "/sales", icon: "📣" },
  { name: "Dispatch Dept", href: "/dispatch", icon: "🚚" },
  { name: "Quality Control", href: "/qc", icon: "🧪" },
  { name: "Maintenance Dept", href: "/maintenance", icon: "🛠️" },
  { name: "Security Dept", href: "/security", icon: "🔐" },
  { name: "Training Dept", href: "/training", icon: "🎓" },
  { name: "R&D Dept", href: "/rnd", icon: "🔬" },
  { name: "Cafeteria / Canteen", href: "/canteen", icon: "🍽️" },
  { name: "Transport", href: "/transport", icon: "🚌" },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header - Fixed */}
      <div className="flex h-16 items-center justify-center bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🏠</span>
          <div className="text-center">
            <h1 className="text-sm font-bold text-white leading-tight">
              Jay Jay Mills
            </h1>
            <p className="text-xs text-gray-300">Bangladesh Pvt Ltd</p>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable with hidden scrollbar */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "text-gray-300 hover:bg-gray-750 hover:text-white hover:translate-x-1"
                }`}
              >
                <span className="mr-3 text-lg flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0 border-t border-gray-700 p-4">
        <div className="text-center">
          <p className="text-xs text-gray-400">Harness ERP v1.0</p>
        </div>
      </div>
    </div>
  );
}
