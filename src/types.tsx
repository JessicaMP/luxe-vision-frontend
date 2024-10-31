export type MenuItem = {
  name: string;
  route: string;
  style: keyof typeof STYLES;
};

export const STYLES = {
  NORMAL: 'normal',
  OUTLINE: 'outline',
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
  photographers: Photographer[];
  portfolioPhotos: PortfolioPhoto[];
  studioSpecialties: StudioSpecialty[];
}

export interface Location {
  id: number;
  city: string;
  state: string;
  country: string;
  address: string;
}

export interface Photographer {
  id: number;
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
}
