import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiSpecialties from "../services/specialties";

const initialState = {
  loading: false,
  specialties: [],
};

export const fetchSpecialties = createAsyncThunk(
  "specialties/fetchSpecialties",
  async () => {
    const response = await ApiSpecialties.getSpecialties();
    return response.data;
  }
);

const specialtiesSlice = createSlice({
  name: "specialties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.loading = false;
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default specialtiesSlice.reducer;
