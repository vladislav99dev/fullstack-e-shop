import { useState } from "react";

import { DesktopNavBar, SomethingIShouldName } from "./NavBarPartials";

const NavBar = () => {
  const [isUserMenuActive, setIsUserMenuActive] = useState(false);
  const [isProductsMenuActive, setIsProductsMenuActive] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuActive(!isUserMenuActive);
    setIsProductsMenuActive(false);
    console.log("clicking");
  };

  const toggleProductsMenu = () => {
    setIsProductsMenuActive(!isProductsMenuActive);
    setIsUserMenuActive(false);
    console.log("clicking");
  };

  return (
    <>
      <SomethingIShouldName
        toggleUserMenu={toggleUserMenu}
        isUserMenuActive={isUserMenuActive}
        toggleProductsMenu={toggleProductsMenu}
        isProductsMenuActive={isProductsMenuActive}
      />
      <DesktopNavBar />
    </>
  );
};
export default NavBar;
