// ./next-app/src/components/operations/OperationModal.tsx
import React, { useState, useEffect, useMemo } from "react";
import { OperationItem } from "../../data/operation";
import { FiX } from "react-icons/fi";

interface ModalData {
  operation: string;
  smv: number | string;
  machineCode: string;
  masterOperation: string;
  skillGrade: string;
  hindi: string;
  tamil: string;
  comments: string;
}

interface OperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OperationItem, isEditing: boolean) => void;
  editingItem: OperationItem | null;
  isReadOnly?: boolean;
}

const OperationModal: React.FC<OperationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
  isReadOnly,
}) => {
  const isEditing = !!editingItem;

  const initialState: ModalData = useMemo(
    () => ({
      operation: "",
      smv: 0.0,
      machineCode: "",
      masterOperation: "",
      skillGrade: "",
      hindi: "",
      tamil: "",
      comments: "",
    }),
    []
  );

  // Derive form data from editingItem or use initialState
  const [formData, setFormData] = useState<ModalData>(() =>
    editingItem
      ? {
          operation: editingItem.operation,
          smv: editingItem.smv,
          machineCode: editingItem.machineCode,
          masterOperation: editingItem.masterOperation,
          skillGrade: editingItem.skillGrade,
          hindi: editingItem.hindi,
          tamil: editingItem.tamil,
          comments: editingItem.comments,
        }
      : initialState
  );

  // Update formData when editingItem changes (without triggering cascade)
  useEffect(() => {
    if (editingItem) {
      setFormData({
        operation: editingItem.operation,
        smv: editingItem.smv,
        machineCode: editingItem.machineCode,
        masterOperation: editingItem.masterOperation,
        skillGrade: editingItem.skillGrade,
        hindi: editingItem.hindi,
        tamil: editingItem.tamil,
        comments: editingItem.comments,
      });
    } else {
      setFormData(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingItem]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Convert SMV back to number if it's the SMV field
      [name]: name === "smv" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the full object to submit
    const submissionData: OperationItem = {
      // Keep existing ID/Code if editing, generate new if adding
      id: editingItem ? editingItem.id : Date.now().toString(),
      operationCode: editingItem
        ? editingItem.operationCode
        : `OP-${Date.now()}`,

      // Map form data to the OperationItem interface
      operation: formData.operation,
      smv:
        typeof formData.smv === "string"
          ? parseFloat(formData.smv)
          : (formData.smv as number),
      machineCode: formData.machineCode,
      masterOperation: formData.masterOperation,
      skillGrade: formData.skillGrade,
      hindi: formData.hindi,
      tamil: formData.tamil,
      comments: formData.comments,
    };

    onSubmit(submissionData, isEditing);
  };

  // --- Professional Modal Styling ---
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-100 overflow-y-auto h-full w-full z-50 flex justify-center p-4">
      <div
        className="relative bg-white shadow-2xl rounded-xl w-full max-w-2xl transform transition-all duration-300"
        // Place the modal slightly higher (top-center appearance)
        style={{ marginTop: "5vh", maxHeight: "90vh" }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50 rounded-t-xl">
          <h3 className="text-xl font-semibold text-gray-800">
            {isReadOnly
              ? "View Operation Details"
              : isEditing
              ? "Edit Operation Details"
              : "Add New Operation"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {/* Operation */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Operation
              </label>
              <input
                type="text"
                name="operation"
                value={formData.operation}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
              />
            </div>

            {/* SMV */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                SMV
              </label>
              <input
                type="number"
                step="0.01"
                name="smv"
                value={formData.smv}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Machine Code */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Machine Code
              </label>
              <input
                type="text"
                name="machineCode"
                value={formData.machineCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
              />
            </div>
            {/* Master Operation */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Master Operation
              </label>
              <input
                type="text"
                name="masterOperation"
                value={formData.masterOperation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
              />
            </div>
            {/* Skill Grade */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Skill Grade
              </label>
              <input
                type="text"
                name="skillGrade"
                value={formData.skillGrade}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Hindi */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Hindi Translation
              </label>
              <input
                type="text"
                name="hindi"
                value={formData.hindi}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
              />
            </div>
            {/* Tamil */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Tamil Translation
              </label>
              <input
                type="text"
                name="tamil"
                value={formData.tamil}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
              />
            </div>
          </div>

          {/* Comments (Textarea for professionalism) */}
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs resize-none"
            ></textarea>
          </div>

          {/* Action Buttons (Footer) */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-medium transition"
            >
              Cancel
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 text-xs font-medium transition"
              >
                {isEditing ? "Save Changes" : "Add Operation"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperationModal;
