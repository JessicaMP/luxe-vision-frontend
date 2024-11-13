import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getFeatures = () => {
  return axios.get(`${API_URL}/features`);
};

const ApiFeatures = {
  getFeatures
};

export default ApiFeatures;
