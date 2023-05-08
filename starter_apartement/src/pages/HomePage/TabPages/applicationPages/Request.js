import React, { useState } from "react";
import {
  acceptApartmentRequest,
  rejectApartmentRequest,
} from "../../../../services/managerService";

const Request = ({ data, isPending }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAcceptRequest = (ev) => {
    ev.preventDefault();
    acceptApartmentRequest(data._id, startDate, endDate).then((data) => {});
  };
  const handleRejectRequest = (ev) => {
    ev.preventDefault();

    rejectApartmentRequest(data._id).then((data) => {});
  };
  return (
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-lg shadow-lg px-6 py-8">
        <h2 class="text-2xl font-bold mb-4">Applicant Information</h2>
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col sm:flex-row justify-between">
            <label class="text-lg font-bold">Name:</label>
            <span class="text-gray-700 overflow-x-auto">
              {data.user.name} {data.user.fatherName}{" "}
              {data.user.grandFatherName}
            </span>
          </div>
          <div class="flex flex-col sm:flex-row justify-between">
            <label class="text-lg font-bold">Email:</label>
            <span class="text-gray-700">{data.user.email}</span>
          </div>
          <div class="flex flex-col sm:flex-row justify-between">
            <label class="text-lg font-bold">Phone:</label>
            <span class="text-gray-700">{data.user.phoneNumber}</span>
          </div>
          <div class="flex flex-col sm:flex-row justify-between">
            <label class="text-lg font-bold">Apartment ID:</label>
            <span class="text-gray-700">{data.apartment._id}</span>
          </div>
        </div>
        {isPending && (
          <div class="mt-6 space-y-4">
            <div class="flex flex-col sm:flex-row justify-between">
              <label class="text-lg font-bold">Start Date:</label>
              <input
                class="text-gray-700"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div class="flex flex-col sm:flex-row justify-between">
              <label class="text-lg font-bold">End Date:</label>
              <input
                class="text-gray-700"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div class="flex flex-row space-x-4">
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleAcceptRequest}
              >
                Accept
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleRejectRequest}
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
