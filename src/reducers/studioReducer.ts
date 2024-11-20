import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ApiService from "../services/studios";
import { Studio } from "@/types";

interface StudioState {
  studios: Studio[];
  studio: Studio | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudioState = {
  studios: [],
  studio: null,
  status: 'idle',
  error: null
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
  reducers: {
    setActiveStudio: (state, action) => {
      state.studio = action.payload;
    },
    clearStudio: (state) => {
      state.studio = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
    },
    updateStudioInList: (state, action: PayloadAction<Studio>) => {
      const index = state.studios.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.studios[index] = action.payload;
      }
    },
    setActiveStudioById: (state, action: PayloadAction<number>) => {
      const studio = state.studios.find(s => s.id === action.payload);
      if (studio) {
        state.studio = studio;
      } else {
        state.studio = null; 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Studios
      .addCase(fetchStudios.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStudios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studios = action.payload;
        state.error = null;
      })
      .addCase(fetchStudios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      
    builder
      // Fetch Single Studio
      .addCase(fetchStudioById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStudioById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.studio = action.payload;
      state.error = null;
      // Actualizar también en la lista si existe
      const index = state.studios.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.studios[index] = action.payload;
        }
      })
      .addCase(fetchStudioById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
    
    builder
      // Add Studio
      .addCase(addStudio.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addStudio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studios.push(action.payload);
        state.studio = action.payload;
        state.error = null;
      })
      .addCase(addStudio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
    builder
      // Update Studio
      .addCase(updateStudio.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.studios.findIndex(
          (studio) => studio.id === action.payload.id
        );
        if (index !== -1) {
          state.studios[index] = action.payload;
        }
        state.studio = action.payload;
        state.error = null;
      })

    builder
      // Delete Studio
      .addCase(deleteStudio.fulfilled, (state, action) => {
        state.studios = state.studios.filter(
          (studio) => studio.id !== action.payload
        );
        if (state.studio?.id === action.payload) {
          state.studio = null;
        }
        state.error = null;
      });
  },
});


export const { 
  clearStudio, 
  clearError, 
  resetStatus,
  updateStudioInList,
  setActiveStudio,
  setActiveStudioById
} = studiosSlice.actions;

export default studiosSlice.reducer;
