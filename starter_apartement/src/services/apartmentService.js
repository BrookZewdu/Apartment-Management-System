import axios from "axios";

export const getApartments = async () => {
  return await axios.get(`/apartments`).then((response) => {
    return response.data;
  });
};

export const updateApartment = async (ApartmentId, formData) => {
  return await axios
    .put(`/apartments/update/${ApartmentId}`, formData)
    .then((response) => {
      return response.data;
    });
};

export const getApartment = async (ApartmentId) => {
  return await axios.get(`/apartments/${ApartmentId}`).then((response) => {
    return response.data;
  });
};

export const saveApartment = async (Apartement) => {
  return await axios
    .post(`/apartments/createApartment`, Apartement)
    .then((response) => {
      return response.data;
    });
  // }
};

export const deleteApartment = async (ApartmentId) => {
  return await axios
    .delete(`/apartments/delete/${ApartmentId}`)
    .then((response) => {
      return response.data;
    });
};

export const freeApartment = async () => {
  return await axios.get(`/apartments/free/apartment`).then((response) => {
    return response.data;
  });
};

export const occupiedApartment = async () => {
  return await axios.get(`/apartments/occupied/apartment`).then((response) => {
    return response.data;
  });
};

export const addReview = async (review, id) => {
  return await axios
    .put(`/apartments/addReview/${id}`, review)
    .then((response) => {
      return response.data;
    });
};

export const makeApartmentRequest = async (id, date) => {
  return axios
    .post(`/users/makeApartmentRequest`, { id, meetingDate: date })
    .then((response) => {
      return response.data;
    });
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
