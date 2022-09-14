import MobileNavBarManager from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";
import CartLayout from "./Cart/CartLayout"

import { useNavTogglesContext } from "../../context/NavTogglesContext";


const NavBar = () => {
  const {isCartMenuActive} = useNavTogglesContext(); 
  return (
    <>
      <MobileNavBarManager />
      <DesktopNavBar />
      {isCartMenuActive 
        ? <CartLayout/>
        : null
      }
    </>
  );
};
export default NavBar;
