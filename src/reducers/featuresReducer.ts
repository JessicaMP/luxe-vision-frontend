import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiFeatures from "../services/features";

const initialState = {
  loading: false,
  features: [],
};

export const fetchAllFeatures = createAsyncThunk(
  "features/fetchAllFeatures",
  async () => {
    const response = await ApiFeatures.getFeatures();
    return response.data;
  }
);

export const addFeature = createAsyncThunk(
  "features/addFeature",
  async (body: any) => {
    const response = await ApiFeatures.posFeature(body);
    return response.data;
  }
);

export const updateFeature = createAsyncThunk(
  "features/updateFeature",
  async (updatedStudio: any) => {
    const response = await ApiFeatures.putStudio(
      updatedStudio
    );
    return response.data;
  }
);

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeatures.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload;
      })
      .addCase(fetchAllFeatures.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(addFeature.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.features.push(action.payload);
      })
      .addCase(addFeature.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(updateFeature.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFeature.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.features.findIndex(
          (feature) => feature.id === action.payload.id
        );
        if (index !== -1) {
          state.features[index] = action.payload;
        }
      })
      .addCase(updateFeature.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default featuresSlice.reducer;
