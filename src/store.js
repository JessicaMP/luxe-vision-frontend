import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/themeSlice';
import studiosReducer from './reducers/studioSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    studios: studiosReducer,
  },
});

export default store;
