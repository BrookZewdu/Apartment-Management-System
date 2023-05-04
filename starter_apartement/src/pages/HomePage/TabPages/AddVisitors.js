import React, { useState } from 'react';
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";

const AddVisitors = () => {
  const [visitorName, setVisitorName] = useState('');
  const [visitTime, setVisitTime] = useState('');
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <>
      <Navbar />
      <div className="bg-cover bg-center p-10">
        <h2 className="text-center mb-10 text-lg font-bold leading-10 text-neutral-900">Visitors</h2>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="visitorName" className="block text-sm font-medium text-neutral-900 mb-2">Visitor Name:</label>
            <input
              id="visitorName"
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="visitTime" className="block text-sm font-medium text-neutral-900 mb-2">Visit Time:</label>
            <input
              id="visitTime"
              type="text"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <button type="submit" className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddVisitors;
