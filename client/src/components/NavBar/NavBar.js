import MobileNavBarManager from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";
import CartLayout from "./Cart/CartLayout";
import FavouritesLayout from "./Favourites/FavouritesLayout";

import { useNavTogglesContext } from "../../context/NavTogglesContext";
import { useModalsContext} from "../../context/ModalsContext";
import { useAuthContext } from "../../context/AuthContext";


const NavBar = () => {
  const {setFailedModal,resetModals} = useModalsContext();
  const {user} = useAuthContext()

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



  const manageFavouritesAccess = () => {
    if(user.email) {
      resetModals();
      return toggleFavouritesMenu();
    }
    if(!user.email) return setFailedModal("You should be logged in to use this feature!")
  }
  return (
    <>
      <MobileNavBarManager
      isUserMobileLinksActive={isUserMobileLinksActive}
      toggleUserMenu={toggleUserMenu}
      isProductsMobileLinksActive={isProductsMobileLinksActive}
      toggleProductsMenu={toggleProductsMenu}
      toggleCartMenu={toggleCartMenu}
      toggleFavouritesMenu={manageFavouritesAccess}
      />
      <DesktopNavBar
        isDesktopUserLinksActive={isDesktopUserLinksActive}
        toggleDesktopUserMenu={toggleDesktopUserMenu}
        toggleCartMenu={toggleCartMenu}
        toggleFavouritesMenu={manageFavouritesAccess}
      />
      {isCartMenuActive ? <CartLayout /> : null}
      {isFavouritesMenuActive ? <FavouritesLayout /> : null}
    </>
  );
};
export default NavBar;
