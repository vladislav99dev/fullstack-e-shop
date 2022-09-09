import { Link } from "react-router-dom";

import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ImMenu } from "react-icons/im";

import UserLinks from "./UserLinks";

import { useNavTogglesContext } from "../../context/NavTogglesContext";

const MobileProductsMenu = () => {
  const { toggleProductsMenu } = useNavTogglesContext();
  return (
    <>
      <div className="h-24 mt-4 flex lg:hidden">
        <h1 className="w-3/4 h-full text-3xl text-[#00df9a] font-bold ml-4 drop-shadow-xl">
          Supreme
          <br />
          Fashion Shop
        </h1>
        <IoClose
          size={50}
          color={"00df9a"}
          className="xxs:ml-4 xs:ml-8 mt-6 sm:ml-20 cursor-pointer"
          onClick={toggleProductsMenu}
        />
      </div>
      <div className="h-30 flex-row lg:hidden">
        <div className="container-links">
          <Link to={"products/all"} className="mobile-links">
            All
          </Link>
        </div>
        <div className="container-links">
          <Link to={"products/men"} className="mobile-links">
            Men
          </Link>
        </div>
        <div className="container-links">
          <Link to={"products/women"} className="mobile-links">
            Women
          </Link>
        </div>
        <div className="container-links">
          <Link to={"products/kids"} className="mobile-links">
            Kids
          </Link>
        </div>
        <div className="container-links">
          <Link
            to={"products/sale"}
            className="text-2xl font-extrabold text-[#00df9a] uppercase"
          >
            Sale
          </Link>
        </div>
        <div className="container-links">
          <Link to={"/brands"} className="mobile-links">
            Brands
          </Link>
        </div>
      </div>
    </>
  );
};

export const MobileUserMenu = () => {
  const { toggleUserMenu } = useNavTogglesContext();
  return (
    <>
      <div className="h-24 mt-4 flex lg:hidden">
        <h1 className="w-3/4 h-full text-3xl text-[#00df9a] font-bold ml-4">
          Supreme
          <br />
          Fashion Shop
        </h1>
        <IoClose
          size={50}
          color={"00df9a"}
          className="xxs:ml-4 xs:ml-8 mt-6 sm:ml-20 cursor-pointer"
          onClick={toggleUserMenu}
        />
      </div>
      <div className="h-30 flex-row  lg:hidden">
        <UserLinks clickHandler={toggleUserMenu} />
      </div>
    </>
  );
};

const MobileNavBar = () => {
  const { toggleUserMenu, toggleProductsMenu } = useNavTogglesContext();
  return (
    <div className="flex w-full mt-4 lg:hidden">
      <h1 className="text-3xl font-serif italic drop-shadow-xl text-[#00df9a] mt-4 w-1/2 xs:ml-4 md:ml-8 ">
        Supreme
        <br />
        Fashion Shop
      </h1>
      <div className="flex ml-4 h-16 mt-8 xs:ml-32 sm:ml-32 mr-2 md:ml-52">
        <Link className="px-2" to="/favorite">
          <MdFavorite size={35} color={"#00df9a"} className="mt-4" />
        </Link>
        <Link className="px-2" to="/favorite">
          <RiShoppingCart2Fill size={35} color={"#00df9a"} className="mt-4" />
        </Link>
        <RiUserAddFill
          size={35}
          color={"#00df9a"}
          className="mt-4 ml-2 mr-4 cursor-pointer"
          onClick={toggleUserMenu}
        />
        <ImMenu
          size={35}
          color={"#00df9a"}
          className="mt-4 mr-2 cursor-pointer"
          onClick={toggleProductsMenu}
        />
      </div>
    </div>
  );
};

const MobileNavBarManager = () => {
  const { isUserMenuActive, isProductsMenuActive } = useNavTogglesContext();

  if (isUserMenuActive) return <MobileUserMenu />;

  if (isProductsMenuActive) return <MobileProductsMenu />;

  return <MobileNavBar />;
};

export default MobileNavBarManager;
