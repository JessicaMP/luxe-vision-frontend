import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Studio, StudioAvailability } from "@/types/studio";
import ApiAvailability from "@/services/availability";
import { AvailabilityDTO } from "@/types/availability";

const initialState = {
  loading: false,
  status: "idle",
  availableStudios: <Studio[]>[],
  workingHours: <StudioAvailability | null>(null),
};

export const fetchAvailableStudios = createAsyncThunk(
  "availableStudios/fetchAvailableStudios",
  async (params : AvailabilityDTO) => {
    const response = await ApiAvailability.getAvailableStudios(params);
    return response.data;
  }
);

export const fetchWorkingHoursByStudioId = createAsyncThunk(
  "availableStudios/fetchWorkingHoursByStudioId",
  async (studioId : string) => {
    const response = await ApiAvailability.getWorkingHoursByStudioId(studioId);
    return response.data;
  }
);


const availableStudiosSlice = createSlice({
  name: "availableStudios",
  initialState,
  reducers: {
    addAvailableStudios: (state, action) => {
      state.availableStudios = action.payload;
    },
    clearAvailableStudios: (state) => {
      state.availableStudios = [];
    },

    addWorkingHours: (state, action) => {
      state.workingHours = action.payload;
    },
    clearWorkingHours: (state) => {
      state.workingHours = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Available Studios
      .addCase(fetchAvailableStudios.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchAvailableStudios.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.availableStudios = action.payload;
      })
      .addCase(fetchAvailableStudios.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // Fetch Working Hours
      .addCase(fetchWorkingHoursByStudioId.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchWorkingHoursByStudioId.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.workingHours = action.payload;
      })
      .addCase(fetchWorkingHoursByStudioId.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
  },
});

export default availableStudiosSlice.reducer;