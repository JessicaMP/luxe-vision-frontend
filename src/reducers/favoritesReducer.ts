import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiFavorites from "../services/favorites";

const initialState = {
  loading: false,
  favorites: [],
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const response = await ApiFavorites.getFavorites();
    return response.data;
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (body: any) => {
    const response = await ApiFavorites.postFavorite(body);
    return response.data;
  }
);

export const deleteFavorite = createAsyncThunk(
  "favorites/deleteFavorite",
  async ({ studioId }: { studioId: number }) => {
    const response = await ApiFavorites.deleteFavorite(studioId);
    return response.data;
  }
);

export const toggleFavorite = (studioId: number) => async (dispatch, getState) => {
  const { favorites } = getState().favorites;

  if (favorites.includes(studioId)) {
    await dispatch(deleteFavorite({studioId}));
  } else {
    const body = { studioId };
    await dispatch(addFavorite(body));
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload?.studios || [];

      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        // Recupera el studioId del meta.arg
        const studioId = action.meta.arg.studioId;
        state.favorites.push(studioId);
      })
      .addCase(addFavorite.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.loading = false;
        // Recupera el studioId del meta.arg
        const studioId = action.meta.arg.studioId;
        const newFavorites = state.favorites.filter(
          (id) => id !== studioId
        )
        state.favorites = [...newFavorites]
      })
      .addCase(deleteFavorite.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default favoritesSlice.reducer;
