
"use client";
import React from "react";

type CommonModuleCardProps = {
  title: string;
  icon: React.ElementType;
  color: string;
  onClick?: () => void;
};

export default function CommonModuleCard({
  title,
  icon: Icon,
  color,
  onClick,
}: CommonModuleCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        flex items-center gap-3
       p-2
        rounded-xl
        cursor-pointer
        border border-gray-200 dark:border-gray-600
        bg-gray-50 dark:bg-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-600
        hover:shadow-md
        transition-all duration-200
      "
    >

      <div
        className={`
          w-6 h-6 flex items-center justify-center
          rounded-lg text-lg
          ${color}
        `}
      >
        <Icon size={16} />
      </div>

      <span className="text-sm font-semibold text-gray-800 dark:text-white">
        {title}
      </span>
    </div>
  );
}