import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Adjust path as needed
import OperationTable from "../components/operations/OperationTable"; // Adjust path as needed
import { serverApi } from "@/lib/serverApi";

// Define a placeholder component for the creation form/modal
const OperationCreationModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  // In a real application, this modal would contain the form fields
  // and a submission handler to save the new operation to the backend/state.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Operation</h2>
        <p>This is where the form to add a new operation would go.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close & (Simulate Save)
        </button>
      </div>
    </div>
  );
};

// --- Page Component (The component that uses the Header) ---
const OperationListPage: React.FC = () => {
  // State to control the visibility of the creation modal
  const [isCreationModalOpen, setIsCreationModalOpen] =
    useState<boolean>(false);
  const [tamilData, setTamilData] = useState<any>(null); 
  // NOTE: You would typically fetch the initialData here and pass it to OperationTable
  // We are using the mock data included in OperationTable for this example.

  // 🎯 THE CRITICAL FUNCTION: This runs when the Header's button is clicked
  const handleCreateOperationClick = () => {
    console.log("Create button clicked! Opening modal...");
    setIsCreationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreationModalOpen(false);
    // Add logic here to refresh the table data if a new item was saved
    console.log("Creation process completed/cancelled.");
  };
  useEffect(() => {
    setTamilData(fetchTamilData());
  }, []);
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
          SELECT language_field_name
          FROM language_lable_details
          WHERE field_category = 'Label'
            AND language_id = (
              SELECT language_id
              FROM language_master
              WHERE language_name = (
                SELECT secondary_language FROM hr_configuration
              )
            )
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
    <div className="min-h-screen bg-gray-50">
      {/* 1. RENDER THE HEADER, PASSING THE HANDLER */}
      <Header
        title="Operation List"
        headerText="Operation List"
        showCreateButton={true}
        onCreateClick={handleCreateOperationClick} // <--- Passing the function here
        addButtonText={"Operation"} // <--- Passing the button text here
      />

      <main className="p-4 md:p-6">
        {/* 2. RENDER THE TABLE */}
        {/* We assume OperationTable handles its own data/filtering/sorting now */}
        <OperationTable
          onEditClick={() => console.log("Edit clicked")}
          onViewClick={() => {
            throw new Error("Function not implemented.");
          }}
          onDeleteClick={() => {
            throw new Error("Function not implemented.");
          }}
        />
      </main>

      {/* 3. RENDER THE MODAL IF STATE IS TRUE */}
      {isCreationModalOpen && (
        <OperationCreationModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OperationListPage;