import axios from "axios";

/**
 * Application Model
 * {
            
        }
 */

// Returns the list of applications for the current user
export const getMyApplications = async () => {
    return axios.get("/me/applications").then((response) => {
        return response.data.data;
    });
};

// Returns a list of all applications
export const getAllApplications = async () => {
    return axios.get("/applications").then((response) => {
        return response.data.data;
    });
};

// Return the application model
export const getApplication = async (applicationId) => {
    return axios.get(`/applications/${applicationId}`).then((response) => {
        return response.data.data;
    });
};

// Returns the deleted application model
export const deleteApplication = async (applicationId) => {
    return axios.delete(`/applications/${applicationId}`).then((response) => {
        return response.data.data;
    });
};

// Returns the updated application model
export const updateApplication = async (applicationId, note, status) => {
    return axios
        .patch(`/applications/${applicationId}`, { note, status })
        .then((response) => {
            return response.data.data;
        });
};

// Return the application model
export const createApplication = async (gigId, note) => {
    console.log("note: ", note);
    return axios
        .post("/applications", { gig: gigId, note: note })
        .then((response) => {
            return response.data.data;
        });
};

// Returns a list of applications for this gig
export const getGigApplications = async (gigId) => {
    return axios.get(`/gigs/${gigId}/applications`).then((response) => {
        return response.data.data;
    });
};
