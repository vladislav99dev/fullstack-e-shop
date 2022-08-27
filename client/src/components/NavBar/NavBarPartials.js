import { Link } from "react-router-dom";

import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ImMenu } from "react-icons/im";


const handleMenuLogoClick = () => {
  console.log('menu');
}


const handleUserLogoClick = () => {
  console.log('user');
}


export const MobileUserMenu = (props) => (
  <div
    className={
      props.userNavbar
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
);

export const MobileNavBar = (props) => (
  <div className="flex w-full mt-4 lg:hidden">
  <h1 className="text-3xl font-bold text-[#00df9a] mt-4 w-1/2 xs:ml-4 ">
    Supreme
    <br />
    Fashion Shop
  </h1>
  <div className="flex ml-4 h-16 mt-8 xs:ml-32 sm:ml-32 mr-2 md:ml-52">
    <Link className="px-2" to="/favorite"><MdFavorite size={35} color={"#00df9a"} className="mt-4"  /></Link>
    <Link className="px-2" to="/favorite"><RiShoppingCart2Fill size={35} color={"#00df9a"} className="mt-4"/></Link>
    <RiUserAddFill size={35} color={"#00df9a"} className="mt-4 ml-2 mr-4" onClick={handleUserLogoClick}/>
    <ImMenu size={35} color={"#00df9a"} className="mt-4 mr-2" onClick={handleMenuLogoClick}/>
  </div>

  </div>
    /* <div>
    <Link to="#">Men</Link>
    <Link to="#">Men</Link>
    <Link to="#">Men</Link>
    <Link to="#">Men</Link>
    <Link to="#">Men</Link>
    <Link to="#">Men</Link>
  </div> */

  // <div
  //   className={
  //     props.navBar
  //       ? "lg:hidden fixed left-0 top-0 w-[94%] h-full  bg-[#000300]"
  //       : "fixed left-[-100%]"
  //   }
  // >
  //   <h1 className="w-full text-3xl font-bold text-[#00df9a] ml-4 mt-4">
  //     Supreme
  //     <br />
  //     Fashion Shop
  //   </h1>
  //   <ul className="pt-10 uppercase">
  //     <Link to={"/men"}>
  //       <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
  //         Men
  //       </li>
  //     </Link>
  //     <Link to={"/women"}>
  //       <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
  //         Women
  //       </li>
  //     </Link>
  //     <Link to={"/kids"}>
  //       <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
  //         Kids
  //       </li>
  //     </Link>
  //     <Link to={"/new"}>
  //       <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
  //         New
  //       </li>
  //     </Link>
  //     <Link to={"/sale"}>
  //       <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
  //         Sale
  //       </li>
  //     </Link>
  //     <Link to={"/brands"}>
  //       <li className="p-4 text-xl border-b w-[100%] border-gray-600 font-bold text-center">
  //         Brands
  //       </li>
  //     </Link>
  //   </ul>
  // </div>
);

export const CommonNavBar = () => (
  <div className="text-white hidden lg:flex justify-between items-center h-26 mx-auto px-4 xl:mx-12">
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
  </div>
);

export const IconsManager = (props) => (
  <div className="flex lg:hidden">
    {props.navBar ? (
      <IoClose
        onClick={props.handleToggleNav}
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
          <RiShoppingCart2Fill size={35} color={"#00df9a"} className="ml-4" />
        </Link>
        <RiUserAddFill
          onClick={props.handleUserToggleNavbar}
          size={35}
          color={"#00df9a"}
          className="ml-4"
        />
        {props.userNavbar ? (
          <IoClose
            onClick={props.handleUserToggleNavbar}
            size={40}
            color={"#00df9a"}
          />
        ) : (
          <ImMenu
            onClick={props.handleToggleNav}
            size={35}
            color={"#00df9a"}
            className="ml-4"
          />
        )}
      </>
    )}
  </div>
);
