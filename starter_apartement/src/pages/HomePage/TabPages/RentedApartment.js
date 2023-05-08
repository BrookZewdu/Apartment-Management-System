import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { apartmentListState } from "../../../recoil_state";
// import { roo msState } from "../atoms";

import { Navigate } from "react-router-dom";
import {
  deleteLeaseAgreement,
  getAllLeaseAgreement,
} from "../../../services/managerService";

const ApartmentList = () => {
  const [lease, setLease] = useState([]);

  const handleDelete = async (id) => {
    deleteLeaseAgreement(id).then((data) => {
      getAllLeaseAgreement().then((data) => {
        setLease(data.data);
      });
    });
  };

  useEffect(() => {
    getAllLeaseAgreement().then((data) => {
      setLease(data.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-large mb-4 flex justify-center">
          All Apartments
        </h2>

        <table className="table-auto border-collapse w-full mt-4 mb-16">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">apartment</th>
              <th className="border border-gray-400 px-4 py-2">startDate</th>
              <th className="border border-gray-400 px-4 py-2">endDate</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lease.map((lease) => (
              <tr key={lease._id}>
                <td className="border border-gray-400 px-4 py-2">
                  {lease.user.name +
                    " " +
                    lease.user.fatherName +
                    " " +
                    lease.user.grandFatherName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {lease.apartment._id}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {lease.startDate}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {lease.endDate}
                </td>

                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className="ml-10"
                    onClick={() => handleDelete(lease._id)}
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApartmentList;
