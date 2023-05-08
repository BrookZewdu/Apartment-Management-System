import React, { useState } from "react";
import { X } from "phosphor-react";
import axios from "axios";

const MaintenanceRequest = () => {
  const [type, setType] = useState();
  const [details, setDetails] = useState();
  const [urgency, setUrgency] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  };

  const handleSubmit = () => {
    handleOpenModal();
    axios.post("/users/maintenanceRequest", {
      apartment: "",
      descritption: details,
      type: type,
    });
    // Submit request to backend or display message to user indicating success
  };

  return (
    <div className="px-4 py-8">
      <h2 className="mb-4 text-xl font-bold">Maintenance Request</h2>
      <form onSubmit={handleSubmit} className="max-w-md ">
        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 font-bold">
            Issues:
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="">Plumbing</option>
            <option value="">Electrical</option>
            <option value="">Appliance Repair</option>
            <option value="">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="details" className="block mb-2 font-bold">
            Details:
          </label>
          <textarea
            id="details"
            name="details"
            value={details}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="urgency" className="block mb-2 font-bold">
            Urgency:
          </label>
          <select
            id="urgency"
            name="urgency"
            value={urgency}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          type="button"
          className="inline-block px-4 py-2 font-bold text-white rounded bg-primary hover:bg-secondary focus:outline-none focus:shadow-outline"
          onClick={handleOpenModal}
        >
          Submit Request
        </button>
      </form>

      {modalIsOpen && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 z-0 w-full h-full bg-gray-900 opacity-50"></div>
          <div className="z-10 w-full max-w-lg mx-auto overflow-y-auto bg-white rounded shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
              <h2 className="text-lg font-medium">Confirmation</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <h2 className="mb-4 text-xl font-bold">
                Confirm Maintenance Request
              </h2>
              <p className="mb-4">
                Are you sure you want to submit this maintenance request?
              </p>
            </div>
            <div className="flex justify-end m-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 ml-4 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => {
                  handleCloseModal();
                  handleSubmit();
                }}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequest;
