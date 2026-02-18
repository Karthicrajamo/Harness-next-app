// ./next-app/src/app/list/page.tsx
"use client";

import React, { useState } from "react";
import DashboardLayout from "../../components/ListLayout";
import Header from "../../components/Header";
import OperationTable from "../../components/employeeDetails//OperationTable";
import EmployeeModal from "../../components/employeeDetails/OperationModal";
import { dummyEmployees } from "../../data/dummyEmployee";
import { EmployeeItem } from "@/data/employee";

const OperationListPage: React.FC = () => {
  const [operationData, setOperationData] =
    useState<EmployeeItem[]>(dummyEmployees);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<EmployeeItem | null>(null);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false); // New state for View mode

  // --- Handlers for Actions ---

  const handleAddOrUpdateOperation = (
    item: EmployeeItem,
    isEditing: boolean,
  ) => {
    if (isEditing) {
      setOperationData((prev) =>
        prev.map((op) => (op.id === item.id ? item : op)),
      );
    } else {
      const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
      setOperationData((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: EmployeeItem) => {
    setEditingItem(item);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const openViewModal = (item: EmployeeItem) => {
    setEditingItem(item);
    setIsViewOnly(true); // Disable editing in the modal
    setIsModalOpen(true);
  };

  const handleDelete = (ids: string[]) => {
    const confirmMessage =
      ids.length > 1
        ? `Are you sure you want to delete ${ids.length} items?`
        : "Are you sure you want to delete this item?";

    if (window.confirm(confirmMessage)) {
      setOperationData((prev) =>
        prev.filter((item: EmployeeItem) => !ids.includes(item.id)),
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-blue-50 min-h-screen">
        <Header title="Employee Details" headerText="Employee Details" onCreateClick={openAddModal} addButtonText={"Employee"} />

        <div className="p-4">
          <OperationTable
            initialData={operationData} // Passing the master data list
            onEditClick={openEditModal}
            onViewClick={openViewModal} // NEW: Handle view icon
            onDeleteClick={handleDelete} // NEW: Handle single & multi delete
          />
        </div>

        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
            setIsViewOnly(false);
          }}
          onSubmit={handleAddOrUpdateOperation}
          editingItem={editingItem}
          isReadOnly={isViewOnly} // NEW: Ensure your Modal component handles a read-only prop
        />
      </div>
    </DashboardLayout>
  );
};

export default OperationListPage;
