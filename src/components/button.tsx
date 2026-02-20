"use client";
import React from "react";
import { ButtonProps } from "@/app/ts_types/commonComponent_types";
import "primeicons/primeicons.css";

const ButtonCommon: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
}) => {
  const baseStyle =
    "font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center ";

  const variantStyle = {
    primary:
      "bg-[#2196f3] text-white hover:bg-[#1976d2] focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeStyle = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyle}
        ${variantStyle[variant]}
        ${sizeStyle[size]}
        ${fullWidth ? "w-full justify-between" : "justify-center gap-2"}
        ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {/* Left Icon */}
      {icon && iconPosition === "left" && !loading && (
        <i className={icon}></i>
      )}

      {/* Label */}
      <span className="flex-1 text-center">
        {loading ? "Authenticating..." : label}
      </span>

      {/* Right Icon */}
      {icon && iconPosition === "right" && !loading && (
        <i className={icon}></i>
      )}

      {/* Loading Spinner */}
      {loading && (
        <i className="pi pi-spinner pi-spin ml-2"></i>
      )}
    </button>
  );
};

export default ButtonCommon;