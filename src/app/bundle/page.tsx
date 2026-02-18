// ./next-app/src/app/list/page.tsx
"use client";

import React, { useState } from "react";
import DashboardLayout from "../../components/ListLayout";
import { dummyBundle } from "../../data/dummyBundle";
import { BundleItem } from "@/data/bundleInterface";
import CommonTable from "@/components/common/CommonTable";
import CommonHeader from "@/components/common/CommonHeader";

const OperationListPage: React.FC = () => {
  const [bundleData, setBundleData] = useState<BundleItem[]>(dummyBundle);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<BundleItem | null>(null);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false); // New state for View mode

  const headers: (keyof BundleItem | "actions" | "select")[] = [
    "select",
    "orderNo",
    "designNo",
    "designDesc",
    "itemNo",
    "jobNo",
    "workCenter",
    "startDate",
    "actions",
  ];
  // --- Handlers for Actions ---

  const handleAddOrUpdateOperation = (item: BundleItem, isEditing: boolean) => {
    if (isEditing) {
      setBundleData((prev) =>
        prev.map((op) => (op.id === item.id ? item : op)),
      );
    } else {
      const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
      setBundleData((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: BundleItem) => {
    setEditingItem(item);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const openViewModal = (item: BundleItem) => {
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
      setBundleData((prev) =>
        prev.filter((item: BundleItem) => !ids.includes(item.id)),
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-blue-50 min-h-screen">
        {" "}
        {/* Spacer for fixed header */}
        <CommonHeader
          title="Bundle Details"
          headertext="Bundle Details"
          onCreateClick={openAddModal}
          addTextBtn="Bundle"
        />
        <div className="p-4">
          <CommonTable
            initialData={bundleData} // Passing the master data list
            onEditClick={openEditModal}
            onViewClick={openViewModal} // NEW: Handle view icon
            onDeleteClick={handleDelete} // NEW: Handle single & multi delete
            headers={headers}
          />
        </div>
      </div>

      {/* <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
          setIsViewOnly(false);
        }}
        onSubmit={handleAddOrUpdateOperation}
        editingItem={editingItem}
        isReadOnly={isViewOnly} // NEW: Ensure your Modal component handles a read-only prop
      /> */}
    </DashboardLayout>
  );
};

export default OperationListPage;
