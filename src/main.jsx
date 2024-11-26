import { createRoot } from "react-dom/client";
import "./index.css";
import store, { persistor } from "./store";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { fetchStudiosAPI } from "./reducers/studiosReducer";

store.dispatch(fetchStudiosAPI());

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
