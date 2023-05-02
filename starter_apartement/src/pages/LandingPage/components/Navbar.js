import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white">
            Logo
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            to="/sign-in"
            className="px-4 py-2 ml-4 text-sm font-medium text-white transition duration-300 ease-in-out rounded-md hover:bg-gray-700"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="px-4 py-2 ml-4 text-sm font-medium text-white transition duration-300 ease-in-out bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
