/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = ({ show, onHide, product, onProductUpdated }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5002/api/Categories/getCategories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (err) {
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (show && product) {
      setName(product.name || "");
      setCategory(product.category || "");
      setPrice(product.price || "");
      setInStock(product.inStock === true);
      setQuantity(product.quantity || "");
      setError(null);
      setSuccess(null);
    }
  }, [show, product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    const productData = {
      name,
      category,
      price,
      inStock,
      quantity,
    };

    console.log("Product data being sent:", productData);

    try {
      const response = await axios.put(
        `http://localhost:5002/api/products/updateProduct/${product.id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Product updated successfully!");
      onProductUpdated(response.data);
      onHide();
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.response ? err.response.data.msg : "Error updating product");
    }
  };

  return (
    show && (
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-black ">
            Update Product
          </h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-white text-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-white text-gray-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.CategoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-white text-gray-700"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                In Stock
              </label>
              <div className="flex items-center">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="inStock"
                    value={true}
                    checked={inStock === true}
                    onChange={() => setInStock(true)}
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="inStock"
                    value={false}
                    checked={inStock === false}
                    onChange={() => setInStock(false)}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-white text-gray-700"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            {error && <div className="mb-4 text-red-500">{error}</div>}
            {success && <div className="mb-4 text-green-500">{success}</div>}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onHide}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md "
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateProduct;
