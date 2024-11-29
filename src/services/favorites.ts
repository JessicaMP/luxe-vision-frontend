import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getFavorites = () => axios.get(`${API_URL}/users/favorites`, getHeaders());

const postFavorite = (body: any) =>
  axios.post(`${API_URL}/users`, body, getHeaders());

const deleteFavorite = (id: any) =>
  axios.delete(`${API_URL}/users/favorites/${id}`, getHeaders());

const ApiFavorites = {
  getFavorites,
  postFavorite,
  deleteFavorite,
};

export default ApiFavorites;
