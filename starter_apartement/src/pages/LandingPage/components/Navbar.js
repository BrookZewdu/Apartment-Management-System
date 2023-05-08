import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInUserState } from "../../../recoil_state";
import { Warehouse } from "@phosphor-icons/react";
import "./Navbar.css";

const Navbar = () => {
  const signedInUser = useRecoilValue(loggedInUserState);

  return (
    <nav className="navbar bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          {signedInUser && (
            <Link
              to={"/home"}
              className="flex items-center border border-gray-300 gap-2 rounded-full shadow-md shadow-gray-300 py-2 px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Link>
          )}
          <Link to="/" className="ml-3 text-xl font-bold text-white flex">
            <Warehouse size={34} />
            <div>
              <h1>__APARMENT</h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {signedInUser != undefined ? (
            <div className="flex items-center gap-2">
              <div className="w-24">
                <a className="bg-gray-400 py-2 px-5 rounded-md w-full">
                  {signedInUser.name}
                </a>
              </div>
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  className="object-cover h-full w-full"
                  src={`${signedInUser.avatar.url}`}
                />
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
