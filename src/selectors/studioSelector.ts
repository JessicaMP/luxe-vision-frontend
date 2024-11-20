import { RootState } from '@/store';
import { Studio } from '@/types';
import { createSelector } from '@reduxjs/toolkit';
import { setActiveStudio } from '../reducers/studiosReducer';

export const selectStudios = (state: RootState) => state.studios.studios;

export const selectStudioById = () => createSelector(
  [(state: RootState) => state.studios.studios, 
   (_: RootState, studioId: number) => studioId],
  (studios, studioId) => studios.find((studio: Studio) => studio.id === studioId)
);

export const selectFeatures = (state: RootState) => state.features.features;
export const selectSpecialties = (state: RootState) => state.specialties.specialties;
export const selectStudio = (state: RootState) => state.studios.studio;
export const selectStudioStatus = (state: RootState) => state.studios.status;