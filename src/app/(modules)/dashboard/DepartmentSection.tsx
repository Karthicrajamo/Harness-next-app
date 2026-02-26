"use client";
import React from "react";
import CommonModuleCard from "@/components/CommonModuleCard/CommonModuleCard";
import "@/components/sidebar.css"

type DepartmentSectionProps = {
  title: string;
  modules: any[];
  fullWidth?: boolean;
};

export default function DepartmentSection({
  title,
  modules,
  fullWidth = false,
}: DepartmentSectionProps) {
  return (
    <div
      className={`
        
        ${fullWidth ? "col-span-2" : ""}
        rounded-2xl
        bg-white dark:bg-gray-800
        shadow-md
        border border-gray-200 dark:border-gray-700
        overflow-hidden
      `}
    >
      <div className="my-card-gradient border-l-[6px] rounded-bl-[8px] border-blue-500 px-4 py-3 font-semibold text-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
        {title}
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[250px] overflow-y-auto">
        {modules.map((item, index) => (
          <CommonModuleCard
            key={index}
            title={item.title}
            icon={item.icon}
            color={item.color}
            onClick={() => console.log(item.title)}
          />
        ))}
      </div>
    </div>
  );
}