import React from "react";
import Navbar from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        {/* Aquí puedes poner tu pie de página */}
        <p>Footer</p>
      </footer>
    </div>
  );
};
