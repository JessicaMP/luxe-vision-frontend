import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;
const TOKEN = localStorage.getItem("token") || "";

const getStudios = () => {
  return axios.get(`${API_URL}/studios`);
};

const getStudiosRandom = () => {
  return axios.get(`${API_URL}/studios/random`);
};

const getStudioById = (id: string) => {
  return axios.get(`${API_URL}/studios/${id}`);
};

const postStudio = (body: FormData) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(`${API_URL}/studios`, body, headers);
};

const putStudio = (body: FormData) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.put(`${API_URL}/studios`, body, headers);
};

const deleteStudio = (id: string) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  return axios.delete(`${API_URL}/studios/${id}`, headers);
};

const ApiService = {
  getStudios,
  getStudiosRandom,
  getStudioById,
  postStudio,
  putStudio,
  deleteStudio,
};

export default ApiService;
