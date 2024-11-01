// src/reducers/studioSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  studios: [],
  status: 'idle', 
  error: null,
};

const API_URL = 'http://54.234.87.12:8080/';

export const fetchStudios = createAsyncThunk('studios/fetchStudios', async () => {
  const response = await axios.get(API_URL+'studios');
  return response.data;
});

export const fetchRandomStudios = createAsyncThunk('studios/fetchRandomStudios', async () => {
  const response = await axios.get(API_URL+'studios/random');
  return response.data;
});

export const addStudio = createAsyncThunk(API_URL+'studios/addStudio', async (newStudio) => {
  const response = await axios.post('/api/studios', newStudio);
  return response.data;
});

export const updateStudio = createAsyncThunk(API_URL+'studios/updateStudio', async (updatedStudio) => {
  const response = await axios.put(`/api/studios/${updatedStudio.id}`, updatedStudio);
  return response.data;
});

export const deleteStudio = createAsyncThunk(API_URL+'studios/deleteStudio', async (studioId) => {
  await axios.delete(`/api/studios/${studioId}`);
  return studioId;
});

const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudios.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = action.payload;
      })
      .addCase(fetchStudios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudio.fulfilled, (state, action) => {
        state.studios.push(action.payload);
      })
      .addCase(updateStudio.fulfilled, (state, action) => {
        const index = state.studios.findIndex(studio => studio.id === action.payload.id);
        if (index !== -1) {
          state.studios[index] = action.payload;
        }
      })
      .addCase(deleteStudio.fulfilled, (state, action) => {
        state.studios = state.studios.filter(studio => studio.id !== action.payload);
      });
  },
});

export default studiosSlice.reducer;
