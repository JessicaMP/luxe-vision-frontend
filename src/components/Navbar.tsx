import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { MenuItem } from '../types';

export const Navbar = ({ isMobile }) => {
  const menuItems: MenuItem[] = [
    { name: 'Log in', route: 'login', style: 'NORMAL' },
    { name: 'Register', route: 'register', style: 'OUTLINE' },
  ];

  return (
    <nav className="h-min">
      {isMobile ? (
        <MobileNav menuItems={menuItems} />
      ) : (
        <DesktopNav menuItems={menuItems} />
      )}
    </nav>
  );
};

export default Navbar;
