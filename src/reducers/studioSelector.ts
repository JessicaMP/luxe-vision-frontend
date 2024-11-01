import { createSelector } from '@reduxjs/toolkit';

export const selectStudios = (state) => state.studios.studios;

export const selectStudioById = createSelector(
  [(state) => state.studios.studios, (_, studioId) => studioId],
  (studios, studioId) => studios.find((studio) => studio.id === studioId)
);
