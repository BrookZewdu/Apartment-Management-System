import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";
import { apartmentListState } from "../../../recoil_state";
import {
  saveApartment,

} from "../../../services/apartmentService";


function AddApartment() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    image: "",
  });

  const [apartments, setApartments] = useRecoilState(apartmentListState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newApartment = await saveApartment(form);
      setApartments([...apartments, newApartment]);
      setForm({
        title: "",
        type: "",
        description: "",
        price: "",
        image: "",
      });
      alert("Apartment added successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the Apartment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen my-10">
        <div className="w-full max-w-md">
          <h2 className="text-lg font-medium mb-4">Add Apartment</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="title"
                className="text-gray-600 mb-2 block font-medium"
              >
                Apartment Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter room title"
                className="border border-gray-400 rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="text-gray-600 mb-2 block font-medium"
              >
                Apartment Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Enter room type"
                className="border border-gray-400 rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-gray-600 mb-2 block font-medium"
              >
                Apartment Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter room description"
                className="border border-gray-400 rounded-md p-2 w-full h-32 resize-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="text-gray-600 mb-2 block font-medium"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="border border-gray-400 rounded-md p-2 w-full"
                required
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
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Apartment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddApartment;
