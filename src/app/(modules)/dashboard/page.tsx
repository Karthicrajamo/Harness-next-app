"use client";

import React, { useEffect, useState } from "react";
import DepartmentSection from "./DepartmentSection";
import "@/components/sidebar.css";
import { qualityModules, cuttingModules, iEDepartmentModules } from "./data";
import { useRouter, usePathname } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [recentTabs, setRecentTabs] = useState<
    { label: string; path: string }[]
  >([]);

  useEffect(() => {
    const loadRecentTabs = () => {
      const stored = sessionStorage.getItem("recentTabs");
      setRecentTabs(stored ? JSON.parse(stored) : []);
    };

    loadRecentTabs();

    window.addEventListener("recentTabsUpdated", loadRecentTabs);

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("recentTabs");
    });

    return () => {
      window.removeEventListener("recentTabsUpdated", loadRecentTabs);
    };
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
      <div className="col-span-1 md:col-span-2 mt-3 md:mt-0 mb-2 md:mb-0 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="my-card-gradient border-l-[6px] border-blue-500 px-4 py-3 rounded-bl-[8px] font-semibold text-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
          Recent Tabs
        </div>

        <div className="px-4 py-6 bg-white dark:bg-gray-700">
          {recentTabs.length === 0 ? (
            <p className="text-gray-400 dark:text-gray-300 text-center">
              No recent tabs yet
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {recentTabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => router.push(tab.path)}
                  className="cursor-pointer px-4 py-2 bg-blue-100 text-black rounded-lg text-sm font-semibold hover:bg-blue-200 transition"
                >
                  {tab.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <DepartmentSection title="Quality Modules" modules={qualityModules} />
      </div>

      <div>
        <DepartmentSection
          title="Cutting Department"
          modules={cuttingModules}
        />
      </div>

      <div>
        <DepartmentSection
          title="IE Department"
          modules={iEDepartmentModules}
        />
      </div>

      <div>
        <DepartmentSection
          title="Style Operation"
          modules={iEDepartmentModules}
        />
      </div>
    </div>
  );
}
