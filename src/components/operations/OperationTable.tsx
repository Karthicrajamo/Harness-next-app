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
import { tData } from "@/app/list/page";

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
export interface OperationItem {
  id: string;
  operationCode: string;
  operation: string;
  hindi: string;
  tamil: string;
  smv: number;
  machineCode: string;
  masterOperation: string;
  skillGrade: string;
  comments: string;
}

type SortOrder = "asc" | "desc";

/* =========================================================
   Mock Data
========================================================= */
const MOCK_DATA: OperationItem[] = [
  {
    id: "1",
    operationCode: "OP-101",
    operation: "Sew Pocket",
    hindi: "जेब सिलना",
    tamil: "பாக்கெட் தைக்க",
    smv: 0.45,
    machineCode: "SM",
    masterOperation: "Assembly",
    skillGrade: "A",
    comments: "Standard pocket",
  },
  {
    id: "2",
    operationCode: "OP-205",
    operation: "Attach Collar",
    hindi: "कॉलर जोड़ना",
    tamil: "காலர் இணைக்கவும்",
    smv: 1.1,
    machineCode: "LH",
    masterOperation: "Finishing",
    skillGrade: "B",
    comments: "Interlock required",
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
  tamilData,
}: {
  initialData?: OperationItem[];
  onEditClick: (item: OperationItem) => void;
  onViewClick: (item: OperationItem) => void;
  onDeleteClick: (ids: string[]) => void;
  tamilData?: any; // New prop to receive Tamil data
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof OperationItem>("operationCode");
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
    Partial<Record<keyof OperationItem, string>>
  >({});

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  //   const downloadQRPDF = async () => {
  //     if (!qrRef.current) return;
  //     console.log("pdf:::");

  //     const canvas = await html2canvas(qrRef.current, {
  //       scale: 2,
  //       backgroundColor: "#ffffff",
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");

  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = pageWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft > 0) {
  //       position -= pageHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save("operation-qrcodes.pdf");
  //   };

  /* =========================================================
     Filtering (global + column)
  ========================================================= */
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
        const cell = item[key as keyof OperationItem];
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

  const toggleSort = (key: keyof OperationItem) => {
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
      // Ensure tamilData is an array (it may be an object with a `data` property)
      console.log(tData, "--tamilData source for QR labels:");
      const source = Array.isArray(tData) ? tData : tData;

      // Generate QR images for each selected row. Try to attach a Tamil label
      // from `source` by index when available. Use the row.id as the image id
      // so lookups later (by row.id) work correctly.
      console.log(source, "tamilData source for QR labels:");

      const images = await Promise.all(
        selectedRows.map(async (row: any, idx: number) => {
          const tamilLabel = source[idx]?.HINDI ?? "";
          const tamilLabel2 = source[idx]?.TAMIL ?? "";
          const tamilLabel3 = source[idx]?.BENGALI ?? "";
          const payload = JSON.stringify({
            id: row.id,
            operationCode: row.operationCode,
            operation: row.operation,
            tamilLabel,
            tamilLabel2,
            tamilLabel3,
          });

          return {
            id: row.id,
            label: tamilLabel || row.operation,
            label2: tamilLabel2 || row.operation,
            label3: tamilLabel3 || row.operation,
            src: await QRCode.toDataURL(payload, {
              width: 300,
              margin: 1,
            }),
          };
        }),
      );

      setQrImages(images);
    })();
  }, [showQR, selectedRows, tamilData]);

  useEffect(() => {
    if (qrImages.length === 0) return;

    const timer = setTimeout(() => {
      pdfRef.current?.click();
    }, 500); // give react-pdf time to render

    return () => clearTimeout(timer);
  }, [qrImages]);

  const headers: (keyof OperationItem | "actions" | "select")[] = [
    "select",
    "operationCode",
    "operation",
    "hindi",
    "tamil",
    "smv",
    "machineCode",
    "masterOperation",
    "skillGrade",
    "comments",
    "actions",
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-xs">
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

          <tbody className="bg-white divide-y divide-gray-200">
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
                      {key === "smv" ? item.smv.toFixed(2) : item[key]}
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
                  operationCode: row.operationCode,
                  operation: row.operation,
                  machine: row.machineCode,
                  smv: row.smv,
                  skill: row.skillGrade,
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
                      {row.operationCode}
                    </div>

                    <div className="text-gray-500 text-[10px]">
                      {row.operation}
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
