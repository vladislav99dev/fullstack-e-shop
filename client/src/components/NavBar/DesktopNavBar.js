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
      <div className="text-white hidden lg:flex justify-between items-center h-26 mx-auto px-4 xl:mx-12">
        <h1 className="w-full text-3xl font-bold text-[#00df9a] drop-shadow-xl">
          Supreme
          <br />
          Fashion Shop
        </h1>
        <div className="hidden lg:flex">
          <Link to="/men" className="desktop-links">
            Men
          </Link>
          <Link to={"/women"} className="desktop-links">
            Women
          </Link>
          <Link to={"/kids"} className="desktop-links">
            Kids
          </Link>
          <Link to={"/new"} className="desktop-links">
            New
          </Link>
          <Link to={"/sale"} className="desktop-links text-[#00df9a]">
            SALE
          </Link>
          <Link to={"/brands"} className="desktop-links">
            Brands
          </Link>

          <Link to={"/favorites"}>
            <MdFavorite size={25} color={"#00df9a"} className="mt-4 ml-12" />
          </Link>
          <Link to={"/cart"}>
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
        <div className="hidden lg:block bg-[#ffe0bd]  w-[30%] fixed right-4  mt-0 border-4 border-white rounded-lg">
          <UserLinks clickHandler={toggleDesktopUserMenu} />
        </div>
      ) : null}
    </>
  );
};

export default DesktopNavBar;
