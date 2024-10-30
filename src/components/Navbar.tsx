import React from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { MenuItem } from '../types';

export const Navbar = ({ isMobile }) => {
  const menuItems: MenuItem[] = [
    { name: 'Iniciar sesión', route: 'login', style: 'NORMAL' },
    { name: 'Crear cuenta', route: 'register', style: 'OUTLINE' },
  ];

  return (
    <nav>
      {isMobile ? (
        <MobileNav menuItems={menuItems} />
      ) : (
        <DesktopNav menuItems={menuItems} />
      )}
    </nav>
  );
};

export default Navbar;
