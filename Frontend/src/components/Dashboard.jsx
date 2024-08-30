import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="bg-gray-900 text-white w-64 flex-shrink-0">
        <div className="p-4 text-4xl font-semibold text-center">{user.role === "admin" ? "Admin " : "User"}</div>
        <nav className="mt-6">
          {user.role === 'admin' ? (
            <>
              <Link to="products" className="block py-3 px-4 hover:bg-gray-800">Products</Link>
              <Link to="addProduct" className="block py-3 px-4 hover:bg-gray-800">Add Product</Link>
              <Link to="category" className="block py-3 px-4 hover:bg-gray-800">Category</Link>
              <Link to="addCategory" className="block py-3 px-4 hover:bg-gray-800">Add Category</Link>
              <Link to='#' className="block py-3 px-4 hover:bg-gray-800">Logout</Link>
            </>
          ) : (
            <>
              <a href="#" className="block py-3 px-4 hover:bg-gray-800">Profile</a>
              <a href="#" className="block py-3 px-4 hover:bg-gray-800">Settings</a>
              <a href="#" className="block py-3 px-4 hover:bg-gray-800">Tasks</a>
              <a href="#" className="block py-3 px-4 hover:bg-gray-800">Messages</a>
              <Link to='#' className=" btn btn-ghost  block py-3 px-4 hover:bg-gray-600">Logout</Link>
            </>
          )}
        </nav>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard</h1>
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">Profile</h2>
            <p>Manage your profile information.</p>
          </div>
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">Settings</h2>
            <p>Adjust your account settings.</p>
          </div>
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">Tasks</h2>
            <p>View your tasks and progress.</p>
          </div>
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">Messages</h2>
            <p>Check your messages and notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
