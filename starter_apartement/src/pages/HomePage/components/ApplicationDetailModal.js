import React from "react";
import { X } from "phosphor-react";

const ApplicationDetailsModal = ({ isOpen, closeModal, application }) => {
  const { id, name, position, status, date, notes } = application;

  return isOpen ? (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full overflow-hidden">
      <div className="absolute top-0 left-0 z-0 w-full h-full bg-gray-900 opacity-50"></div>
      <div className="z-10 w-full max-w-lg mx-auto overflow-y-auto bg-white rounded shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
          <h2 className="text-lg font-medium">Application Details</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <p className="font-medium">Applicant Name:</p>
          <p className="mb-4">{name}</p>
          <p className="font-medium">Position:</p>
          <p className="mb-4">{position}</p>
          <p className="font-medium">Status:</p>
          <p className="mb-4">{status}</p>
          <p className="font-medium">Date Applied:</p>
          <p className="mb-4">{date}</p>
          <p className="font-medium">Notes:</p>
          <p>{notes}</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default ApplicationDetailsModal;
