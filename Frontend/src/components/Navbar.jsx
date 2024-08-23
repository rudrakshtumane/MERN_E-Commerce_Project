/* eslint-disable react/prop-types */
import React from 'react'

const Navbar = ({setShowLogin}) => {
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
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-inherit rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
    <a className=" text-3xl text-black font-thin cursor-pointer ">RS clothing</a>
  </div>
  <div className="navbar-center hidden lg:flex bg-inherit">
    <ul className="menu menu-horizontal px-1 text-black font-semibold ">
      <li><a>Home</a></li>
      <li>
        <details>
          <summary>Categories</summary>
          <ul className="p-2 text-black font-semibold bg-white">
            <li><a>Mens</a></li>
            <li><a>Womens </a></li>
          </ul>
        </details>
      </li>
      <li><a>Contact</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost text-black  font-semibold" onClick={()=>setShowLogin(true)}>Sign In</button>
  </div>
</div>
    </div>
  )
}

export default Navbar