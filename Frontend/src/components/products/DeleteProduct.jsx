/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

const DeleteProductModal = ({ show, onHide, product, onProductDeleted }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5002/api/products/deleteProduct/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onProductDeleted();
      onHide();
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  if (!show) return null; // Hide the modal when show is false

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative z-10">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-black">Delete Product</h3>
          <button onClick={onHide} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mt-4 text-black">
          Are you sure you want to delete this product ?
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
