// ./next-app/src/app/list/page.tsx
"use client";

import React, { use, useEffect, useState } from "react";
import DashboardLayout from "../../components/ListLayout";
import Header from "../../components/Header";
import OperationTable from "../../components/operations/OperationTable";
import OperationModal from "../../components/operations/OperationModal";
import { OperationItem } from "../../data/operation";
import { dummyOperations } from "../../data/dummyOperations";
import { serverApi } from "@/lib/serverApi";
export let tData=null;

const OperationListPage: React.FC = () => {
  const [operationData, setOperationData] =
    useState<OperationItem[]>(dummyOperations);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<OperationItem | null>(null);
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false); // New state for View mode
  const [tamilData, setTamilData] = useState<any>(null); // State to hold Tamil data
  // --- Handlers for Actions ---

  useEffect(() => {
    setTamilData(fetchTamilData());
  }, []);

  useEffect(() => {
    console.log("Fetched Tamil Data:", tamilData);
  }, [tamilData]);

  const handleAddOrUpdateOperation = (
    item: OperationItem,
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
    const confirmMessage =
      ids.length > 1
        ? `Are you sure you want to delete ${ids.length} items?`
        : "Are you sure you want to delete this item?";

    if (window.confirm(confirmMessage)) {
      setOperationData((prev) =>
        prev.filter((item: OperationItem) => !ids.includes(item.id)),
      );
    }
  };
  const fetchTamilData = async () => {
    try {
      const api = serverApi();
      console.log(api.defaults.baseURL);

      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOjEsInJvbGUiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImNvbXBhbnlOYW1lIjoiSmF5IEpheSBNaWxscyAoQmFuZ2xhZGVzaCkgUHJpdmF0ZSBMaW1pdGVkIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NzE0OTY3NzQsImV4cCI6MTc3MTUwNzU3NH0.paa6kyQ5fKL9FJbmTBCIL0UeOLgIrho6tsdnpVUjfiw";

      const response = await api.post(
        "/api/common/execute-select",
        {
          query: `
           select * from languagetable
        `,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Tamil Data:", response.data);
      tData=response.data;
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching Tamil data:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-blue-50 min-h-screen">
        <Header
          title="Operation Master"
          headerText="Operation Master"
          onCreateClick={openAddModal}
          addButtonText={"Operation"}
        />

        <div className="p-4">
          <OperationTable
            initialData={operationData} // Passing the master data list
            onEditClick={openEditModal}
            onViewClick={openViewModal} // NEW: Handle view icon
            onDeleteClick={handleDelete} // NEW: Handle single & multi delete
            tamilData={tamilData} // Pass Tamil data to the table for display
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
      </div>
    </DashboardLayout>
  );
};

export default OperationListPage;
