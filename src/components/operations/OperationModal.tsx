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
  // 1. CHANGE: Manage isEditing with useState so the UI re-renders
  const [isEditing, setIsEditing] = useState(false);

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

  const [formData, setFormData] = useState<ModalData>(initialState);

  // 2. CHANGE: Initialize internal isEditing state based on props
  useEffect(() => {
    if (isOpen) {
      /*
       * We're intentionally synchronously initializing local state from props
       * when the modal opens (or when `editingItem` changes). This is a
       * controlled action that prepares the form for editing/viewing. The
       * eslint rule `react-hooks/set-state-in-effect` is noisy in this
       * specific case, so we disable it for this effect only.
       */
      /* eslint-disable react-hooks/set-state-in-effect */
      setIsEditing(!!editingItem && !isReadOnly);
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
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [editingItem, isOpen, isReadOnly, initialState]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "smv" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData: OperationItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      operationCode: editingItem
        ? editingItem.operationCode
        : `OP-${Date.now()}`,
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

    onSubmit(submissionData, !!editingItem);
  };

  // Logic to determine if fields should be locked
  const isDisabled = isReadOnly && !isEditing;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex justify-center p-4">
      <div
        className="relative  bg-white shadow-2xl rounded-xl w-full max-w-2xl transform transition-all duration-300"
        style={{ marginTop: "5vh", maxHeight: "90vh" }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50 rounded-t-xl">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            {isReadOnly && !isEditing
              ? "View Operation Details"
              : isEditing || editingItem
              ? "Edit Operation Details"
              : "Add New Operation"}

            {/* 3. CHANGE: Functional Toggle Icon */}
            {isReadOnly && (
              <span
                onClick={() => setIsEditing(!isEditing)}
                className={`pi ${
                  isEditing
                    ? "pi-times text-red-500"
                    : "pi-file-edit text-blue-500"
                } ml-3 text-sm cursor-pointer hover:scale-110 transition-transform`}
                title={isEditing ? "Cancel Edit" : "Enable Editing"}
              ></span>
            )}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto ">
          <div className="grid grid-cols-2 gap-4">
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
                disabled={isDisabled}
                placeholder="Enter Operation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

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
                disabled={isDisabled}
                placeholder="Enter SMV"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Machine Code
              </label>
              <input
                type="text"
                name="machineCode"
                value={formData.machineCode}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Enter Machine Code"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Master Operation
              </label>
              <input
                type="text"
                name="masterOperation"
                value={formData.masterOperation}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Enter Master Operation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Skill Grade
              </label>
              <input
                type="text"
                name="skillGrade"
                value={formData.skillGrade}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Enter Skill Grade"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Hindi Translation
              </label>
              <input
                type="text"
                name="hindi"
                value={formData.hindi}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Enter Hindi Translation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Tamil Translation
              </label>
              <input
                type="text"
                name="tamil"
                value={formData.tamil}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="Enter Tamil Translation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={2}
              disabled={isDisabled}
              placeholder="Enter Comments"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs resize-none disabled:bg-gray-50"
            ></textarea>
          </div>
{/* <div className="relative">
  <textarea
    name="comments"
    value={formData.comments}
    onChange={handleChange}
    disabled={isDisabled}
    rows={2}
    placeholder=" "
    className="peer w-full border border-blue-400 rounded-md px-3 pt-4 pb-2 text-xs resize-none focus:outline-none focus:ring-0 disabled:bg-gray-50"
  />
  <label className="absolute left-2 top-2 bg-white px-1 text-xs text-blue-600 transition-all
    peer-placeholder-shown:top-3.5
    peer-placeholder-shown:text-gray-400
    peer-focus:top-2
    peer-focus:text-blue-600">
    Comments
  </label>
</div> */}
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-medium transition"
            >
              Cancel
            </button>

            {/* 4. CHANGE: Show Submit button if adding NEW or if EDITING is enabled */}
            {(!isReadOnly || isEditing) && (
              <button
                type="submit"
                className="px-5 py-2 bg-[#3b82f6] text-white rounded-lg shadow-md hover:bg-blue-700 text-xs font-medium transition"
              >
                {editingItem ? "Save Changes" : "Add Operation"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperationModal;
