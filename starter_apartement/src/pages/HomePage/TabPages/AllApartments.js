import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";
import Modal from "react-modal";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { apartmentListState } from "../../../recoil_state";
// import { roo msState } from "../atoms";
import { getApartments, saveApartment, deleteApartment } from "../../../services/apartmentService";

const ApartmentList = () => {
  const Apartmentlist = [
    {
      id: 1,
      title: "Cozy Studio",
      type: "Studio",
      description:
        "A small and cozy studio apartment in the heart of the city.",
      status: "Available",
      price: 1000,
      image: "https://example.com/studio.jpg",
    },
    {
      id: 2,
      title: "Spacious Two-BedApartment",
      type: "Apartment",
      description:
        "A large two-bedApartment apartment with plenty of space and natural light.",
      status: "Occupied",
      price: 2000,
      image: "https://example.com/apartment.jpg",
    },
    {
      id: 3,
      title: "Modern Loft",
      type: "Loft",
      description:
        "A stylish and modern loft with high ceilings and industrial details.",
      status: "Available",
      price: 1500,
      image: "https://example.com/loft.jpg",
    },
    // more Apartments...
  ];

  const [apartments, setApartments] = useRecoilState(apartmentListState);
  const [form, setForm] = useState({
    id: null,
    title: "",
    type: "",
    description: "",
    status: "",
    price: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApartments();
      setApartments(data);
    };
    fetchData();
  }, [setApartments]);

  const handleDelete = async (id) => {
    await deleteApartment(id);
    setApartments((prevApartments) => prevApartments.filter((Apartment) => Apartment.id !== id));
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

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    const url = URL.createObjectURL(files[0]);
    setForm((prevForm) => ({ ...prevForm, [name]: url }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveApartment(form);
    setForm({
      id: null,
      title: "",
      type: "",
      description: "",
      status: "",
      price: "",
      image: "",
    });
    setIsEditing(false);
    setModalIsOpen(false);
    const data = await getApartments();
    setApartments(data);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-large mb-4 flex justify-center">
          All Apartments
        </h2>

        <table className="table-auto border-collapse w-full mt-4 mb-16">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Type</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Image</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((Apartment) => (
              <tr key={Apartment.id}>
                <td className="border border-gray-400 px-4 py-2">{Apartment.id}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {Apartment.title}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {Apartment.type}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {Apartment.description}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {Apartment.status}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {Apartment.price}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <img
                    className="h-10 w-10 object-cover rounded-full"
                    src={Apartment.image}
                    alt={Apartment.title}
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="mx-2" onClick={() => handleEdit(Apartment)}>
                    <PencilIcon className="h-5 w-5 text-indigo-500" />
                  </button>
                  <button
                    className="mx-2"
                    onClick={() => handleDelete(Apartment.id)}
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
              <label className="mb-2 font-medium" htmlFor="tenantName">
                Apartment Title
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="text"
                id="tenantName"
                name="tenantName"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Apartment Type
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.type}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Apartment Description
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Apartment Status
              </label>
              <input
                className="border rounded-lg py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={form.status}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-medium" htmlFor="price">
                Apartment Price
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
            <div>
              <label
                htmlFor="image"
                className="text-gray-600 mb-2 block font-medium"
              >
                Apartment Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                required
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
