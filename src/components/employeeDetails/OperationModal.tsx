// ./next-app/src/components/employees/EmployeeModal.tsx
import React, { useState, useEffect, useMemo } from "react";
import { EmployeeItem } from "../../data/employee";
import { FiX } from "react-icons/fi";

interface ModalData {
  employeeNo: string;
  employeeName: string;
  dateOfBirth: string;
  gender: string;
  unit: string;
  department: string;
  designation: string;
  category: string;
  type: string;
  grade: string;
  tier: string;
  group1: string;
  state: string;
  profilePercent: number | string;
}

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeItem, isEditing: boolean) => void;
  editingItem: EmployeeItem | null;
  isReadOnly?: boolean;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
  isReadOnly,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const initialState: ModalData = useMemo(
    () => ({
      employeeNo: "",
      employeeName: "",
      dateOfBirth: "",
      gender: "",
      unit: "",
      department: "",
      designation: "",
      category: "",
      type: "",
      grade: "",
      tier: "",
      group1: "",
      state: "",
      profilePercent: 0,
    }),
    []
  );

  const [formData, setFormData] = useState<ModalData>(initialState);

  useEffect(() => {
    if (isOpen) {
      setIsEditing(!!editingItem && !isReadOnly);

      if (editingItem) {
        // setFormData(editingItem);
      } else {
        setFormData(initialState);
      }
    }
  }, [editingItem, isOpen, isReadOnly, initialState]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "profilePercent" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const submissionData: EmployeeItem = {
    //   ...formData,
    //   profilePercent:
    //     typeof formData.profilePercent === "string"
    //       ? Number(formData.profilePercent)
    //       : formData.profilePercent,
    // };

    // onSubmit(submissionData, !!editingItem);
  };

  const isDisabled = isReadOnly && !isEditing;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl mt-[5vh] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50">
          <h3 className="text-lg font-semibold">
            {isReadOnly && !isEditing
              ? "View Employee"
              : editingItem
              ? "Edit Employee"
              : "Add Employee"}
          </h3>

          {isReadOnly && (
            <span
              onClick={() => setIsEditing(!isEditing)}
              className={`pi ${
                isEditing
                  ? "pi-times text-red-500"
                  : "pi-file-edit text-blue-500"
              } cursor-pointer`}
            />
          )}

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Employee No
              </label>
              <input
                name="employeeNo"
                value={formData.employeeNo}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Employee No"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Employee Name
              </label>
              <input
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Employee Name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={isDisabled}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Gender
              </label>
              <input
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Gender"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Unit
              </label>
              <input
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Unit"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Department
              </label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Department"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Designation
              </label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Designation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Type
              </label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Type"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Grade
              </label>
              <input
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Grade"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Tier
              </label>
              <input
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Tier"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Group 1
              </label>
              <input
                name="group1"
                value={formData.group1}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Group"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="State"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Profile %
            </label>
            <input
              name="profilePercent"
              type="number"
              value={formData.profilePercent}
              onChange={handleChange}
              disabled={isDisabled}
              placeholder="Profile %"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 px-4 py-2 rounded"
            >
              Cancel
            </button>

            {(!isReadOnly || isEditing) && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editingItem ? "Save Changes" : "Add Employee"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
