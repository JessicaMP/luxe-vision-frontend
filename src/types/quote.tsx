import { Specialty } from "./specialty";
import { Studio } from "./studio";

export interface QuoteDTO {
  date: string;
  startTime: string;
  endTime: string;
  pricePerHour?: number;
  totalHours: number;
  studio: Studio;
  specialty: Specialty;
}

export interface Quote {
  date: string;
  startTime: string;
  endTime: string;
  hours: string;
  totalHours: string;
  pricePerHour: number;
  totalPrice: number;
  specialtyID: number;
  studioID: number;
}
