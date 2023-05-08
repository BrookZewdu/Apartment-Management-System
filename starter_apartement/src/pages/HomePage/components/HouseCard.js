import React from "react";
import { useState } from "react";
import { MapPin } from "phosphor-react";
import { Link } from "react-router-dom";
import { X } from "phosphor-react";
import AppartmentDetailsModal from "./ApplicationDetailModal";
import { makeApartmentRequest } from "../../../services/apartmentService";

const HouseCard = ({ house }) => {
  const { _id, images, title, description, price } = house;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [meeting, setMeeting] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    makeApartmentRequest(_id, meeting).then((data) => {
      console.log(data.data);
      handleCloseModal();
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToDetail = () => {
    openModal();
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-md">
      {modalIsOpen && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 z-0 w-full h-full bg-gray-900 opacity-50"></div>
          <div className="z-10 w-full max-w-lg mx-auto overflow-y-auto bg-white rounded shadow-lg">
            <div class="flex justify-center bg-gray-100 border-b border-gray-200 py-3 px-4 items-center space-x-4">
              <form onSubmit={submitHandler} class="flex flex-col space-y-4">
                <div class="w-full">
                  <label
                    for="name"
                    class="block mb-2 font-medium text-gray-600"
                  >
                    Meeting Date
                  </label>
                  <input
                    type="date"
                    value={meeting}
                    onChange={(ev) => setMeeting(ev.target.value)}
                    class="w-full bg-gray-200 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div class="flex justify-end">
                  <button
                    type="button"
                    class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-4 py-2 ml-4 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Yes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="col-span-1">
        <img
          src={house.images[0].url}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="grid grid-cols-2 col-span-1 gap-4">
        <div className="col-span-2 md:col-span-1">
          <img
            src={house.images[1].url}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <img
            src={house.images[2].url}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="col-span-2">
          <h2 className="mb-2 text-lg font-bold">{house.name}</h2>
          <p className="mt-4 text-lg">{house.description}</p>
          <p className="mt-4 text-lg font-bold">${house.price}/month</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 mt-4 text-white rounded-md bg-primary hover:bg-primary-dark"
          >
            Detail
          </button>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 mt-4 ml-2 text-white rounded-md bg-primary hover:bg-primary-dark"
          >
            Apply
          </button>
          <AppartmentDetailsModal
            isOpen={isModalOpen}
            application={house}
            closeModal={() => {
              setIsModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
