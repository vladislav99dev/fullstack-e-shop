import MobileNavBarManager from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";
import CartLayout from "./Cart/CartLayout"
import FavouritesLayout from "./Favourites/FavouritesLayout";

import { useNavTogglesContext } from "../../context/NavTogglesContext";


const NavBar = () => {
  const {isCartMenuActive,isFavouritesMenuActive} = useNavTogglesContext(); 
  return (
    <>
      <MobileNavBarManager />
      <DesktopNavBar />
      {isCartMenuActive 
        ? <CartLayout/>
        : null
      }
      {isFavouritesMenuActive 
      ? <FavouritesLayout/>
      : null
      }
    </>
  );
};
export default NavBar;
