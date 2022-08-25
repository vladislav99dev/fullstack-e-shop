import { useState } from "react";

import { MobileUserMenu, MobileCommonMenu, CommonNavBar,IconsManager } from "./NavBarPartials";

const NavBar = () => {
  const [navBar, setNavbar] = useState(false);
  const [userNavbar, setuserNavbar] = useState(false);

  const handleToggleNav = () => {
    setNavbar(!navBar);
  };

  const handleUserToggleNavbar = () => {
    setuserNavbar(!userNavbar);
  };

  return (
    <div className="text-white flex justify-between items-center h-26 mx-auto px-4 xl:mx-12">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        Supreme
        <br />
        Fashion Shop
      </h1>
      {/* here  */}
      <CommonNavBar/>
      <IconsManager navBar={navBar} userNavbar={userNavbar} handleToggleNav={handleToggleNav} handleUserToggleNavbar={handleUserToggleNavbar}/>
      <MobileUserMenu userNavbar={userNavbar} />
      <MobileCommonMenu navBar={navBar} />
    </div>
  );
};
export default NavBar;
