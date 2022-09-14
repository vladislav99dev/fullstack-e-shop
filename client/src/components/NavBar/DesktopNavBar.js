import { Link } from "react-router-dom";

import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";

import UserLinks from "./UserLinks";

import { useNavTogglesContext } from "../../context/NavTogglesContext";

const DesktopNavBar = () => {
  const { isDesktopUserMenuActive, toggleDesktopUserMenu } =
    useNavTogglesContext();
  return (
    <>
      <div className="text-white hidden lg:flex mt-6 justify-between items-center h-26 mx-auto px-4 xl:mx-12">
        <h1 className="w-full text-3xl font-bold text-[#00df9a] drop-shadow-xl">
          Supreme
          <br />
          Fashion Shop
        </h1>
        <div className="hidden lg:flex">
          <Link to={"/all"} className="desktop-links hover:bg-gray-300 rounded-md">
            All
          </Link>
          <Link to="products/men" className="desktop-links hover:bg-gray-300">
            Men
          </Link>
          <Link to={"products/women"} className="desktop-links hover:bg-gray-300">
            Women
          </Link>
          <Link to={"products/boys"} className="desktop-links hover:bg-gray-300">
            Boys
          </Link>
          <Link to={"products/girls"} className="desktop-links hover:bg-gray-300">
            Girls
          </Link>
          <Link to={"products/sale"} className="desktop-links text-[#00df9a]">
            SALE
          </Link>
          <Link to={"products/brands"} className="desktop-links hover:bg-gray-300">
            Brands
          </Link>

          <Link to={"products/favorites"}>
            <MdFavorite size={25} color={"#00df9a"} className="mt-4 ml-12"/>
          </Link>
          <Link to={"products/cart"}>
            <RiShoppingCart2Fill
              size={25}
              color={"#00df9a"}
              className="mt-4 ml-4 mr-4"
            />
          </Link>
          <RiUserAddFill
            size={25}
            color={"#00df9a"}
            className="mt-4 mr-6 cursor-pointer"
            onClick={toggleDesktopUserMenu}
          />
        </div>
      </div>
      {isDesktopUserMenuActive ? (
        <div className="hidden lg:block bg-[#DDDDDD]  w-[30%] fixed right-4  border-4 border-white rounded-lg">
          <UserLinks clickHandler={toggleDesktopUserMenu} />
        </div>
      ) : null}
    </>
  );
};

export default DesktopNavBar;
