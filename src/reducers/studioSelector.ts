import { createSelector } from '@reduxjs/toolkit';

export const selectStudios = (state: any) => state.studios.studios;

export const selectStudioById = createSelector(
  [(state) => state.studios.studios, (_, studioId) => studioId],
  (studios, studioId) => studios.find((studio: any) => studio.id === studioId)
);

export const selectFeatures = (state: any) => state.features.features;
export const selectSpecialties = (state: any) => state.specialties.specialties;
