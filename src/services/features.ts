import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;
const TOKEN = localStorage.getItem("token") || "";

const getFeatures = () => {
  return axios.get(`${API_URL}/features`);
};

const posFeature = (body: any) => {
  const headers = {
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
    },
  };
  return axios.post(`${API_URL}/features`, body, headers);
};

const putStudio = (body: any) => {
  const headers = {
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
    },
  };
  return axios.post(`${API_URL}/features`, body, headers);
};

const ApiFeatures = {
  getFeatures,
  posFeature,
  putStudio
};

export default ApiFeatures;
