import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { Trash, Pencil } from "@phosphor-icons/react";
import { apartmentListState } from "../../../recoil_state";
// import { roo msState } from "../atoms";
import {
  getApartments,
  getApartment,
  deleteApartment,
  updateApartment,
} from "../../../services/apartmentService";
import { Navigate } from "react-router-dom";

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleDelete = async (id) => {
    deleteApartment(id).then((data) => {
      getApartments().then((data) => {
        setApartments(data.data);
      });
    });
  };

  const handleEdit = (id) => {
    getApartment(id).then((data) => {
      setDescription(data.data.description);
      setStatus(data.data.available ? "Available" : "Not Available");
      setPrice(data.data.price);
      setId(data.data._id);
    });

    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.set("description", description);
    formData.set("status", status);
    formData.set("price", price);
    // formData.set("image", image);

    event.preventDefault();
    updateApartment(id, formData).then((data) => {
      getApartments().then((data) => {
        setApartments(data.data);
      });
    });

    setIsEditing(false);
    setModalIsOpen(false);
  };

  useEffect(() => {
    getApartments().then((data) => {
      setApartments(data.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col mt-8">
        <h2 className="flex justify-center mb-4 text-lg font-large">
          All Apartments
        </h2>

        <table className="w-full mt-4 mb-16 border-collapse table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-400">Description</th>
              <th className="px-4 py-2 border border-gray-400">Status</th>
              <th className="px-4 py-2 border border-gray-400">Price</th>
              {/* <th className="px-4 py-2 border border-gray-400">Image</th> */}
              <th className="px-4 py-2 border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((Apartment) => (
              <tr key={Apartment._id}>
                <td className="px-4 py-2 border border-gray-400">
                  {Apartment.description.slice(0, 47)}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {Apartment.available ? "Available" : "Not Available"}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {Apartment.price}
                </td>
                {/* <td className="px-4 py-2 border border-gray-400">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={Apartment.image}
                    alt={Apartment.title}
                  />
                </td> */}
                <td className="px-4 py-2 border border-gray-400">
                  <button
                    className="mx-2"
                    onClick={() => handleEdit(Apartment._id)}
                  >
                    <Pencil className="w-5 h-5 text-indigo-500" />
                  </button>
                  <button
                    className="mx-2"
                    onClick={() => handleDelete(Apartment._id)}
                  >
                    <Trash className="w-5 h-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => setModalIsOpen(true)}
      >
        Add Apartment
      </button> */}

      <div className="max-w-3xl max-h-screen modal">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="Modal w-96 h-96"
          overlayClassName="Overlay"
          style={{
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "auto",
              backgroundColor: "#F3F4F6",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <h2 className="mb-4 text-lg font-medium">
            {isEditing ? "Edit Apartment" : "Add Apartment"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="description">
                Apartment Description
              </label>
              <input
                className="px-3 py-2 border rounded-lg"
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="status">
                Apartment Status
              </label>
              <input
                className="px-3 py-2 border rounded-lg"
                type="text"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Apartment Price
              </label>
              <input
                className="px-3 py-2 border rounded-lg"
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* <div>
              <label
                htmlFor="image"
                className="block mb-2 font-medium text-gray-600"
              >
                Apartment Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div> */}
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              type="submit"
            >
              {isEditing ? "Save Changes" : "Add Apartment"}
            </button>
            <button
              className="px-4 py-2 ml-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              type="submit"
              onClick={() => setModalIsOpen(false)}
            >
              cancel
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default ApartmentList;
