import { Link } from "react-router-dom";


import OutsideClickHandler from "react-outside-click-handler";
import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import {GiTigerHead} from "react-icons/gi"

import UserLinks from "./UserLinks";


const DesktopNavBar = ({
  isDesktopUserLinksActive,
  toggleDesktopUserMenu,
  toggleCartMenu,
  toggleFavouritesMenu,
  user,
  outsideClick
}) => {
  return (
    <>
      <div  className="text-white w-[95%] hidden lg:flex justify-between items-center h-26 px-4 bg-[#28282B] rounded-full ml-[2.5%] mr-[2.5%] sticky top-0 z-20">
        <div className="flex">
        <GiTigerHead size={100}/>
        <Link to={'/home'} className="w-full text-3xl font-bold italic text-[#00df9a] drop-shadow-xl mt-2 ml-4">
          Supreme
          <br/>
           Fashion Shop
        </Link>
        </div>
        <div className="hidden lg:flex">
          <Link to={"products/all"} className="desktop-links">
            All
          </Link>
          <Link to="products/men" className="desktop-links">
            Men
          </Link>
          <Link to={"products/women"} className="desktop-links">
            Women
          </Link>
          <Link to={"products/boys"} className="desktop-links">
            Boys
          </Link>
          <Link to={"products/girls"} className="desktop-links">
            Girls
          </Link>
          <Link to={"products/sale"} className="desktop-links text-[#00df9a] hover:bg-gray-200">
            SALE
          </Link>
          <Link to={"products/brands"} className="desktop-links">
            Brands
          </Link>
            <MdFavorite onClick={toggleFavouritesMenu} size={25} color={"#00df9a"} className="mt-4 ml-12 hover:cursor-pointer"/>
            <RiShoppingCart2Fill
              size={25}
              color={"#00df9a"}
              className="mt-4 ml-4 mr-4 hover:cursor-pointer"
              onClick={toggleCartMenu}
            />
          <RiUserAddFill
            size={25}
            color={"#00df9a"}
            className="mt-4 mr-6 cursor-pointer"
            onClick={toggleDesktopUserMenu}
          />
        </div>
      </div>
      {isDesktopUserLinksActive ? (
        <div className="hidden lg:block bg-black  w-[30%] fixed right-4  border-4 border-[#00df9a] rounded-lg z-10 mr-12">
          <OutsideClickHandler onOutsideClick={outsideClick}>
            <UserLinks clickHandler={toggleDesktopUserMenu} user={user}/>
          </OutsideClickHandler>
        </div>
      ) : null}
    </>
  );
};

export default DesktopNavBar;
