import { useState } from "react";

import { DesktopNavBar, MobileNavManager } from "./NavBarPartials";

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
      <MobileNavManager
        toggleUserMenu={toggleUserMenu}
        isUserMenuActive={isUserMenuActive}
        toggleProductsMenu={toggleProductsMenu}
        isProductsMenuActive={isProductsMenuActive}
      />
      <DesktopNavBar 
      toggleDesktopUserMenu={toggleDesktopUserMenu}
      isDesktopUserMenuActive={isDesktopUserMenuActive}
      />
    </>
  );
};
export default NavBar;
