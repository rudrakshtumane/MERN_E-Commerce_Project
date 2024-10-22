/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';
import Dashboard from '../pages/Dashboard';


const Navbar = ({ setShowLogin }) => {
  const { user, setUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();



  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/'); // Redirect to home page after logout
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      <div className="navbar bg-inherit p-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-inherit rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><a>Home</a></li>
              <li>
                <a>Categories</a>
                <ul className="p-2">
                  <li><a>Mens</a></li>
                  <li><a>Womens</a></li>
                </ul>
              </li>
              <li><a>Sign In</a></li>
            </ul>
          </div>
          <a className="text-5xl text-black font-thin cursor-pointer">R&S</a>
        </div>

        <div className="navbar-center hidden lg:flex bg-inherit">
          {user ? (
            <form onSubmit={handleSearchSubmit} className="w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="input input-bordered w-full bg-white"
              />
            </form>
          ) : (
            <ul className="menu menu-horizontal px-1 text-black font-semibold">
              <li><Link to="/">Home</Link></li>
              <li><a>About us</a></li>
              <li><a>Contact</a></li>
            </ul>
          )}
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="btn btn-ghost text-black font-semibold">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aEGesafKMJbW_OQPl97INDHAHt25yRbLNQ&s"
                  alt="User Profile"
                  className="w-8 h-8 rounded-full border border-black"
                />
                <span className="text-black font-semibold">{user.username}</span>
              </div>
            <button className="btn btn-ghost text-black"  onClick={handleLogout}>Sign Out</button>
            </div>
          ) : (
            <button className="btn btn-ghost text-black font-semibold" onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
