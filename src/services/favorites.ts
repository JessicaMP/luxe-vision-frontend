import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;
const TOKEN = localStorage.getItem("token") || "";

const getFavorites = () => {
  const headers = {
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
    },
  };
  return axios.get(`${API_URL}/users/favorites`, headers);
  // return { data: [5, 6] };
};

const postFavorite = (body: any) => {
  const headers = {
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
    },
  };
  return axios.post(`${API_URL}/users`, body, headers);
};

const deleteFavorite = (id: any) => {
  const headers = {
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
    },
  };
  return axios.delete(`${API_URL}/users/favorites/${id}`, headers);
};

const ApiFavorites = {
  getFavorites,
  postFavorite,
  deleteFavorite
};

export default ApiFavorites;
