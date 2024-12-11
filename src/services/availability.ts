import axios from "axios";
import { AvailabilityDTO } from "@/types/availability";

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const getAvailableStudios = (bodyDTO : AvailabilityDTO) => {
  return axios({
    method: "get",
    url: `${API_URL}/studios/available`,
    params: {
      specialtyID: bodyDTO.specialtyId,
      date: bodyDTO.date,
      startTime: bodyDTO.startTime,
      endTime: bodyDTO.endTime
    }
  });
};

const getWorkingHoursByStudioId = (id: string) => {
  return axios.get(`${API_URL}/studios/${id}/working-hours`);
};

const getOccupiedHoursByStudioId = (id: string) => {
  return axios.get(`${API_URL}/studios/${id}/occupied-schedules`);
};

const ApiAvailability = {
  getAvailableStudios,
  getWorkingHoursByStudioId,
  getOccupiedHoursByStudioId
};

export default ApiAvailability;
