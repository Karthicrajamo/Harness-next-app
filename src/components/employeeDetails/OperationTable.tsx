"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  FiEdit2,
  FiSearch,
  FiArrowUp,
  FiArrowDown,
  FiChevronDown,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";
import { FiX, FiGrid } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import {                          ```````` } from "@react-pdf/renderer";
import { EmployeeQrPdf } from "./QrPdf";
import QRCode from "qrcode";
import { EmployeeItem } from "@/data/employee";

/* =========================================================
   Debounce Hook
========================================================= */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

type SortOrder = "asc" | "desc";

/* =========================================================
   Mock Data
========================================================= */
const MOCK_DATA: EmployeeItem[] = [
  {
    id: "1",
    employeeNo: "1678945",
    employeeName: "AARON",
    dateOfBirth: "17-OCT-1990",
    gender: "Male",
    unit: "AAA",
    department: "Finance",
    designation: "Senior Product Manager",
    category: "Contract",
    type: "Staff",
    grade: "Grade 4",
    tier: "",
    group1: "Sewing",
    state: "",
    lastUpdated: "04-JUL",
    status: "Active",
  },
  {
    id: "2",
    employeeNo: "21860",
    employeeName: "AARON JEFF",
    dateOfBirth: "19-SEP-1986",
    gender: "Male",
    unit: "rrr",
    department: "Finance",
    designation: "Support Engineer",
    category: "Contract",
    type: "",
    grade: "",
    tier: "",
    group1: "",
    state: "",
    lastUpdated: "10-MAR",
    status: "Inactive",
  },
];

/* =========================================================
Toolbar (UNCHANGED)
========================================================= */
const OperationTableToolbar = ({
  searchTerm,
  onSearchChange,
  selectedCount,
  onBulkDelete,
  setShowQR,
  qrImages,
}: {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  selectedCount: number;
  onBulkDelete: () => void;
  setShowQR: (v: boolean) => void;
  qrImages: { id: string;
      employeeNo: string;
      employeeName: string;
      department: string;
      designation: string;
      src: string; }[];
}) => (
  <>
    {selectedCount > 0 && (
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowQR(true)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-md text-xs"
          >
            <FiGrid />
            <span>QR ({selectedCount})</span>
          </button>
        </div>
      </div>
    )}
  </>
);

/* =========================================================
   Main Component
   ========================================================= */
