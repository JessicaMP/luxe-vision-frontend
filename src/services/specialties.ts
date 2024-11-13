import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getSpecialties = () => {
  return axios.get(`${API_URL}/specialties`);
};

const ApiSpecialties = {
  getSpecialties
};

export default ApiSpecialties;
