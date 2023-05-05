import axios from "axios";

// Define the base URL for the room API
const BASE_URL = "http://localhost:5000/api";

// const BASE_URL = "http://localhost:3000";

export const getApartments = async () => {
  const response = await axios.get(`${BASE_URL}/apartments`);
  return response.data;
};

export const saveApartment = async (Apartement) => {
  if (Apartement.id) {
    const response = await axios.put(`${BASE_URL}/apartments/${Apartement.id}`, Apartement);
    return response.data;
  } else {
    const response = await axios.post(`${BASE_URL}/apartments`, Apartement);
    return response.data;
  }
};

export const deleteApartment = async (ApartmentId) => {
  const response = await axios.delete(`${BASE_URL}/rooms/${ApartmentId}`);
  return response.data;
};

// // Define a service to fetch the list of rooms from the API
// export const fetchRoomList = async () => {
//   try {
//     const response = await axios.get(API_BASE_URL);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to fetch room list");
//   }
// };

// // Define a service to add a new room to the API
// export const addRoom = async (room) => {
//   try {
//     const response = await axios.post(API_BASE_URL, room);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to add room");
//   }
// };

// // Define a service to update an existing room in the API
// export const updateRoom = async (id, room) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/${id}`, room);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to update room");
//   }
// };

// // Define a service to delete a room from the API
// export const deleteRoom = async (id) => {
//   try {
//     const response = await axios.delete(`${API_BASE_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to delete room");
//   }
// };
// // 