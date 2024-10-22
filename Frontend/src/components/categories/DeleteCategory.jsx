/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";

const DeleteCategory = ({ category, onClose, onDelete }) => {
  const [error, setError] = useState("");

  const deleteCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:5002/api/Categories/deleteCategory/${category._id}`
      );
      onDelete(category._id);
      onClose();
    } catch (err) {
      setError("Failed to delete category. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-2xl font-bold text-black mb-4">Delete Category</h2>
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-slate-600 py-1">Are you sure you want to delete this category?</p>
        <button
          className="btn btn-outline btn-error px-4 py-1 mr-2"
          onClick={deleteCategory}
        >
          Delete
        </button>
        <button
          className="px-4 py-2 btn btn-outline text-black"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCategory;
