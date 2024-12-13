import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './reducers/themeSlice';
import studiosReducer from './reducers/studiosReducer';
import featuresReducer from './reducers/featuresReducer';
import specialtiesReducer from './reducers/specialtiesReducer';
import availableStudiosReducer from './reducers/availableStudios';
import authSlice from '@/reducers/authReducer';
import favoritesReducer from './reducers/favoritesReducer';
import favoritesMiddleware from "@/middleware/favorites";
import bookingsReducer from './reducers/bookingReducer';
import { createTransform } from 'redux-persist';

const EXPIRATION_TIME = 4 * 60 * 60 * 1000; // 4 horas en milisegundos

const checkExpirationMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Verificar timestamps y dispatch acciones de recarga si es necesario
  Object.keys(state).forEach((key) => {
    if (state[key]?._timestamp) {
      const now = Date.now();
      if (now - state[key]._timestamp > EXPIRATION_TIME) {
        // Dispatch acciones para recargar datos
        store.dispatch({ type: `${key}/reload` });
      }
    }
  });

  return result;
};

const createExpirationTransform = (expirationTime: number) => {
  return createTransform(
    (inboundState) => {
      return {
        ...inboundState,
        _timestamp: Date.now(),
      };
    },
    (outboundState) => {
      if (outboundState && outboundState._timestamp) {
        const now = Date.now();
        if (now - outboundState._timestamp > EXPIRATION_TIME) {
          return undefined;
        }
        const { _timestamp, ...state } = outboundState;
        return state;
      }
      return outboundState;
    }
  );
};

const expirationTransform = createExpirationTransform(EXPIRATION_TIME);

const authPersistConfig = {
  key: 'users',
  storage,
  whitelist: ["token", "user"],
  transforms: [expirationTransform],
};

const studioPersistConfig = {
  key: "studios",
  storage,
  transforms: [expirationTransform],
};

const featurePersistConfig = {
  key: "features",
  storage,
  transforms: [expirationTransform],
};

const featureSpecialtiesConfig = {
  key: "specialties",
  storage,
  transforms: [expirationTransform],
};

const favoritePersistConfig = {
  key: "favorites",
  storage,
  transforms: [expirationTransform],
  whitelist: ["favorites"],
};

const availabilityPersistConfig = {
  key: "availability",
  storage,
  transforms: [expirationTransform],
};

const bookingsPersistConfig = {
  key: "bookings",
  storage,
  transforms: [expirationTransform],
};

const persistedStudiosReducer = persistReducer(studioPersistConfig, studiosReducer);
const persistedFeaturesReducer = persistReducer(featurePersistConfig, featuresReducer);
const persistedSpecialtiesReducer = persistReducer(featureSpecialtiesConfig, specialtiesReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedFavoriteReducer = persistReducer(favoritePersistConfig, favoritesReducer);
const persistedAvailabilityReducer = persistReducer(availabilityPersistConfig, availableStudiosReducer);
const persistedBookingsReducer = persistReducer(bookingsPersistConfig, bookingsReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    studios: persistedStudiosReducer,
    features: persistedFeaturesReducer,
    specialties: persistedSpecialtiesReducer,
    users: persistedAuthReducer,
    favorites: persistedFavoriteReducer,
    availability: persistedAvailabilityReducer,
    bookings: persistedBookingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(favoritesMiddleware, checkExpirationMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
