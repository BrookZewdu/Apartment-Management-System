import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getTenants = async () => {
  const response = await axios.get(`${BASE_URL}/tenants`);
  return response.data;
};

export const saveTenant = async (tenant) => {
  if (tenant.id) {
    const response = await axios.put(
      `${BASE_URL}/tenants/${tenant.id}`,
      tenant
    );
    return response.data;
  } else {
    const response = await axios.post(`${BASE_URL}/tenants`, tenant);
    return response.data;
  }
};

export const deleteTenant = async (tenantId) => {
  const response = await axios.delete(`${BASE_URL}/tenants/${tenantId}`);
  return response.data;
};
