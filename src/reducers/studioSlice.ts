import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../services/api";

const initialState = {
  studios: [],
  status: "idle",
  error: null,
  studio: {}
};

export const fetchStudios = createAsyncThunk(
  "studios/fetchStudios",
  async () => {
    const response = await ApiService.getStudios();
    return response.data;
  }
);

export const fetchRandomStudios = createAsyncThunk(
  "studios/fetchRandomStudios",
  async () => {
    const response = await ApiService.getStudiosRandom();
    return response.data;
  }
);

export const fetchStudioById = createAsyncThunk(
  "studios/fetchStudioById",
  async (id: string) => {
    const response = await ApiService.getStudioById(id);
    return response.data;
  }
);

export const addStudio = createAsyncThunk(
  "studios/addStudio",
  async (formData: FormData) => {
    const response = await ApiService.postStudio(formData);
    return response.data;
  }
);

export const updateStudio = createAsyncThunk(
  "studios/updateStudio",
  async (updatedStudio: any) => {
    const response = await ApiService.putStudio(
      updatedStudio
    );
    return response.data;
  }
);

export const deleteStudio = createAsyncThunk(
  "studios/deleteStudio",
  async (studioId: number) => {
    await ApiService.deleteStudio(studioId);
    return studioId;
  }
);

const studiosSlice = createSlice({
  name: "studios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studios = action.payload;
      })
      .addCase(fetchStudios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStudio.fulfilled, (state, action) => {
        state.studios = state.studios.filter(
          (studio) => studio.id !== action.payload
        )
      })
    builder
      .addCase(addStudio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studios.push(action.payload);
      })
      .addCase(addStudio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchStudioById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudioById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studio = action.payload;
      })
      .addCase(fetchStudioById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    builder
      .addCase(updateStudio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudio.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.studios.findIndex(
          (studio) => studio.id === action.payload.id
        );
        if (index !== -1) {
          state.studios[index] = action.payload;
        }
      })
      .addCase(updateStudio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studiosSlice.reducer;
