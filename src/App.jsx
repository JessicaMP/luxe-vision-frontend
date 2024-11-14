import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminHome from "./pages/admin/Home";
import AddStudio from "./pages/admin/AddStudio";
import EditStudio from "./pages/admin/EditStudio";

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
