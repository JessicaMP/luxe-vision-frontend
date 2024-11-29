import { createSelector } from '@reduxjs/toolkit';

export const selectStudios = (state: any) => state.studios.studios;

export const selectStudioById = createSelector(
  [(state) => state.studios.studios, (_, studioId) => studioId],
  (studios, studioId) => studios.find((studio: any) => studio.id === studioId)
);

export const selectFeatures = (state: any) => state.features.features;
export const selectSpecialties = (state: any) => state.specialties.specialties;
export const selectStudio = (state: any) => state.studios.studio;

export const selectFavoritesIds = (state: any) => state.favorites?.favorites || [];
export const selectFavorites = createSelector(
  [selectStudios, selectFavoritesIds],
  (studios, favoriteIds) => {
    if (favoriteIds.length > 0) {
      return studios.filter((studio: any) => favoriteIds.includes(studio.id))
      .map((studio: any) => ({
        ...studio,
        isFavorite: true,
      }));
    }
    return [];
  }
);
