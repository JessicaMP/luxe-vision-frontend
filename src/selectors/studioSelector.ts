import { RootState } from '@/store';
import { Studio } from '@/types/studio';

export const selectStudios = (state: RootState) => state.studios.studios;

export const selectStudioById = (id: number, state: RootState) =>
  state.studios.studios.find((studio: Studio) => studio.id === id);

export const selectFeatures = (state: RootState) => state.features.features;
export const selectSpecialties = (state: RootState) => state.specialties.specialties;
export const selectStudio = (state: RootState) => state.studios.studio;
export const selectStudioStatus = (state: RootState) => state.studios.status;