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
import { PDFDownloadLink } from "@react-pdf/renderer";
import { QrPdf } from "./QrPdf";
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

/* =========================================================
   Types
========================================================= */
// export interface EmployeeItem {
//   id: string;
//   operationCode: string;
//   operation: string;
//   hindi: string;
//   tamil: string;
//   smv: number;
//   machineCode: string;
//   masterOperation: string;
//   skillGrade: string;
//   comments: string;
// }

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
    profilePercent: 84,
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
    profilePercent: 19,
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
  qrImages: { id: string; label: string; src: string }[];
}) => (
  <div className="flex justify-between items-center p-3 border-b border-gray-200">
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search all fields"
        className="pl-8 py-1.5 border border-blue-400 rounded-md text-sm w-72 focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {selectedCount > 0 && (
      <div className="flex items-center space-x-2">
        <button
          onClick={onBulkDelete}
          className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-md text-xs"
        >
          <FiTrash2 />
          <span>Delete ({selectedCount})</span>
        </button>

        <button
          onClick={() => setShowQR(true)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-md text-xs"
        >
          <FiGrid />
          <span>QR ({selectedCount})</span>
        </button>
        {/* <button
          onClick={() => setShowQR(true)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs"
        >
          <FiDownload />
          <span>Download PDF</span>
        </button> */}
      </div>
    )}
  </div>
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
    { id: string; label: string; src: string }[]
  >([]);
  const pdfRef = React.useRef<HTMLAnchorElement>(null);

  /** 🔹 NEW: column search state */
  const [columnFilters, setColumnFilters] = useState<
    Partial<Record<keyof EmployeeItem, string>>
  >({});

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const dataFiltered = useMemo(() => {
    return initialData.filter((item) => {
      // Global search
      const globalMatch =
        !debouncedSearchTerm ||
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
        );

      if (!globalMatch) return false;

      // Column-wise AND filter
      return Object.entries(columnFilters).every(([key, value]) => {
        if (!value) return true;
        const cell = item[key as keyof EmployeeItem];
        return String(cell).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [initialData, debouncedSearchTerm, columnFilters]);

  /* =========================================================
     Sorting
  ========================================================= */
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

  const fileName = `QR_${selectedRows.length}_Operations_${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;

  useEffect(() => {
    if (!showQR || selectedRows.length === 0) return;

    (async () => {
      const images = await Promise.all(
        selectedRows.map(async (row) => {
          const payload =
            // JSON.stringify({
            // id: row.id,
            // employeeNo:
            row.employeeNo;
          // dateOfBirth: row.dateOfBirth,
          // gender: row.gender,
          // unit: row.unit,
          // department: row.department,
          // });

          return {
            id: row.id,
            label: row.employeeNo,
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
    }, 500); // give react-pdf time to render

    return () => clearTimeout(timer);
  }, [qrImages]);

  const headers: (keyof EmployeeItem | "actions" | "select")[] = [
    "select",
    "employeeNo",
    "employeeName",
    "dateOfBirth",
    "gender",
    "unit",
    "department",
    "designation",
    "category",
    "type",
    "grade",
    "tier",
    "group1",
    "state",
    "lastUpdated",
    "profilePercent",
    // "actions",
  ];

  const formatHeader = (key: string) => {
    return (
      key
        // handle camelCase & PascalCase
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        // handle snake_case
        .replace(/_/g, " ")
        .toUpperCase()
    );
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
            {/* HEADER ROW */}
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
                    {formatHeader(key)}
                    {sortBy === key &&
                      (sortOrder === "asc" ? (
                        <FiArrowUp className="ml-1 w-3 h-3 text-[#3b82f6]" />
                      ) : (
                        <FiArrowDown className="ml-1 w-3 h-3 text-[#3b82f6]" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>

            {/* 🔍 COLUMN SEARCH ROW (NEW, UI MATCHED) */}
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

          <tbody className="bg-white divide-y divide-gray-200 ">
            {dataSorted.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 text-black">
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
                        {/* <td
                        key={key}
                        className={`px-3 py-2 text-xs  ${responsiveClass} ${cellClass}`}
                      > */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onViewClick(item)}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditClick(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition"
                            title="Edit Operation"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteClick([item.id])}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition"
                            title="Delete Operation"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {/* </td> */}
                      </td>
                    );
                  }

                  return (
                    <td key={key} className="px-3 py-2">
                      {
                        // key === "smv" ? item.smv.toFixed(2) :
                        item[key]
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dataSorted.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-xs">
          No operations found
        </div>
      )}
      {showQR && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[900px] max-h-[80vh] rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="text-sm font-semibold">
                QR Codes ({selectedRows.length})
              </h2>

              <div className="flex items-center space-x-2">
                {/* <button
                //   onClick={downloadQRPDF}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs"
                >
                  <span>Download PDF</span>
                </button> */}
                <PDFDownloadLink
                  document={<QrPdf qrImages={qrImages} />}
                  fileName="operation-qrcodes.pdf"
                >
                  {({ loading }) => (
                    <button
                      onClick={() => setShowQR(true)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs"
                    >
                      <FiDownload />
                      {loading ? "Generating..." : "Download PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
                <button
                  onClick={() => setShowQR(false)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* QR Grid */}
            <div
              ref={qrRef}
              className="pdf-safe p-4 grid grid-cols-4 gap-4 bg-white"
            >
              {selectedRows.map((row) => {
                const qrPayload = JSON.stringify({
                  id: row.id,
                  employeeNo: row.employeeNo,
                  dateOfBirth: row.dateOfBirth,
                  gender: row.gender,
                  unit: row.unit,
                  department: row.department,
                });

                return (
                  <div
                    key={row.id}
                    className="border rounded p-2 flex flex-col items-center text-xs"
                  >
                    {/* <QRCodeCanvas value={qrPayload} size={120} /> */}
                    <img
                      src={qrImages.find((q) => q.id === row.id)?.src}
                      width={120}
                      height={120}
                    />

                    <div className="mt-2 text-center font-medium">
                      {row.employeeNo}
                    </div>

                    <div className="text-gray-500 text-[10px]">
                      {row.employeeName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <PDFDownloadLink
        document={<QrPdf qrImages={qrImages} />}
        fileName={fileName}
      >
        {({ url, loading }) => (
          <a
            ref={pdfRef}
            href={url || "#"}
            download={fileName}
            style={{ display: "none" }}
          />
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default OperationTable;
