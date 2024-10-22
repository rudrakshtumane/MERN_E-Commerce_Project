import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateCategoryModal from "./UpdateCategory";
import DeleteCategoryModal from "./DeleteCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(null); // 'update' or 'delete'

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/Categories/getCategories"
        );
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setModalType("update");
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setModalType("delete");
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalType(null);
  };

  const handleCategoryUpdate = (id, newName) => {
    const updatedCategories = categories.map((cat) =>
      cat._id === id ? { ...cat, CategoryName: newName } : cat
    );
    setCategories(updatedCategories);
  };

  const handleCategoryDelete = (id) => {
    const filteredCategories = categories.filter((cat) => cat._id !== id);
    setCategories(filteredCategories);
  };

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-4 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {category.CategoryName}
            </h3>
            <div className="flex mt-4">
              <button
                className="btn btn-outline btn-info mr-2 px-3 py-2"
                onClick={() => openUpdateModal(category)}
              >
                Update
              </button>
              <button
                className="btn btn-outline btn-error px-4 py-2"
                onClick={() => openDeleteModal(category)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalType === "update" && selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          onClose={closeModal}
          onUpdate={handleCategoryUpdate}
        />
      )}

      {modalType === "delete" && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={closeModal}
          onDelete={handleCategoryDelete}
        />
      )}
    </div>
  );
};

export default Categories;
