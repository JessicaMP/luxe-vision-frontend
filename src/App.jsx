import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddStudio from "./pages/admin/studio/AddStudio";
import AdminHome from "./pages/admin/studio/Home";
import EditStudio from "./pages/admin/studio/EditStudio";
import HomeFeatures from "./pages/admin/feature/Home";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studio/:id" element={<Detail />} />
          {/* Routes Admin */}
          <Route path="/administration" element={<AdminHome />} />
          <Route path="/administration/create_studio" element={<AddStudio />} />
          <Route path="/administration/edit_studio/:id" element={<EditStudio />} />
          <Route path="/administration/features" element={<HomeFeatures />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
