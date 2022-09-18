import MobileNavBarManager from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";
import CartLayout from "./Cart/CartLayout";
import FavouritesLayout from "./Favourites/FavouritesLayout";

import { useNavTogglesContext } from "../../context/NavTogglesContext";

const NavBar = () => {
  const {
    isDesktopUserLinksActive,
    toggleDesktopUserMenu,
    isCartMenuActive,
    toggleCartMenu,
    isFavouritesMenuActive,
    toggleFavouritesMenu,
    isUserMobileLinksActive,
    toggleUserMenu,
    isProductsMobileLinksActive,
    toggleProductsMenu
  } = useNavTogglesContext();
  return (
    <>
      <MobileNavBarManager
      isUserMobileLinksActive={isUserMobileLinksActive}
      toggleUserMenu={toggleUserMenu}
      isProductsMobileLinksActive={isProductsMobileLinksActive}
      toggleProductsMenu={toggleProductsMenu}
      toggleCartMenu={toggleCartMenu}
      />
      <DesktopNavBar
        isDesktopUserLinksActive={isDesktopUserLinksActive}
        toggleDesktopUserMenu={toggleDesktopUserMenu}
        toggleCartMenu={toggleCartMenu}
        toggleFavouritesMenu={toggleFavouritesMenu}
      />
      {isCartMenuActive ? <CartLayout /> : null}
      {isFavouritesMenuActive ? <FavouritesLayout /> : null}
    </>
  );
};
export default NavBar;
