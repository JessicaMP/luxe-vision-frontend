import axios from "axios";
import store from "@/store";
import { QuoteDTO } from "@/types/quote";
import { BookingDTO } from "@/types/bookings";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getAllBookings = () => {
  return axios.get(`${API_URL}/bookings`,{
    headers: {
      Authorization: `Bearer ${store.getState().users.token}`,
    }
  });
};

const getBookingsByStudioId = (id: string) => {
  return axios.get(`${API_URL}/studios/${id}/occupied-schedules`,{
    headers: {
      Authorization: `Bearer ${store.getState().users.token}`,
    }
  });
};

const makeQuote = (body : QuoteDTO) => {
  return axios.post(`${API_URL}/bookings/quote`, body);
};

const makeBooking = (body : BookingDTO) => {
  return axios.post(`${API_URL}/bookings`, body, {
    headers: {
      Authorization: `Bearer ${store.getState().users.token}`,
    }
  });
};

const getBookingOfUser = () => {
  return axios.get(`${API_URL}/users/reservations`,{
    headers: {
      Authorization: `Bearer ${store.getState().users.token}`,
    }
  });
};

const ApiBookings = {
  getAllBookings,
  getBookingsByStudioId,
  makeQuote,
  makeBooking,
  getBookingOfUser
};

export default ApiBookings;
