import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FormCreateStudio from "./pages/FormCreateStudio";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studio/:id" element={<Detail />} />
          <Route path="/create_studio" element={<FormCreateStudio />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
