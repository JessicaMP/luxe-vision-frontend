import { createRoot } from "react-dom/client";
import "./index.css";
import store, { persistor } from "./store";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { fetchStudiosAPI } from "./reducers/studiosReducer";
import { fetchAllFeatures } from "./reducers/featuresReducer";
import { fetchSpecialties } from "./reducers/specialtiesReducer";

store.dispatch(fetchStudiosAPI());
store.dispatch(fetchAllFeatures());
store.dispatch(fetchSpecialties());

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
