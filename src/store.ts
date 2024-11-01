import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './reducers/themeSlice';
import studiosReducer from './reducers/studioSlice';

const studioPersistConfig = {
  key: 'studios',
  storage,
};

const persistedStudiosReducer = persistReducer(studioPersistConfig, studiosReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    studios: persistedStudiosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
