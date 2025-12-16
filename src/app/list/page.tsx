// ./next-app/src/app/list/page.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import DashboardLayout from "../../components/ListLayout";
import Header from "../../components/Header";
import OperationTable from "../../components/operations/OperationTable";
import OperationModal from "../../components/operations/OperationModal";
import { OperationItem } from "../../data/operation"; 
import { dummyOperations } from "../../data/dummyOperations";
import Image from "next/image";

const OperationListPage: React.FC = () => {
  const [operationData, setOperationData] = useState<OperationItem[]>(dummyOperations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OperationItem | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false); // New state for View mode

  // --- Handlers for Actions ---

  const handleAddOrUpdateOperation = (item: OperationItem, isEditing: boolean) => {
    if (isEditing) {
      setOperationData((prev) =>
        prev.map((op) => (op.id === item.id ? item : op))
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

  const openEditModal = (item: OperationItem) => {
    setEditingItem(item);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const openViewModal = (item: OperationItem) => {
    setEditingItem(item);
    setIsViewOnly(true); // Disable editing in the modal
    setIsModalOpen(true);
  };

  const handleDelete = (ids: string[]) => {
    const confirmMessage = ids.length > 1 
      ? `Are you sure you want to delete ${ids.length} items?` 
      : "Are you sure you want to delete this item?";
      
    if (window.confirm(confirmMessage)) {
      setOperationData((prev) => prev.filter((item:any) => !ids.includes(item.id)));
    }
  };

  return (
    <DashboardLayout>
       
      <Header title="Operation Master" onCreateClick={openAddModal} />
      
      <div className="p-4">
        <OperationTable
          // initialData={operationData} // Passing the master data list
          onEditClick={openEditModal}
          onViewClick={openViewModal}    // NEW: Handle view icon
          onDeleteClick={handleDelete}  // NEW: Handle single & multi delete
        />
      </div>

      <OperationModal
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
    </DashboardLayout>
  );
};

export default OperationListPage;