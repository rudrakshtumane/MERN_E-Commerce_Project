import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    // Check if all required fields are provided
    if (!name || !category || !price || !quantity || !image) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData(); // Create a FormData object
    formData.append("name", name);
    formData.append("image", image); // Append the image file
    formData.append("category", category);
    formData.append("price", price);
    formData.append("inStock", inStock);
    formData.append("quantity", quantity);

    try {
      // Make the POST request with FormData and authorization header
      const response = await axios.post(
        "http://localhost:5002/api/products/createProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Specify form data content type
          },
        }
      );

      // Handle successful response
      setSuccess("Product added successfully!");
      setName("");
      setImage(null); // Reset image state
      setCategory("");
      setPrice("");
      setInStock(true);
      setQuantity("");
      setError(null);
    } catch (err) {
      // Log the error details and set the error state
      console.error("Error details:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : "Error adding product. Please try again.");
      setSuccess(null);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl text-black text-center font-bold mb-4">
        Add Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white text-black border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="productCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" className="font-semibold">Select a category</option>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id} className="text-black">
                  {cat.CategoryName}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="productInStock"
            className="block text-sm font-medium text-gray-700"
          >
            Available
          </label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="productInStock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value === "true")}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="productQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="productQuantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <input
            type="file"
            className="mt-1 block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md">
            {error}
            <button
              type="button"
              className="ml-2 text-red-700 font-bold"
              onClick={handleDismiss}
            >
              &times;
            </button>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-md">
            {success}
            <button
              type="button"
              className="ml-2 text-green-700 font-bold"
              onClick={handleDismiss}
            >
              &times;
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
