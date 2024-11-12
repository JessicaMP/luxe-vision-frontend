import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { MenuItem } from "../types";
import Avatar from "@mui/joy/Avatar";

export const Navbar = ({ isMobile, isLogin }: any) => {
  const menuItems: MenuItem[] = [
    { name: "Log in", route: "login", style: "NORMAL" },
    { name: "Register", route: "register", style: "OUTLINE" },
  ];

  const user = {
    name: "James",
    image: "/static/images/avatar/1.jpg"
  };

  if (isLogin) {
    return (
      <nav className="h-min flex items-center sm:gap-4">
        <h2 className="font-semibold text-white text-xl hidden sm:block">{user.name}</h2>
        <Avatar />
      </nav>
    );
  }

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
