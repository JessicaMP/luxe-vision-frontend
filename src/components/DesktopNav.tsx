import NormalBtn from './Buttons/NormalBtn';
import { MenuItem } from '../types';
import OutlineBtn from './Buttons/OutlineBtn';

type DesktopNavProps = {
  menuItems: MenuItem[];
};

const DesktopNav = ({ menuItems }: DesktopNavProps) => {
  return (
    <>
      {menuItems.map((element, index) =>
        element.style == 'NORMAL' ? (
          <NormalBtn key={index} element={element} />
        ) : (
          <OutlineBtn key={index} nombre={element.name} />
        )
      )}
    </>
  );
};

export default DesktopNav;
