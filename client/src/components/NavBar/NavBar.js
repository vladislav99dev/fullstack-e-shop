import { useState } from "react";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { RiUserAddFill, RiShoppingCart2Fill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";

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
      <div className="hidden lg:flex">
        <Link to="/men" className="p-4 text-xl font-bold">
          Men
        </Link>
        <Link to={"/women"} className="p-4 text-xl font-bold">
          Women
        </Link>
        <Link to={"/kids"} className="p-4 text-xl font-bold">
          Kids
        </Link>
        <Link to={"/new"} className="p-4 text-xl font-bold">
          New
        </Link>
        <Link to={"/sale"} className="p-4 text-xl font-bold text-[#00df9a]">
          SALE
        </Link>
        <Link to={"/brands"} className="p-4 text-xl font-bold">
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
        <Link to={"#"}>
          <RiUserAddFill size={25} color={"#00df9a"} className="mt-4 mr-6" />
        </Link>
      </div>
      <div className="flex lg:hidden">
        {navBar ? (
          <IoClose
            onClick={handleToggleNav}
            size={40}
            color={"#00df9a"}
            className="mt-6"
          />
        ) : (
          <>
            <Link to={"/favorites"}>
              <MdFavorite size={35} color={"#00df9a"} />
            </Link>
            <Link to={"/cart"}>
              <RiShoppingCart2Fill
                size={35}
                color={"#00df9a"}
                className="ml-4"
              />
            </Link>
            <RiUserAddFill
              onClick={handleUserToggleNavbar}
              size={35}
              color={"#00df9a"}
              className="ml-4"
            />
            {userNavbar ? (
              <IoClose
                onClick={handleUserToggleNavbar}
                size={40}
                color={"#00df9a"}
              />
            ) : (
              <ImMenu
                onClick={handleToggleNav}
                size={35}
                color={"#00df9a"}
                className="ml-4"
              />
            )}
          </>
        )}
      </div>
      <div
        className={
          userNavbar
            ? "lg:hidden fixed left-0 top-0 w-[95%] h-full  bg-[#000300]"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] ml-4 mt-4">
          Supreme
          <br />
          Fashion Shop
        </h1>
        <ul className="pt-10 uppercase">
          <Link to={"/men"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              Login
            </li>
          </Link>
          <Link to={"/women"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              Register
            </li>
          </Link>
        </ul>
      </div>
      <div
        className={
          navBar
            ? "lg:hidden fixed left-0 top-0 w-[94%] h-full  bg-[#000300]"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] ml-4 mt-4">
          Supreme
          <br />
          Fashion Shop
        </h1>
        <ul className="pt-10 uppercase">
          <Link to={"/men"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              Men
            </li>
          </Link>
          <Link to={"/women"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              Women
            </li>
          </Link>
          <Link to={"/kids"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              Kids
            </li>
          </Link>
          <Link to={"/new"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              New
            </li>
          </Link>
          <Link to={"/sale"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              Sale
            </li>
          </Link>
          <Link to={"/brands"}>
            <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
              Brands
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
