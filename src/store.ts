import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './reducers/themeSlice';
import studiosReducer from './reducers/studiosReducer';
import featuresReducer from './reducers/featuresReducer';
import specialtiesReducer from './reducers/specialtiesReducer';
import authSlice from './reducers/authReducer';

const authPersistConfig = {
  key: 'users',
  storage,
  whitelist: ["token", "user"],
};


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['studios', 'features', 'specialties'], 
};

const rootReducer = combineReducers({
  theme: themeReducer,
  studios: studiosReducer,
  features: featuresReducer,
  specialties: specialtiesReducer,
  users: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;