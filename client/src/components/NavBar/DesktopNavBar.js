import { Link } from "react-router-dom";

import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import {GiTigerHead} from "react-icons/gi"
import UserLinks from "./UserLinks";

import { useNavTogglesContext } from "../../context/NavTogglesContext";

const DesktopNavBar = () => {
  const { isDesktopUserLinksActive, toggleDesktopUserMenu, toggleCartMenu,toggleFavouritesMenu } =
    useNavTogglesContext();
  return (
    <>
      <div className="text-white hidden lg:flex mt-6 justify-between items-center h-26 mx-auto px-4 xl:mx-12">
        <div className="flex">
        <GiTigerHead size={100}/>
        <Link to={'products/all'} className="w-full text-3xl font-bold italic text-[#00df9a] drop-shadow-xl mt-2 ml-4">
          Supreme
          <br/>
           Fashion Shop
        </Link>
        </div>
        {/* <h1 className="w-full text-3xl font-bold text-[#00df9a] drop-shadow-xl">
          Supreme
          <br />
          Fashion Shop
        </h1> */}
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
        <div className="hidden lg:block bg-[#DDDDDD]  w-[30%] fixed right-4  border-4 border-white rounded-lg">
          <UserLinks clickHandler={toggleDesktopUserMenu} />
        </div>
      ) : null}
    </>
  );
};

export default DesktopNavBar;
