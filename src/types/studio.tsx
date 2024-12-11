import {Feature} from "./feature";
import {Photographer} from "./photographer";
import {Specialty} from "./specialty";

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
  isFavorite?: boolean;
  studioPrices?: StudioPrices[];
}

export interface StudioAvailability {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface StudioFeature {
  feature: Feature;
  id: number;
}

export interface StudioSpecialty {
  id: number;
  specialty: Specialty;
}

export interface PortfolioPhoto {
  id: number;
  image: string;
}

export interface Location {
  id: number;
  city: string;
  state: string;
  country: string;
  address: string;
}

export interface StudioState {
  studios: Studio[];
  loading: boolean;
  error: string | null;
}

export interface StudioPrices {
  id: number;
  studioID: number;
  specialtyID: number;
  price: number;
}
