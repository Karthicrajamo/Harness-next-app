"use client";
import React, { useState } from "react";
import { InputProps } from "@/app/ts_types/commonComponent_types";
import { Eye, EyeOff } from "lucide-react";

const InputText: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
  error,
  className = "",
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          onBlur={onBlur}
          className={`w-full px-3 py-2 border  outline-none transition
          focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${isPassword ? "pr-10" : ""}
          ${className}`}
        />


        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default InputText;
