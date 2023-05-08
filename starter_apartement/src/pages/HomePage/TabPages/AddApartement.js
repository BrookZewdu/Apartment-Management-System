import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { apartmentListState } from "../../../recoil_state";
import { saveApartment } from "../../../services/apartmentService";

function AddApartment() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [apartmentFloor, setApartmentFloor] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [apartments, setApartments] = useRecoilState(apartmentListState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("apartmentFloor", apartmentFloor);
      formData.set("apartmentNumber", apartmentNumber);
      formData.set("description", description);
      formData.set("price", price);
      console.log(images);
      images.forEach((image) => {
        formData.append("images", image);
      });
      console.log(formData);
      saveApartment(formData).then((data) => {
        console.log(data);
      });
      alert("Apartment added successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the Apartment.");
    }
  };

  const hundleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log(event.target.files);
    console.log(files);
    setImages(files);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen my-10">
        <div className="w-full max-w-md">
          <h2 className="mb-4 text-lg font-medium">Add Apartment</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-600"
              >
                Apartment Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter name"
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="apartmentFloor"
                className="block mb-2 font-medium text-gray-600"
              >
                Apartment Floor
              </label>
              <input
                type="text"
                id="apartmentFloor"
                name="apartmentFloor"
                value={apartmentFloor}
                onChange={(event) => setApartmentFloor(event.target.value)}
                placeholder="Enter floor"
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="apartmentNumber"
                className="block mb-2 font-medium text-gray-600"
              >
                Apartment Number
              </label>
              <input
                type="text"
                id="apartmentNumber"
                name="apartmentNumber"
                value={apartmentNumber}
                onChange={(event) => setApartmentNumber(event.target.value)}
                placeholder="Enter number"
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-600"
              >
                Apartment Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Enter room description"
                className="w-full h-32 p-2 border border-gray-400 rounded-md resize-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 font-medium text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Enter price"
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <div>
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
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={hundleImageUpload}
                className="w-full p-2 border border-gray-400 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Add Apartment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddApartment;
