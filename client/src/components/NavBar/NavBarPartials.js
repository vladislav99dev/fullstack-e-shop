import { Link } from "react-router-dom";

import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ImMenu } from "react-icons/im";




export const MobileUserMenu = ({
  toggleUserMenu
}) => (
  <>
  <div className="h-24 mt-4 flex">
    <h1 className="w-3/4 h-full text-3xl text-[#00df9a] font-bold ml-4">
      Supreme
       <br />
      Fashion Shop
    </h1>
    <IoClose size={50} color={"00df9a"} className="xxs:ml-4 xs:ml-8 mt-6 sm:ml-20" onClick={toggleUserMenu} />
  </div>
  <div className="h-30 flex-row">
    <div className="mt-0 py-4 flex justify-center border-b-2 border-gray-400">
    <Link to={"/login"} className="text-2xl font-bold text-white" >Login</Link>
    </div>
    <div className=" py-4 flex justify-center border-b-2 border-gray-400">
    <Link to={"/login"} className="text-2xl font-bold text-white">Register</Link>
    </div>
  </div>
  </>
);

const MobileNavBar = ({
  toggleUserMenu,
  toggleProductsMenu
}) => {
  return(
    <div className="flex w-full mt-4 lg:hidden">
    <h1 className="text-3xl font-bold text-[#00df9a] mt-4 w-1/2 xs:ml-4 ">
    Supreme
    <br />
    Fashion Shop
    </h1>
    <div className="flex ml-4 h-16 mt-8 xs:ml-32 sm:ml-32 mr-2 md:ml-52">
    <Link className="px-2" to="/favorite"><MdFavorite size={35} color={"#00df9a"} className="mt-4"  /></Link>
    <Link className="px-2" to="/favorite"><RiShoppingCart2Fill size={35} color={"#00df9a"} className="mt-4"/></Link>
    <RiUserAddFill size={35} color={"#00df9a"} className="mt-4 ml-2 mr-4" onClick={toggleUserMenu}/>
    <ImMenu size={35} color={"#00df9a"} className="mt-4 mr-2" onClick={toggleProductsMenu}/>
    </div>
  </div>
  )
}

const MobileProductsMenu = ({
  toggleProductsMenu
}) => (
<>
<div className="h-24 mt-4 flex">
  <h1 className="w-3/4 h-full text-3xl text-[#00df9a] font-bold ml-4">  
    Supreme
     <br />
    Fashion Shop
  </h1>
  <IoClose size={50} color={"00df9a"} className="xxs:ml-4 xs:ml-8 mt-6 sm:ml-20" onClick={toggleProductsMenu} />
</div>
  <div className="h-30 flex-row">
    <div className="mt-0 py-4 flex justify-center border-b-2 border-gray-400">
      <Link to={"/men"} className="text-2xl font-bold text-white" >Men</Link>
    </div>
    <div className=" py-4 flex justify-center border-b-2 border-gray-400">
      <Link to={"/women"} className="text-2xl font-bold text-white">Women</Link>
    </div>
    <div className=" py-4 flex justify-center border-b-2 border-gray-400">
      <Link to={"/kids"} className="text-2xl font-bold text-white">Kids</Link>
    </div>
    <div className=" py-4 flex justify-center border-b-2 border-gray-400">
      <Link to={"/new"} className="text-2xl font-bold text-white">New</Link>
    </div>
    <div className=" py-4 flex justify-center border-b-2 border-gray-400">
      <Link to={"/sale"} className="text-2xl font-extrabold text-[#00df9a] uppercase ">Sale</Link>
    </div>
    <div className=" py-4 flex justify-center border-b-2  border-gray-400">
      <Link to={"/brands"} className="text-2xl font-bold text-white">Brands</Link>
    </div>
  </div>
</>
)

export const MobileNavManager = ({
  toggleUserMenu,
  isUserMenuActive,
  toggleProductsMenu,
  isProductsMenuActive
}) => {
  if (isUserMenuActive) {
    return (<MobileUserMenu toggleUserMenu={toggleUserMenu}/>)
  } else if(isProductsMenuActive){
    return (<MobileProductsMenu toggleProductsMenu={toggleProductsMenu}/>)
  } else {
    return (<MobileNavBar toggleUserMenu={toggleUserMenu} toggleProductsMenu={toggleProductsMenu}/>)
  }
};

export const DesktopNavBar = () => (
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
