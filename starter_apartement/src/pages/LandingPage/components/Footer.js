import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-6xl px-4 py-12 mx-auto overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              Connect With Us
            </h3>
            <nav className="flex flex-wrap justify-start -mx-4">
              <div className="px-4 py-2">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span>Facebook</span>
                  <FaFacebook />
                </a>
              </div>
              <div className="px-4 py-2">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span>Twitter</span>
                  <FaTwitter />
                </a>
              </div>
              <div className="px-4 py-2">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span>Instagram</span>
                  <FaInstagram />
                </a>
              </div>
              <div className="px-4 py-2">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span>LinkedIn</span>
                  <FaLinkedin />
                </a>
              </div>
            </nav>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <nav className="flex flex-wrap justify-start -mx-4">
              <div className="px-4 py-2">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  About Us
                </a>
              </div>
              <div className="px-4 py-2">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Services
                </a>
              </div>
              <div className="px-4 py-2">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Contact Us
                </a>
              </div>
            </nav>
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Our Address</h3>
            <address className="text-gray-400 not-italic">
              123 Main St.
              <br />
              Arada, Addis Ababa, Ethiopia
            </address>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} Apartment Management System. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
