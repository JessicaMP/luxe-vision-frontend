import React from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useMediaQuery } from '@mui/material';
import { MenuItem } from '../types';

export const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:768px)');

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
