// ./next-app/src/components/operations/OperationTable.tsx
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

// =========================================================================
// 1. UTILITY: useDebounce Hook
// =========================================================================
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// =========================================================================
// 2. SHARED TYPES
// =========================================================================
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
type DataKeys = Exclude<keyof OperationItem, "id">;
type FilterableColumnKey = DataKeys | "all";
export type OperationFilterColumnKey = FilterableColumnKey;

// =========================================================================
// 3. MOCK DATA
// =========================================================================
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
  {
    id: "3",
    operationCode: "OP-050",
    operation: "Hem Bottom",
    hindi: "नीचे हेम",
    tamil: "கீழே மடிப்பு",
    smv: 0.22,
    machineCode: "SU",
    masterOperation: "Preparatory",
    skillGrade: "C",
    comments: "Single fold",
  },
  {
    id: "4",
    operationCode: "OP-150",
    operation: "Button Hole",
    hindi: "बटन छेद",
    tamil: "பொத்தான் துளை",
    smv: 0.08,
    machineCode: "BH",
    masterOperation: "Assembly",
    skillGrade: "B",
    comments: "Automatic machine",
  },
];

// =========================================================================
// 4. SHARED PRESENTATIONAL COMPONENTS
// =========================================================================

const FilterDropdown: React.FC<{
  filterColumn: OperationFilterColumnKey;
  onFilterColumnChange: (column: OperationFilterColumnKey) => void;
}> = ({ filterColumn, onFilterColumnChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const filterOptions: { key: OperationFilterColumnKey; label: string }[] = [
    { key: "all", label: "Search All Fields" },
    { key: "operationCode", label: "Operation Code" },
    { key: "operation", label: "Operation Name" },
    { key: "hindi", label: "Hindi Text" },
    { key: "tamil", label: "Tamil Text" },
    { key: "smv", label: "SMV (Value)" },
    { key: "machineCode", label: "Machine Code" },
    { key: "masterOperation", label: "Master Operation" },
    { key: "skillGrade", label: "Skill Grade" },
    { key: "comments", label: "Comments" },
  ];

  const selectedLabel =
    filterOptions.find((opt) => opt.key === filterColumn)?.label ||
    "Filter by Field";

  return (
    <div className="relative inline-block text-left z-10">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none`}
      >
        {selectedLabel}
        <FiChevronDown
          className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search filters..."
              className="w-full px-2 py-1 border rounded text-xs focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="py-1 max-h-40 overflow-y-auto">
            {filterOptions
              .filter((opt) =>
                opt.label.toLowerCase().includes(search.toLowerCase())
              )
              .map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    onFilterColumnChange(opt.key);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left  px-4 py-2 text-xs transition-colors duration-100 ${
                    filterColumn === opt.key
                      ? "bg-blue-400 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface OperationTableToolbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterColumn: OperationFilterColumnKey;
  onFilterColumnChange: (column: OperationFilterColumnKey) => void;
  onBulkDelete?: () => void;
  selectedCount: number;
}

const OperationTableToolbar: React.FC<OperationTableToolbarProps> = ({
  searchTerm,
  onSearchChange,
  filterColumn,
  onFilterColumnChange,
  onBulkDelete,
  selectedCount,
}) => (
  <div className="flex justify-between items-center p-3 border-b border-gray-200">

    <div className="flex items-center space-x-2 z-0">
      <FilterDropdown
        filterColumn={filterColumn}
        onFilterColumnChange={onFilterColumnChange}
      />
    </div>
    <div className="flex items-center space-x-3">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm " />
        <input
          type="text"
          placeholder={`Search: ${
            filterColumn === "all" ? "All Fields" : filterColumn
          }`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 py-1.5 border border-blue-400 rounded-md text-sm text-black w-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
      {selectedCount > 0 && (
        <button
          onClick={onBulkDelete}
          className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-md text-xs hover:bg-red-100 transition"
        >
          <FiTrash2 />
          <span>Delete ({selectedCount})</span>
        </button>
      )}
    </div>
  </div>
);

// =========================================================================
// 5. MAIN COMPONENT
// =========================================================================

interface OperationTableProps {
  initialData?: OperationItem[];
  onEditClick: (item: OperationItem) => void;
  onViewClick: (item: OperationItem) => void;
  onDeleteClick: (ids: string[]) => void;
}

const OperationTable: React.FC<OperationTableProps> = ({
  initialData = MOCK_DATA,
  onEditClick,
  onViewClick,
  onDeleteClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] =
    useState<OperationFilterColumnKey>("all");
  const [sortBy, setSortBy] = useState<keyof OperationItem>("operationCode");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Multi-select State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const dataFiltered = useMemo(() => {
    const lowerSearchTerm = debouncedSearchTerm.toLowerCase().trim();
    const MIN_SEARCH_LENGTH = 2;

    if (!lowerSearchTerm || lowerSearchTerm.length < MIN_SEARCH_LENGTH) {
      return initialData;
    }

    const searchableKeys: (keyof OperationItem)[] = [
      "operationCode",
      "operation",
      "hindi",
      "tamil",
      "machineCode",
      "masterOperation",
      "skillGrade",
      "comments",
      "id",
      "smv",
    ];

    return initialData.filter((item) => {
      if (filterColumn !== "all") {
        const key = filterColumn as keyof OperationItem;
        const value = item[key];
        const stringValue =
          key === "smv" && typeof value === "number"
            ? value.toFixed(2)
            : String(value || "").toLowerCase();
        return stringValue.includes(lowerSearchTerm);
      }
      return searchableKeys.some((key) => {
        const value = item[key];
        if (key === "smv" && typeof value === "number") {
          return value.toFixed(2).includes(lowerSearchTerm);
        }
        return String(value || "")
          .toLowerCase()
          .includes(lowerSearchTerm);
      });
    });
  }, [initialData, debouncedSearchTerm, filterColumn]);

  const dataFilteredAndSorted = useMemo(() => {
    const sortedData = [...dataFiltered];
    sortedData.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (aValue === bValue) return 0;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      const aStr = String(aValue || "").toLowerCase();
      const bStr = String(bValue || "").toLowerCase();
      return sortOrder === "asc"
        ? aStr < bStr
          ? -1
          : 1
        : aStr < bStr
        ? 1
        : -1;
    });
    return sortedData;
  }, [dataFiltered, sortBy, sortOrder]);

  const handleSort = (column: keyof OperationItem) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === dataFilteredAndSorted.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(dataFilteredAndSorted.map((i) => i.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const getSortIcon = (column: keyof OperationItem) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? (
      <FiArrowUp className="ml-1 w-3 h-3 text-blue-600" />
    ) : (
      <FiArrowDown className="ml-1 w-3 h-3 text-blue-600" />
    );
  };

  const headers: {
    key: keyof OperationItem | "actions" | "select";
    label: string;
    sortable: boolean;
    responsiveClass?: string;
    cellClass?: string;
  }[] = [
    { key: "select", label: "", sortable: false, cellClass: "w-[40px]" },
    {
      key: "operationCode",
      label: "Operation Code",
      sortable: true,
      cellClass: "whitespace-nowrap w-[80px]",
    },
    {
      key: "operation",
      label: "Operation",
      sortable: true,
      cellClass: "min-w-[150px]",
    },
    {
      key: "hindi",
      label: "Hindi",
      sortable: false,
      responsiveClass: "hidden md:table-cell",
      cellClass: "whitespace-nowrap",
    },
    {
      key: "tamil",
      label: "Tamil",
      sortable: false,
      responsiveClass: "hidden md:table-cell",
      cellClass: "whitespace-nowrap",
    },
    {
      key: "smv",
      label: "SMV",
      sortable: true,
      responsiveClass: "hidden sm:table-cell",
      cellClass: "whitespace-nowrap w-[50px]",
    },
    {
      key: "machineCode",
      label: "M/C Code",
      sortable: true,
      responsiveClass: "table-cell",
      cellClass: "whitespace-nowrap w-[80px]",
    },
    {
      key: "masterOperation",
      label: "Master Op.",
      sortable: true,
      cellClass: "whitespace-nowrap",
    },
    {
      key: "skillGrade",
      label: "Skill Grade",
      sortable: true,
      cellClass: "whitespace-nowrap w-[50px]",
    },
    {
      key: "comments",
      label: "Comments",
      sortable: true,
      cellClass: "min-w-[100px]",
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      cellClass: "whitespace-nowrap w-[100px]",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <OperationTableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterColumn={filterColumn}
        onFilterColumnChange={setFilterColumn}
        selectedCount={selectedIds.size}
        onBulkDelete={() => {
          onDeleteClick(Array.from(selectedIds));
          setSelectedIds(new Set());
        }}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className={`px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                    header.responsiveClass || ""
                  } ${
                    header.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  onClick={() =>
                    header.sortable &&
                    handleSort(header.key as keyof OperationItem)
                  }
                >
                  <div className="flex items-center">
                    {header.key === "select" ? (
                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={
                          selectedIds.size === dataFilteredAndSorted.length &&
                          dataFilteredAndSorted.length > 0
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    ) : (
                      header.label
                    )}
                    {header.sortable &&
                      getSortIcon(header.key as keyof OperationItem)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataFilteredAndSorted.map((item) => (
              <tr
                key={item.id}
                className={`${
                  selectedIds.has(item.id) ? "bg-blue-50" : "hover:bg-gray-50"
                } transition-colors duration-150`}
              >
                {headers.map((header) => {
                  const key = header.key;
                  const responsiveClass = header.responsiveClass || "";
                  const cellClass = header.cellClass || "";

                  if (key === "select") {
                    return (
                      <td key={key} className="px-3 py-2 text-xs">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleSelectOne(item.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    );
                  }

                  if (key === "actions") {
                    return (
                      <td
                        key={key}
                        className={`px-3 py-2 text-xs  ${responsiveClass} ${cellClass}`}
                      >
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
                      </td>
                    );
                  }

                  let displayValue = item[key as keyof OperationItem];
                  if (key === "smv" && typeof displayValue === "number") {
                    displayValue = displayValue.toFixed(2);
                  }

                  return (
                    <td
                      key={key}
                      className={`px-3 py-2 text-xs text-gray-700 ${responsiveClass} ${cellClass}`}
                    >
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {dataFilteredAndSorted.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-xs">
          No operations found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default OperationTable;
