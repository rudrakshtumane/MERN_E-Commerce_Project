import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/Categories/getCategories"); 
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      {categories.map((category) => (
        <div key={category.id} className="p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">{category.CategoryName}</h3>
        </div>
      ))}
    </div>
  );
};

export default Categories;
