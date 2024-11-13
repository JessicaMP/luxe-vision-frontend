import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './reducers/themeSlice';
import studiosReducer from './reducers/studioSlice';
import featuresReducer from './reducers/featuresReducer';
import specialtiesReducer from './reducers/specialtiesReducer';

const studioPersistConfig = {
  key: 'studios',
  storage,
};

const featurePersistConfig = {
  key: 'features',
  storage,
};

const featureSpecialtiesConfig = {
  key: 'specialties',
  storage,
};

const persistedStudiosReducer = persistReducer(studioPersistConfig, studiosReducer);
const persistedFeaturesReducer = persistReducer(featurePersistConfig, featuresReducer);
const persistedSpecialtiesReducer = persistReducer(featureSpecialtiesConfig, specialtiesReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    studios: persistedStudiosReducer,
    features: persistedFeaturesReducer,
    specialties: persistedSpecialtiesReducer
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
