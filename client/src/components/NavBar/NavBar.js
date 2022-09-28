
import { useNavTogglesContext } from "../../context/NavTogglesContext";
import { useModalsContext} from "../../context/ModalsContext";
import { useAuthContext } from "../../context/AuthContext";

import MobileNavBarManager from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";
import CartLayout from "./Cart/CartLayout";
import FavouritesLayout from "./Favourites/FavouritesLayout";
import OutsideClickHandler from "react-outside-click-handler";

const NavBar = () => {
  const {modalState,setFailedModal,resetModals} = useModalsContext();
  const {user,login} = useAuthContext()

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
    toggleProductsMenu,
    outsideClick
  } = useNavTogglesContext();



  const manageFavouritesAccess = () => {
    if(user.email) {
      resetModals();
      return toggleFavouritesMenu();
    }
    if(!user.email) return setFailedModal("You should be logged in to use this feature!")
  }
  return (
    <OutsideClickHandler onOutsideClick={outsideClick}>

      <MobileNavBarManager
      isUserMobileLinksActive={isUserMobileLinksActive}
      toggleUserMenu={toggleUserMenu}
      isProductsMobileLinksActive={isProductsMobileLinksActive}
      toggleProductsMenu={toggleProductsMenu}
      toggleCartMenu={toggleCartMenu}
      toggleFavouritesMenu={manageFavouritesAccess}
      user={user}
      />
      <DesktopNavBar
        isDesktopUserLinksActive={isDesktopUserLinksActive}
        toggleDesktopUserMenu={toggleDesktopUserMenu}
        toggleCartMenu={toggleCartMenu}
        toggleFavouritesMenu={manageFavouritesAccess}
        user={user}
      />

      {isCartMenuActive ? <CartLayout 
      toggleCartMenu={toggleCartMenu}
      modalState={modalState}
      setFailedModal={setFailedModal}
      resetModals={resetModals}
      user={user}
      login={login}
      /> : null}

      {isFavouritesMenuActive ? <FavouritesLayout 
      toggleFavouritesMenu={toggleFavouritesMenu}
      modalState={modalState}
      setFailedModal={setFailedModal}
      resetModals={resetModals}
      user={user}
      login={login}
      /> : null}

    </OutsideClickHandler>
  );
};
export default NavBar;
