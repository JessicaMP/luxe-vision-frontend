export type MenuItem = {
  name: string;
  route: string;
  style: keyof typeof STYLES;
};

export const STYLES = {
  NORMAL: "normal",
  OUTLINE: "outline",
} as const;

export interface Studio {
  id: number;
  studioName: string;
  email: string;
  phone: string;
  description: string;
  signup: Date;
  yearsOfExperience: number;
  profileImage: string;
  location: Location;
  lastUpdate: Date;
  photographers: Photographer[];
  portfolioPhotos: PortfolioPhoto[];
  studioSpecialties: StudioSpecialty[];
  studioFeatures: StudioFeature[];
}
export interface StudioFeature {
  feature: Feature;
  id: number;
}
export interface Feature {
  featureName: string;
  icon?: string;
  id: number;
}

export interface Location {
  id: number;
  city: string;
  state: string;
  country: string;
  address: string;
}

export interface Photographer {
  id?: number;
  firstName: string;
  lastName: string;
}

export interface PortfolioPhoto {
  id: number;
  image: string;
}

export interface StudioSpecialty {
  id: number;
  specialty: Specialty;
}

export interface Specialty {
  id: number;
  specialtyName: string;
  description: string;
  image: string;
}

export interface StudioState {
  studios: Studio[];
  loading: boolean;
  error: string | null;
}

export interface ErrorResponse {
  message: string;
}

export interface OpenHours {
  [key: string]: string;
}

export interface Appointment {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface Schedule {
  openHours: OpenHours;
  appointments: Appointment[];
}

export interface AvailabilityProps {
  schedule: Schedule;
  onReserve: (startTime: string, endTime: string, date: Date) => void;
}
