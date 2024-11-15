import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddStudio from "./pages/admin/AddStudio";
import AdminHome from "./pages/admin/Home";
import UsersHome from "./pages/admin/UsersTable";
import PrivateRoute from "./components/PrivateRoute";

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
            path="/administration/users"
            element={
              <PrivateRoute role="ROLE_ADMINISTRATOR">
                <UsersHome />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