const OperationTable = ({
  initialData = MOCK_DATA,
  onEditClick,
  onViewClick,
  onDeleteClick,
}: {
  initialData?: EmployeeItem[];
  onEditClick: (item: EmployeeItem) => void;
  onViewClick: (item: EmployeeItem) => void;
  onDeleteClick: (ids: string[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof EmployeeItem>("employeeNo");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [showQR, setShowQR] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const qrRef = React.useRef<HTMLDivElement>(null);
  const [qrImages, setQrImages] = useState<
    {
      id: string;
      employeeNo: string;
      employeeName: string;
      department: string;
      designation: string;
      src: string;
    }[]
  >([]);
  const pdfRef = React.useRef<HTMLAnchorElement>(null);

  const [columnFilters, setColumnFilters] = useState<
    Partial<Record<keyof EmployeeItem, string>>
  >({});

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const dataFiltered = useMemo(() => {
    return initialData.filter((item) => {
      const globalMatch =
        !debouncedSearchTerm ||
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
        );

      if (!globalMatch) return false;

      return Object.entries(columnFilters).every(([key, value]) => {
        if (!value) return true;
        const cell = item[key as keyof EmployeeItem];
        return String(cell).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [initialData, debouncedSearchTerm, columnFilters]);

  const dataSorted = useMemo(() => {
    const sorted = [...dataFiltered];
    sorted.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return sorted;
  }, [dataFiltered, sortBy, sortOrder]);

  // --- SELECT ALL LOGIC ---
  const isAllSelected = dataSorted.length > 0 && dataSorted.every(item => selectedIds.has(item.id));
  const isSomeSelected = dataSorted.some(item => selectedIds.has(item.id)) && !isAllSelected;

  const handleSelectAll = () => {
    if (isAllSelected) {
      // Unselect all in current filtered view
      setSelectedIds(prev => {
        const next = new Set(prev);
        dataSorted.forEach(item => next.delete(item.id));
        return next;
      });
    } else {
      // Select all in current filtered view
      setSelectedIds(prev => {
        const next = new Set(prev);
        dataSorted.forEach(item => next.add(item.id));
        return next;
      });
    }
  };

  const toggleSort = (key: keyof EmployeeItem) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const selectedRows = useMemo(() => {
    return dataSorted.filter((row) => selectedIds.has(row.id));
  }, [dataSorted, selectedIds]);

  const fileName = `QR_${selectedRows.length}_EMPLOYEE_${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;

  useEffect(() => {
    if (!showQR || selectedRows.length === 0) return;

    (async () => {
      const images = await Promise.all(
        selectedRows.map(async (row) => {
          const payload = JSON.stringify({
            employeeNo: row.employeeNo,
            // employeeName: row.employeeName,
            // department: row.department,
            // designation: row.designation,
          });

          return {
            id: row.id,
            employeeNo: row.employeeNo,
            employeeName: row.employeeName,
            department: row.department,
            designation: row.designation,
            src: await QRCode.toDataURL(payload, {
              width: 300,
              margin: 1,
            }),
          };
        }),
      );
      setQrImages(images);
    })();
  }, [showQR, selectedRows]);

  useEffect(() => {
    if (qrImages.length === 0) return;
    const timer = setTimeout(() => {
      pdfRef.current?.click();
    }, 500);
    return () => clearTimeout(timer);
  }, [qrImages]);

  const headers: (keyof EmployeeItem | "actions" | "select")[] = [
    "select",
    "employeeNo",
    "employeeName",
    "dateOfBirth",
    "gender",
    "unit",
    "category",
    "department",
    "designation",
    "type",
    // "grade",
    // "tier",
    "group1",
    "group2",
    "group3",
    "group4",
    // "state",
    "status",
    // "lastUpdated",
  ];

  const formatHeader = (key: string) => {
    return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <OperationTableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCount={selectedIds.size}
        onBulkDelete={() => onDeleteClick([...selectedIds])}
        setShowQR={setShowQR}
        qrImages={qrImages}
      />

      <div className="max-h-[70vh] overflow-y-auto border border-gray-200">
        <table className="min-w-full border-collapse text-xs">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((key) => (
                <th
                  key={key}
                  onClick={() =>
                    key !== "actions" && key !== "select" && toggleSort(key)
                  }
                  className="px-3 py-2 text-left font-bold text-gray-500 uppercase cursor-pointer"
                >
                  <div className="flex items-center">
                    {key === "select" ? (
                      <input 
                        type="checkbox" 
                        className="cursor-pointer"
                        checked={isAllSelected}
                        ref={input => {
                            if (input) input.indeterminate = isSomeSelected;
                        }}
                        onChange={handleSelectAll}
                        onClick={(e) => e.stopPropagation()} // Prevent sort trigger
                      />
                    ) : (
                      <>
                        {formatHeader(key)}
                        {sortBy === key &&
                          (sortOrder === "asc" ? (
                            <FiArrowUp className="ml-1 w-3 h-3 text-[#3b82f6]" />
                          ) : (
                            <FiArrowDown className="ml-1 w-3 h-3 text-[#3b82f6]" />
                          ))}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>

            <tr className="bg-white">
              {headers.map((key) =>
                key === "actions" || key === "select" ? (
                  <th key={key} />
                ) : (
                  <th key={key} className="px-2 py-1">
                    <input
                      type="text"
                      value={columnFilters[key] || ""}
                      onChange={(e) =>
                        setColumnFilters((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                    />
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
  {dataSorted.map((item, index) => (
    <tr 
      key={item.id} 
      className={`hover:bg-blue-50 text-black transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      {headers.map((key) => {
        if (key === "select") {
          return (
            <td key={key} className="px-3 py-2">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() =>
                  setSelectedIds((prev) => {
                    const next = new Set(prev);
                    next.has(item.id)
                      ? next.delete(item.id)
                      : next.add(item.id);
                    return next;
                  })
                }
              />
            </td>
          );
        }

        if (key === "actions") {
          return (
            <td key={key} className="px-3 py-2">
              <div className="flex items-center space-x-2">
                <button onClick={() => onViewClick(item)} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition"><FiEye className="w-4 h-4" /></button>
                <button onClick={() => onEditClick(item)} className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition"><FiEdit2 className="w-4 h-4" /></button>
                <button onClick={() => onDeleteClick([item.id])} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition"><FiTrash2 className="w-4 h-4" /></button>
              </div>
            </td>
          );
        }

        return (
          <td key={key} className="px-3 py-2">
            {item[key]}
          </td>
        );
      })}
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {dataSorted.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-xs">No operations found</div>
      )}
      
      {/* ... QR Modal and Hidden PDF Link remains same ... */}
      {showQR && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div className="bg-white w-[950px] max-h-[90vh] rounded-lg shadow-lg overflow-hidden flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center p-3 border-b bg-white">
      <h2 className="text-sm font-semibold text-gray-800">
        Jay Jay Mills (Bangladesh) Private Limited - QR Codes ({selectedRows.length})
      </h2>
      <div className="flex items-center space-x-2">
        <PDFDownloadLink
          document={<EmployeeQrPdf employees={qrImages} />}
          fileName="operation-qrcodes.pdf"
        >
          {({ loading }) => (
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs hover:bg-blue-100 transition">
              <FiDownload />
              <span>{loading ? "Generating..." : "Download PDF"}</span>
            </button>
          )}
        </PDFDownloadLink>
        <button
          onClick={() => setShowQR(false)}
          className="p-1 rounded hover:bg-gray-100 text-gray-500"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* QR Grid - Updated to match the "Left Text | Right QR" design */}
    <div
      ref={qrRef}
      className="pdf-safe p-4 grid grid-cols-3 gap-3 bg-white overflow-y-auto"
    >
      {selectedRows.map((row) => {
        const qrImg = qrImages.find((q) => q.id === row.id)?.src;
        return (
          <div
            key={row.id}
            className="border border-gray-300 rounded p-2 flex flex-row items-center justify-between bg-white"
          >
            {/* LEFT SIDE: Employee Details */}
            <div className="flex-1 pr-2 text-[10px] space-y-1">
              <div className="truncate">
                <span className="font-bold">Card No: </span>
                {row.employeeNo}
              </div>
              <div className="truncate">
                <span className="font-bold">Emp Name: </span>
                {row.employeeName}
              </div>
              <div className="truncate">
                <span className="font-bold">Dept: </span>
                {row.department}
              </div>
              <div className="truncate">
                <span className="font-bold">Designation: </span>
                {row.designation}
              </div>
            </div>

            {/* RIGHT SIDE: QR Code */}
            <div className="flex-shrink-0">
              {qrImg ? (
                <img
                  src={qrImg}
                  alt="QR"
                  className="w-16 h-16 object-contain border border-gray-100"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 animate-pulse" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
      )}

      <PDFDownloadLink document={<EmployeeQrPdf employees={qrImages} />} fileName={fileName}>
        {({ url }) => <a ref={pdfRef} href={url || "#"} download={fileName} style={{ display: "none" }} />}
      </PDFDownloadLink>
    </div>
  );
};

export default OperationTable;