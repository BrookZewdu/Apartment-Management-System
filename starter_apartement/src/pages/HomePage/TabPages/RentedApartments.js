import React, { useState } from "react";
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";
import Modal from "react-modal";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";

const ApartmentList = () => {
  const [apartments, setApartments] = useState([
    { id: 1, tenantName: "John Doe", price: 1500 },
    { id: 2, tenantName: "Jane Smith", price: 2000 },
    { id: 3, tenantName: "Bob Johnson", price: 1800 },
  ]);
  const [form, setForm] = useState({ id: null, tenantName: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = (id) => {
    setApartments((prevApartments) =>
      prevApartments.filter((apartment) => apartment.id !== id)
    );
  };

  const handleEdit = (apartment) => {
    setForm(apartment);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setApartments((prevApartments) =>
        prevApartments.map((apartment) =>
          apartment.id === form.id ? form : apartment
        )
      );
    } else {
      setApartments((prevApartments) => [
        ...prevApartments,
        { ...form, id: Date.now() },
      ]);
    }
    setForm({ id: null, tenantName: "", price: "" });
    setIsEditing(false);
    setModalIsOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-large mb-4 flex justify-center ">
          Apartements on Rent
        </h2>

        <table className="table-auto border-collapse w-full mt-4 mb-16">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">#</th>
              <th className="border border-gray-400 px-4 py-2">Tenant Name</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((apt) => (
              <tr key={apt.id}>
                <td className="border border-gray-400 px-4 py-2">{apt.id}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {apt.tenantName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {apt.price}
                </td>
                <td className="border border-gray-400 px-4 py-2 flex justify-end items-center">
                  <button
                    className="text-green-500 hover:text-green-700 mr-2"
                    title="Edit Apartment"
                    onClick={() => handleEdit(apt)}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    title="Delete Apartment"
                    onClick={() => handleDelete(apt.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setModalIsOpen(true)}
      >
        Add Apartment
      </button> */}

      <div className="modal max-w-3xl max-h-screen">
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
          <h2 className="text-lg font-medium mb-4">
            {isEditing ? "Edit Apartment" : "Add Apartment"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="tenantName">
                Tenant Name
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="text"
                id="tenantName"
                name="tenantName"
                value={form.tenantName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Price
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {isEditing ? "Save Changes" : "Add Apartment"}
            </button>
          </form>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default ApartmentList;
