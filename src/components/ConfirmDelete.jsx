import React from 'react';

const ConfirmDelete = ({ isVisible, onConfirm, onCancel, taskTitle }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg text-center sm:mx-20 mx-3 bg-blue-950 text-white border border-orange-500">
        <p className="text-lg mb-4">
          Are you sure you want to delete "{taskTitle}"?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-orange-500 text-white px-4 py-1 rounded-md hover:bg-red-600 border border-orange-500"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-400 border border-orange-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
