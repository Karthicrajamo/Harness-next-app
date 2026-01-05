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
}: {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  selectedCount: number;
  onBulkDelete: () => void;
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
      <button
        onClick={onBulkDelete}
        className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-md text-xs"
      >
        <FiTrash2 />
        <span>Delete ({selectedCount})</span>
      </button>
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
  initialData?: OperationItem[];
  onEditClick: (item: OperationItem) => void;
  onViewClick: (item: OperationItem) => void;
  onDeleteClick: (ids: string[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof OperationItem>("operationCode");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  /** 🔹 NEW: column search state */
  const [columnFilters, setColumnFilters] = useState<
    Partial<Record<keyof OperationItem, string>>
  >({});

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  /* =========================================================
     Filtering (global + column)
  ========================================================= */
  const dataFiltered = useMemo(() => {
    return initialData.filter((item) => {
      // Global search
      const globalMatch =
        !debouncedSearchTerm ||
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
                )
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
    </div>
  );
};

export default OperationTable;
