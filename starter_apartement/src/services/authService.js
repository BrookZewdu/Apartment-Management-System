import axios from "axios";

export const login = async (email, password) => {
    return axios.post("/users/login", { email, password }).then((response) => {
        return response.data;
    });
};

export const register = async (data) => {
    return axios.post("/users/signup", data).then((response) => {
        return response.data.data;
    });
};
