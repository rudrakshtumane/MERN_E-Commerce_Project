/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";

const UpdateCategory = ({ category, onClose, onUpdate }) => {
  const [categoryName, setCategoryName] = useState(category.CategoryName);
  const [error, setError] = useState("");

  const updateCategory = async () => {
    if (!category || !category._id) {
      setError("Invalid category selected for update.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5002/api/Categories/updateCategory/${category._id}`,
        { CategoryName: categoryName }
      );
      onUpdate(category._id, categoryName);
      onClose();
    } catch (err) {
      setError("Failed to update category. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-2xl text-black font-semibold mb-4">Update Category</h2>
        {error && <p className="text-red-500">{error}</p>}
        <label className="block mb-2 text-gray-700">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-white text-black border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          className="mr-2 px-4 py-2 btn btn-outline btn-success"
          onClick={updateCategory}
        >
          Save
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

export default UpdateCategory;
