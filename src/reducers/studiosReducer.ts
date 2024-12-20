import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Studio, StudioPrices } from "@/types/studio";
import ApiService from "@/services/studios";

interface StudioState {
  studios: Studio[];
  studio: Studio | null;
  studioPrices: StudioPrices[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudioState = {
  studios: [],
  studioPrices: [],
  studio: null,
  status: 'idle',
  error: null
};

export const fetchStudiosAPI = createAsyncThunk('studios/fetchStudiosAPI', async () => {
  const response = await ApiService.getStudios();
  return response.data;
});

export const fetchStudioByIdAPI = createAsyncThunk('studios/fetchStudioByIdAPI', async (id: string) => {
  const response = await ApiService.getStudioById(id);
  return response.data;
});

export const createStudioAPI = createAsyncThunk('studios/createStudio', async (body: FormData) => {
  const response = await ApiService.postStudio(body);
  return response.data;
});

export const updateStudioAPI = createAsyncThunk('studios/updateStudio', async (body: FormData) => {
  const response = await ApiService.putStudio(body);
  return response.data;
});

export const deleteStudioAPI = createAsyncThunk('studios/deleteStudio', async (id: string) => {
  await ApiService.deleteStudio(id);
  return id;
});

export const fetchStudioPricesAPI = createAsyncThunk('studios/fetchStudioPrices', async (id: string) => {
  const response = await ApiService.getStudioPrices(id);
  return response.data;
});

const studiosSlice = createSlice({
  name: "studios",
  initialState,
  reducers: {
    addStudio: (state, action) => {
      state.studios.push(action.payload);
    },
    updateStudio: (state, action) => {
      const index = state.studios.findIndex(studio => studio.id === action.payload.id);
      if (index !== -1) {
        state.studios[index] = action.payload;
      }
    },
    deleteStudio: (state, action) => {
      state.studios = state.studios.filter(studio => studio.id !== action.payload);
    },
    selectStudioById: (state, action) => {
      state.studio = state.studios.find(studio => studio.id === action.payload) || null;
    },
    setStudio: (state, action) => {
      state.studio = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch All Studios
      .addCase(fetchStudiosAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudiosAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = action.payload;
      })
      .addCase(fetchStudiosAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error desconocido';
      })

      //Update Studio
      .addCase(updateStudioAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStudioAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.studio = action.payload;
        state.studios = state.studios.map(studio => studio.id === action.payload.id ? action.payload : studio);
      })
      .addCase(updateStudioAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error desconocido';
      })

      //Delete Studio
      .addCase(deleteStudioAPI.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteStudioAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.studios = state.studios.filter(studio => studio.id.toString() !== action.payload);
      })
      .addCase(deleteStudioAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error desconocido';
      })
      //Fetch prices of studio
      .addCase(fetchStudioPricesAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudioPricesAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studioPrices = action.payload;
        if(state.studio){
          state.studio.studioPrices = action.payload
        }
      })
      .addCase(fetchStudioPricesAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error desconocido';
      })
  }
});
export const { addStudio, updateStudio, deleteStudio ,selectStudioById, setStudio} = studiosSlice.actions;

export default studiosSlice.reducer;
