import { fetchFavorites } from "@/reducers/favoritesReducer";

const favoritesMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if ((action.type === "users/login/fulfilled" || action.type === "users/register/fulfilled") &&
  store.getState().favorites.favorites.length === 0 ) {
    store.dispatch(fetchFavorites());
  }

  return result;
};

export default favoritesMiddleware;
