// // "use client";

// // import React from "react";

// // interface OptionType {
// //   label: string;
// //   value: string | number;
// // }

// // interface DropdownCommonProps {
// //   label?: string;
// //   name?: string;
// //   value?: string | number;
// //   options: OptionType[];
// //   onChange: (value: string | number) => void;
// //   placeholder?: string;
// //   error?: string;
// //   disabled?: boolean;
// //   required?: boolean;
// // }

// // const DropdownCommon: React.FC<DropdownCommonProps> = ({
// //   label,
// //   name,
// //   value,
// //   options,
// //   onChange,
// //   placeholder = "Select an option",
// //   error,
// //   disabled = false,
// //   required = false,
// // }) => {
// //   return (
// //     <div className="w-full flex flex-col gap-1">
// //       {label && (
// //         <label className="text-sm font-medium text-gray-700">
// //           {label} {required && <span className="text-red-500">*</span>}
// //         </label>
// //       )}

// //       <select
// //         name={name}
// //         value={value ?? ""}
// //         disabled={disabled}
// //         onChange={(e) => onChange(e.target.value)}
// //         className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition
// //           ${
// //             error
// //               ? "border-red-500 focus:ring-red-400"
// //               : "border-gray-300 focus:ring-blue-500"
// //           }
// //           ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
// //         `}
// //       >
// //         <option value="" disabled>
// //           {placeholder}
// //         </option>

// //         {options.map((option) => (
// //           <option key={option.value} value={option.value}>
// //             {option.label}
// //           </option>
// //         ))}
// //       </select>

// //       {error && (
// //         <span className="text-xs text-red-500 mt-1">{error}</span>
// //       )}
// //     </div>
// //   );
// // };

// // export default DropdownCommon;


// "use client";

// import { useState, useRef, useEffect } from "react";

// interface DropDownCommonProps {
//   data: any[];
//   placeholder?: string;
//   handleChange: (item: any) => void;
//   selectedData?: string;
//   errorMessage?: string;
//   editable?: boolean;
//   optionLabel?: string;
//   headerLabel?: string;
//   locationResponse?: boolean;
//   isRequird?: boolean;
//   errorMessagText?: boolean;
//   isPlaceHolderBold?: boolean;
// }

// export default function DropDownCommon({
//   data,
//   placeholder = "Select",
//   handleChange,
//   selectedData,
//   errorMessage,
//   editable = false,
//   optionLabel,
//   headerLabel,
//   locationResponse = false,
//   isRequird = false,
//   errorMessagText = true,
//   isPlaceHolderBold = false,
// }: DropDownCommonProps) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const displayText =
//     selectedData && selectedData.length > 36
//       ? selectedData.slice(0, 36) + "..."
//       : selectedData;
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex items-start w-full relative" ref={dropdownRef}>
//       {headerLabel && (
//         <label className="w-1/4 text-sm text-gray-600 flex items-center">
//           {headerLabel}
//           {isRequird && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       <div className="w-3/4 relative">
//         <div
//           onClick={() => !editable && setOpen(!open)}
//           className={`flex justify-between items-center px-3 py-2 rounded-md border cursor-pointer transition
//           ${
//             errorMessage
//               ? "border-red-500 bg-gray-100"
//               : "border-gray-300 bg-white hover:border-gray-400"
//           }
//           ${editable ? "cursor-not-allowed bg-gray-100" : ""}
//           `}
//         >
//           <span
//             className={`text-sm truncate ${
//               selectedData || isPlaceHolderBold
//                 ? "text-black"
//                 : "text-gray-400 italic"
//             }`}
//           >
//             {selectedData ? displayText : placeholder}
//           </span>

//           <span
//             className={`transition-transform duration-200 ${
//               open ? "rotate-180" : ""
//             }`}
//           >
//             ▼
//           </span>
//         </div>
//         {open && (
//           <div
//             className={`absolute mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow-lg z-50
//             ${
//               errorMessage
//                 ? "border border-red-500 bg-gray-100"
//                 : "border border-gray-300 bg-white"
//             }`}
//           >
//             {data?.length === 0 ? (
//               <div className="p-3 text-center text-gray-500 text-sm">
//                 No Records
//               </div>
//             ) : (
//               data.map((item, index) => {
//                 const value = locationResponse
//                   ? item[optionLabel as string]
//                   : item;

//                 return (
//                   <div
//                     key={index}
//                     onClick={() => {
//                       handleChange(item);
//                       setOpen(false);
//                     }}
//                     className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
//                       ${
//                         selectedData === value
//                           ? "bg-gray-200 font-medium"
//                           : ""
//                       }
//                     `}
//                   >
//                     {value}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//         {errorMessage && errorMessagText && (
//           <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";

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
  headerLabel?: string;
  isRequird?: boolean;
}

export default function DropDownCommon({
  data,
  placeholder = "Select",
  handleChange,
  selectedData = null,
  errorMessage,
  editable = false,
  headerLabel,
  isRequird = false,
}: DropDownCommonProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ================= CLICK OUTSIDE CLOSE ================= */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= DISPLAY TEXT ================= */
  const displayText =
    selectedData?.label?.length > 36
      ? selectedData.label.slice(0, 36) + "..."
      : selectedData?.label;

  return (
    <div className="flex items-start w-full relative" ref={dropdownRef}>
     
      <div className="w-3/4 relative" style={{width:'100%'}}>
        {/* Selected Box */}
        <div
          onClick={() => !editable && setOpen(!open)}
          className={`flex justify-between items-center px-3 py-2 rounded-md border cursor-pointer transition
            ${
              errorMessage
                ? "border-red-500 bg-gray-100"
                : "border-gray-300 bg-white hover:border-gray-400"
            }
            ${editable ? "cursor-not-allowed bg-gray-100" : ""}
          `}
        >
          <span
            className={`text-sm truncate ${
              selectedData ? "text-black" : "text-gray-400 italic"
            }`}
          >
            {selectedData ? displayText : placeholder}
          </span>

          <span
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>

        {/* Dropdown List */}
        {open && (
          <div
            className={`className="absolute mt-1 w-full max-h-48 overflow-y-auto rounded-md shadow-lg z-[9999] z-50
              ${
                errorMessage
                  ? "border border-red-500 bg-gray-100"
                  : "border border-gray-300 bg-white"
              }`}
          >
            {data?.length === 0 ? (
              <div className="p-3 text-center text-gray-500 text-sm">
                No Records
              </div>
            ) : (
              data.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleChange(item);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
                    ${
                      selectedData?.value === item.value
                        ? "bg-gray-200 font-medium"
                        : ""
                    }
                  `}
                >
                  {item.label}
                </div>
              ))
            )}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

//  {/* Header Label */}
//       {headerLabel && (
//         <label className="w-1/4 text-sm text-gray-600 flex items-center">
//           {headerLabel}
//           {isRequird && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}
