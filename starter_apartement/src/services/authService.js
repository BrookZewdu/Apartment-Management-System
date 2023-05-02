import axios from "axios";

export const login = async (email, password) => {
  return axios.post("/users/login", { email, password }).then((response) => {
    return response.data.user;
  });
};

export const register = async (formData) => {
  return axios.post("/users/signup", formData).then((response) => {
    return response.data.user;
  });
};
