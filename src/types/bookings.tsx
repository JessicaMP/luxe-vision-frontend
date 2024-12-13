export interface Booking {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  studioID: number;
  specialtyID: number;
  user: string;
}

export interface BookingDTO {
  date: string;
  startTime: string;
  endTime: string;
  studioID: number;
  specialtyID: number;
  specialRequests: string;
}
