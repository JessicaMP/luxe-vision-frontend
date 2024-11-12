import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getStudios = () => {
  return axios.get(`${API_URL}/studios`);
};

const getStudiosRandom = () => {
  return axios.get(`${API_URL}/studios/random`);
};

const getStudioById = (id: string) => {
  return axios.get(`${API_URL}/studios/${id}`);
};

const postStudio = (body: any) => {
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  return axios.post(`${API_URL}/studios`, body, headers);
};

const putStudio = (id:number,body: any) => {
  return axios.put(`${API_URL}/studios/${id}`, body);
};

const deleteStudio = (id:number) => {
  return axios.delete(`${API_URL}/studios/${id}`);
};

const ApiService = {
  getStudios,
  getStudiosRandom,
  getStudioById,
  postStudio,
  putStudio,
  deleteStudio
};

export default ApiService;