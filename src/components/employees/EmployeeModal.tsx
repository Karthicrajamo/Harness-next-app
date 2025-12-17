// ./next-app/src/components/employees/EmployeeModal.tsx
import React, { useState } from "react";

interface EmployeeFormData {
  subject: string;
  priority: string;
  type: string;
  team: string;
  contact: string;
}

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // State to manage the form inputs
  const [formData, setFormData] = useState<EmployeeFormData>({
    subject: "", // Employee Name
    priority: "Medium",
    type: "New Join",
    team: "", // Department
    contact: "", // Email
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: EmployeeFormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields before submitting
    if (formData.subject && formData.team && formData.contact) {
      onSubmit(formData);
      // Optional: Reset form after submission
      setFormData({
        subject: "",
        priority: "Medium",
        type: "",
        team: "",
        contact: "",
      });
    } else {
      alert("Please fill in all required fields (Name, Department, Email).");
    }
  };

  return (
    // Backdrop for the modal
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      {/* Modal Content */}
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Add New Employee</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name (Subject)
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Jane Doe"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team (Department)
            </label>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleChange}
              placeholder="e.g., Cutting Department"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact (Email)
            </label>
            <input
              type="email"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g., jane.doe@company.com"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
            />
          </div>

          {/* Simple Selects */}
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
              >
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm"
              >
                <option value="New Join">New Join</option>
                <option value="Transfer">Transfer</option>
                <option value="Update">Update</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#3788E5] text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
