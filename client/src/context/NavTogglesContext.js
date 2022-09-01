import { createContext, useContext, useState } from "react";

const NavTogglesContext = createContext();

export const NavTogglesProvider = ({ children }) => {
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
    setIsDesktopUserMenuActive(!isDesktopUserMenuActive);
  };

  return (
    <NavTogglesContext.Provider
      value={{
        isUserMenuActive,
        toggleUserMenu,
        isProductsMenuActive,
        toggleProductsMenu,
        isDesktopUserMenuActive,
        toggleDesktopUserMenu,
      }}
    >
      {children}
    </NavTogglesContext.Provider>
  );
};

export const useNavTogglesContext = () => {
  const navToggles = useContext(NavTogglesContext);
  return navToggles;
};
