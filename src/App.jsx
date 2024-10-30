import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/photographic_studio/:id" element={<Detail />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
