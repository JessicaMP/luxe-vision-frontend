import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FormCreateStudio from "./pages/FormCreateStudio"
function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/photographic_studio/:id" element={<Detail />} />
        <Route path="/create_studio" element={<FormCreateStudio />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
