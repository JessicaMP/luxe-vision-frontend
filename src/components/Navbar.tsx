import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/joy/Button";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap p-6 gap-6">
      <Button
        variant="plain"
        size="lg"
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Link to="/login">Crear cuenta</Link>
      </Button>

      <Button
        variant="outlined"
        size="lg"
        sx={{
          color: "white",
          borderColor: "#FFA987CC",
          borderRadius: "10px",
          "&:hover": {
            borderColor: "#FFA987CC",
            backgroundColor: "rgba(255, 169, 135, 0.1)",
          },
        }}
      >
        <Link to="/register">Iniciar sesión</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
