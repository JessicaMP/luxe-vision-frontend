import { QuoteDTO } from "./quote";
import { Specialty } from "./specialty";
import { StudioAvailability } from "./studio";

export interface AvailabilityDTO {
  specialty: Specialty;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface OccupiedSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export interface AvailabilityProps {
  studioAvailability: StudioAvailability;
  occupiedSlots: OccupiedSlot[];
  onReserve: (quote: QuoteDTO) => void;
}
