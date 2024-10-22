import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AuthService from "../service/AuthService";
import AddCategory from "../components/categories/AddCategory";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import AddProduct from "../components/products/AddProduct";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate("/"); // Redirect to home page after logout
  };

  // Redirect if user is not admin
  if (user.role !== "admin") {
    return <Link to="/userDashboard" />;
  }

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar for admin */}
      <div className="bg-gray-900 text-white w-64 flex-shrink-0">
 
        
          <span className="text-white text-2xl font-semibold flex flex-col items-center py-4">
            {user.username}
          </span>
      
        <nav className="mt-6">
          <Link to="products" className="block py-4 px-4 hover:bg-gray-800">
            Products
          </Link>
          <Link to="addProduct" className="block py-4 px-4 hover:bg-gray-800">
            Add Product
          </Link>
          <Link to="category" className="block py-4 px-4 hover:bg-gray-800">
            Categories
          </Link>
          <Link to="addCategory" className="block py-4 px-4 hover:bg-gray-800">
            Add Category
          </Link>
        </nav>
        <button
          className="btn btn-neutral mt-60 mx-14 text-white text-lg font-semibold"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl text-gray-900 font-bold mb-4">
          Welcome to your Admin Dashboard
        </h1>
        <Routes>
          {/* Admin Routes */}
          <Route path="products" element={<Products />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="category" element={<Categories />} />
          <Route path="addCategory" element={<AddCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
