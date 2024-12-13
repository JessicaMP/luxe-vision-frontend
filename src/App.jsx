import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddStudio from "./pages/admin/studio/AddStudio";
import AdminHome from "./pages/admin/studio/Home";
import EditStudio from "./pages/admin/studio/EditStudio";
import HomeFeatures from "./pages/admin/feature/Home";
import AddFeature from "./pages/admin/feature/AddFeature";
import UsersHome from "./pages/admin/user/UsersTable";
import HomeSpecialies from "./pages/admin/specialy/Home";
import PrivateRoute, { PrivateRouteAuth } from "./components/PrivateRoute";
import Favorites from "./pages/Favorites";
import ConfirmQuote from "./pages/ConfirmQuote";
import Bookings from "@/pages/Bookings";
import NotFound from "@/components/pages/NotFound";
import ListSpecialtyStudios from "./pages/ListSpecialtyStudios";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studio/:id" element={<Detail />} />
          <Route
            path="/listSpecialtyStudios/:id"
            element={<ListSpecialtyStudios />}
          />

          {/* Ruta visibles despues del login */}
          <Route
            path="/favorites"
            element={
              <PrivateRouteAuth>
                <Favorites />
              </PrivateRouteAuth>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRouteAuth>
                <Bookings />
              </PrivateRouteAuth>
            }
          />
          <Route
            path="/confirm-quote"
            element={
              <PrivateRouteAuth>
                <ConfirmQuote />
              </PrivateRouteAuth>
            }
          />

          {/* Rutas protegidas para administradores */}
          <Route
            path="/administration"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/administration/create_studio"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <AddStudio />
              </PrivateRoute>
            }
          />
          <Route
            path="/administration/edit_studio/:id"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <EditStudio />
              </PrivateRoute>
            }
          />
          <Route
            path="/administration/users"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <UsersHome />
              </PrivateRoute>
            }
          />

          <Route
            path="/administration/features"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <HomeFeatures />
              </PrivateRoute>
            }
          />

          <Route
            path="/administration/create_feature"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <AddFeature />
              </PrivateRoute>
            }
          />

          <Route
            path="/administration/specialties"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <HomeSpecialies />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
