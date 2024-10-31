import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getStudiosRandom = () => {
  return axios.get(`${API_URL}/studios/random`);
};

const getStudioById = (id: string) => {
  return axios.get(`${API_URL}/studios/${id}`);
};

const ApiService = {
  getStudiosRandom,
  getStudioById
};

export default ApiService;
