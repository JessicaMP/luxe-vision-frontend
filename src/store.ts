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

const authPersistConfig = {
  key: 'users',
  storage,
  whitelist: ["token", "user"],
};

const studioPersistConfig = {
  key: "studios",
  storage,
};

const featurePersistConfig = {
  key: "features",
  storage,
};

const featureSpecialtiesConfig = {
  key: "specialties",
  storage,
};

const favoritePersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["favorites"],
};

const availabilityPersistConfig = {
  key: "availability",
  storage,
};

const bookingsPersistConfig = {
  key: "bookings",
  storage,
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
    }).concat(favoritesMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
