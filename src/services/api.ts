import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getStudiosRandom = () => {
  return axios.get(`${API_URL}/studios/random`);
};

const getStudioById = (id: string) => {
  return axios.get(`${API_URL}/studios/${id}`);
};

const postStudio = (body: any) => {
  return axios.post(`${API_URL}/studios`, body);
};

const ApiService = {
  getStudiosRandom,
  getStudioById,
  postStudio,
};

export default ApiService;
