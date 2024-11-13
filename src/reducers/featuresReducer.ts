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
  },
});

export default featuresSlice.reducer;
