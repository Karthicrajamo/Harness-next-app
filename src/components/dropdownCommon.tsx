"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface OptionType {
  label: string;
  value: any;
}

interface DropDownCommonProps {
  data: OptionType[];
  placeholder?: string;
  handleChange: (item: OptionType) => void;
  selectedData?: OptionType | null;
  errorMessage?: string;
  editable?: boolean;
}

export default function DropDownCommon({
  data,
  placeholder = "Select",
  handleChange,
  selectedData = null,
  errorMessage,
  editable = false,
}: DropDownCommonProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        portalRef.current &&
        !portalRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const rect = dropdownRef.current?.getBoundingClientRect();

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (!editable) setOpen(!open);
        }}
        className={`flex justify-between items-center px-3 py-2 rounded-md border cursor-pointer
          ${
            errorMessage
              ? "border-red-500 bg-gray-100"
              : "border-gray-300 bg-white"
          }
          ${editable ? "cursor-not-allowed bg-gray-100" : ""}
        `}
      >
        <span
          className={`text-sm truncate ${
            selectedData ? "text-black" : "text-gray-400 italic"
          }`}
        >
          {selectedData ? selectedData.label : placeholder}
        </span>

        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>

      {open &&
        rect &&
        createPortal(
          <div
            ref={portalRef}
            onClick={(e) => e.stopPropagation()}  
            className="fixed z-[99999] bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
            style={{
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
            }}
          >
            {data.length === 0 ? (
              <div className="p-3 text-center text-gray-500 text-sm">
                No Records
              </div>
            ) : (
              data.map((item, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleChange(item);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selectedData?.value === item.value
                      ? "bg-gray-200 font-medium"
                      : ""
                  }`}
                >
                  {item.label}
                </div>
              ))
            )}
          </div>,
          document.body
        )}

      {errorMessage && (
        <p className="text-red-500 text-xs ">{errorMessage}</p>
      )}
    </div>
  );
}