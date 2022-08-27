import { useState } from "react";

import {
  MobileUserMenu,
  CommonNavBar,
  IconsManager,
  MobileNavBar,
} from "./NavBarPartials";

const NavBar = () => {
  // const [navBar, setNavbar] = useState(false);
  // const [userNavbar, setuserNavbar] = useState(false);

  // const handleToggleNav = () => {
  //   setNavbar(!navBar);
  // };

  // const handleUserToggleNavbar = () => {
  //   setuserNavbar(!userNavbar);
  // };

  return (
    <>
      <MobileNavBar />
      <CommonNavBar />
    </>
    /* <IconsManager navBar={navBar} userNavbar={userNavbar} handleToggleNav={handleToggleNav} handleUserToggleNavbar={handleUserToggleNavbar}/>
      <MobileUserMenu userNavbar={userNavbar} />
      <MobileCommonMenu navBar={navBar} /> */
  );
};
export default NavBar;
