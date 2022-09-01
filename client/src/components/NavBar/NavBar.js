import { useState } from "react";

import MobileNavBarManager from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";

const NavBar = () => {
  const [isUserMenuActive, setIsUserMenuActive] = useState(false);
  const [isProductsMenuActive, setIsProductsMenuActive] = useState(false);
  const [isDesktopUserMenuActive, setIsDesktopUserMenuActive] = useState(false);


  const toggleUserMenu = () => {
    setIsUserMenuActive(!isUserMenuActive);
    setIsProductsMenuActive(false);
  };

  const toggleProductsMenu = () => {
    setIsProductsMenuActive(!isProductsMenuActive);
    setIsUserMenuActive(false);
  };

  const toggleDesktopUserMenu = () => {
    setIsDesktopUserMenuActive(!isDesktopUserMenuActive)
  }

  return (
    <>
      <MobileNavBarManager
        toggleUserMenu={toggleUserMenu}
        isUserMenuActive={isUserMenuActive}
        toggleProductsMenu={toggleProductsMenu}
        isProductsMenuActive={isProductsMenuActive}
        toggleDesktopUserMenu={toggleDesktopUserMenu}
      />
      <DesktopNavBar/>
    </>
  );
};
export default NavBar;
