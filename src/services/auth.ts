import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });
  const { token } = response.data.jwt;
  if (token) {
    localStorage.setItem("token", token);
    console.log("Token guardado en login:", token);
  }
  return response;
};

const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  const { token } = response.data.jwt;
  if (token) {
    localStorage.setItem("token", token);
    console.log("Token guardado en register:", token);
  }
  return response;
};

const getProfile = () => {
  const token = localStorage.getItem("token");
  console.log("Token guardado en register:", token);
  return axios.get(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found for logout.");

  const response = await axios.post(`${API_URL}/users/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Logout exitoso en backend:", response.data);
  localStorage.removeItem("token");
  return response.data;
};

const AuthService = {
  login,
  register,
  getProfile,
  logout,
};

export default AuthService;
