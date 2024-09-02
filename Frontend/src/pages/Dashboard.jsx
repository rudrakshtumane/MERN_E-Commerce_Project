import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, Route, Routes } from 'react-router-dom';
import AddCategory from '../components/categories/AddCategory';
import Categories from '../components/categories/Categories';

const Dashboard = () => {
  const { user } = useContext(UserContext);

 

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="bg-gray-900 text-white w-64 flex-shrink-0">
        <div className="p-4 text-4xl font-semibold text-center">
          {user.role === "admin" ? "Admin" : "User"}
        </div>
        <nav className="mt-6">
          {user.role === 'admin' ? (
            <>
              <Link to="products" className="block py-3 px-4 hover:bg-gray-800">Products</Link>
              <Link to="addProduct" className="block py-3 px-4 hover:bg-gray-800">Add Product</Link>
              <Link to="category" className="block py-3 px-4 hover:bg-gray-800">Categories</Link>
              <Link to="addCategory" className="block py-3 px-4 hover:bg-gray-800">Add Category</Link>
              {/* <Link to='#' className="block py-3 px-4 hover:bg-gray-800">Logout</Link> */}
            </>
          ) : (
            <>
              <Link to="products" className="block py-3 px-4 hover:bg-gray-800">View Categories</Link>
              <Link to="" className="block py-3 px-4 hover:bg-gray-800">View</Link>
              <Link to="" className="block py-3 px-4 hover:bg-gray-800">View Cart</Link>
              <Link to="" className="block py-3 px-4 hover:bg-gray-800">Settings</Link>
              {/* <Link to='#' className="block py-3 px-4 hover:bg-gray-600">Logout</Link> */}
            </>
          )}
        </nav>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl text-gray-900 font-bold mb-4">Welcome to your Dashboard</h1>
        <Routes>
          <Route>
            {/* <Route path="products" element={<Products />} /> */}
            {/* <Route path="addProduct" element={<AddProduct />} /> */}
            <Route path="category" element={<Categories />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="*" element={() => <h1>Not Found</h1>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
