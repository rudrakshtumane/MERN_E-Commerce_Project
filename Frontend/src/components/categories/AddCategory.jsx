import React, { useState } from "react";
import axios from "axios";
import Toast from '../Toast';


const AddCategory = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [toast, setToast] = useState({ message: '', type: '', show: false });

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
        showToast('User is not authenticated', 'error');
      return;
    }

    try {
      await axios.post(
        "http://localhost:5002/api/Categories/createCategory",
        { CategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategoryName(""); // Clear the input
      showToast('Category added successfully','success');
    } catch (err) {
        showToast("Error adding category. Please try again.", 'error');
    }
  };

 

  return (
    <div className="flex justify-center items-center my-8">
      <form
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl text-black font-semibold mb-6">
          Add New Category
        </h2>
        {/* CATEGORY NAME */}
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={CategoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          ></input>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Category
        </button>
      </form>
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
    </div>
  );
};

export default AddCategory;
