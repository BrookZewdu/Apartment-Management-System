import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";
import Modal from "react-modal";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { tenantListState } from "../../../recoil_state";
import {
  getTenants,
  saveTenant,
  deleteTenant,
} from "../../../services/tenantService";

const TenantList = () => {
  const TenantList = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "555-555-5555",
      email: "john.doe@example.com",
      date: "2022-01-01",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: "555-555-5555",
      email: "jane.doe@example.com",
      date: "2022-01-01",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Smith",
      phoneNumber: "555-555-5555",
      email: "bob.smith@example.com",
      date: "2022-01-01",
    },
    // more Tenants...
  ];

  const [tenants, setTenants] = useRecoilState(tenantListState);
  const [form, setForm] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTenants();
      setTenants(data);
    };
    fetchData();
  }, [setTenants]);

  const handleDelete = async (id) => {
    await deleteTenant(id);
    setTenants((prevTenants) =>
      prevTenants.filter((tenant) => tenant.id !== id)
    );
  };

  const handleEdit = (tenant) => {
    setForm(tenant);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveTenant(form);
    setForm({
      id: null,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      date: "",
    });
    setIsEditing(false);
    setModalIsOpen(false);
    const data = await getTenants();
    setTenants(data);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-large mb-4 flex justify-center">
         All Tenants
        </h2>

        <table className="table-auto border-collapse w-full mt-4 mb-16">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Fist Name</th>
              <th className="border border-gray-400 px-4 py-2">Last Name</th>
              <th className="border border-gray-400 px-4 py-2">Phone Number</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Date</th>
              <th className="border border-gray-400 px-4 py-2">Image</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="border border-gray-400 px-4 py-2">
                  {tenant.firstName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {tenant.lastName}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {tenant.phoneNumber}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {tenant.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <img
                    className="h-10 w-10 object-cover rounded-full"
                    src={tenant.image}
                    alt={tenant.firstName}
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {tenant.date}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className="mx-2"
                    onClick={() => handleEdit(tenant)}
                  >
                    <PencilIcon className="h-5 w-5 text-indigo-500" />
                  </button>
                  <button
                    className="mx-2"
                    onClick={() => handleDelete(tenant.id)}
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
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
              <label className="mb-2 font-medium" htmlFor="price">
                First Name
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Last Name
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Phone Number
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
               Email
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.email}
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
export default TenantList;
