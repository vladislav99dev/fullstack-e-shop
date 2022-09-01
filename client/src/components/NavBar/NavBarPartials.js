import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext"

import { RiShoppingCart2Fill, RiUserAddFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { ImMenu } from "react-icons/im";


const LoginAndRegisterLink = ({
  toggleDesktopUserMenu
}) => (
  <>
  <div className="container-links">
  <Link to={"users/login"} className="mobile-links" onClick={toggleDesktopUserMenu} >Login</Link>
  </div>
  <div className="container-links">
  <Link to={"users/register"} className="mobile-links" onClick={toggleDesktopUserMenu}>Register</Link>
  </div>
  </>
)

const LogoutandEditLink = ({
  toggleDesktopUserMenu
}) => (
  <>
  <div className="container-links">
  <Link to={"users/logout"} className="mobile-links" onClick={toggleDesktopUserMenu}>Logout</Link>
  </div>
    <div className="container-links">
    <Link to={"#"} className="mobile-links" onClick={toggleDesktopUserMenu}>Edit Profile</Link>
    </div>
  </>
)



export const MobileUserMenu = ({
  toggleUserMenu
}) => {
  const {user} = useAuthContext();
  return(
    <>
    <div className="h-24 mt-4 flex">
      <h1 className="w-3/4 h-full text-3xl text-[#00df9a] font-bold ml-4">
        Supreme
         <br />
        Fashion Shop
      </h1>
      <IoClose size={50} color={"00df9a"} className="xxs:ml-4 xs:ml-8 mt-6 sm:ml-20 cursor-pointer" onClick={toggleUserMenu} />
    </div>
    <div className="h-30 flex-row">
    {user.email 
    ? <LogoutandEditLink/>
    : <LoginAndRegisterLink/>
    }
    </div>
    </>
  );
}


const MobileNavBar = ({
  toggleUserMenu,
  toggleProductsMenu
}) => {
  return(
    <div className="flex w-full mt-4 lg:hidden">
    <h1 className="text-3xl font-serif italic drop-shadow-xl text-[#00df9a] mt-4 w-1/2 xs:ml-4 md:ml-8 ">
    Supreme
    <br />
    Fashion Shop
    </h1>
    <div className="flex ml-4 h-16 mt-8 xs:ml-32 sm:ml-32 mr-2 md:ml-52">
    <Link className="px-2" to="/favorite"><MdFavorite size={35} color={"#00df9a"} className="mt-4"  /></Link>
    <Link className="px-2" to="/favorite"><RiShoppingCart2Fill size={35} color={"#00df9a"} className="mt-4"/></Link>
    <RiUserAddFill size={35} color={"#00df9a"} className="mt-4 ml-2 mr-4 cursor-pointer" onClick={toggleUserMenu}/>
    <ImMenu size={35} color={"#00df9a"} className="mt-4 mr-2 cursor-pointer" onClick={toggleProductsMenu}/>
    </div>
  </div>
  )
}

const MobileProductsMenu = ({
  toggleProductsMenu
}) => (
<>
<div className="h-24 mt-4 flex">
  <h1 className="w-3/4 h-full text-3xl text-[#00df9a] font-bold ml-4 drop-shadow-xl">  
    Supreme
     <br />
    Fashion Shop
  </h1>
  <IoClose size={50} color={"00df9a"} className="xxs:ml-4 xs:ml-8 mt-6 sm:ml-20" onClick={toggleProductsMenu} />
</div>
  <div className="h-30 flex-row">
    <div className="container-links">
      <Link to={"/men"} className="mobile-links" >Men</Link>
    </div>
    <div className="container-links">
      <Link to={"/women"} className="mobile-links">Women</Link>
    </div>
    <div className="container-links">
      <Link to={"/kids"} className="mobile-links">Kids</Link>
    </div>
    <div className="container-links">
      <Link to={"/new"} className="mobile-links">New</Link>
    </div>
    <div className="container-links">
      <Link to={"/sale"} className="text-2xl font-extrabold text-[#00df9a] uppercase">Sale</Link>
    </div>
    <div className="container-links">
      <Link to={"/brands"} className="mobile-links">Brands</Link>
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

export const DesktopNavBar = ({
  toggleDesktopUserMenu,
  isDesktopUserMenuActive
}) => {
  const {user} = useAuthContext();
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
          <RiUserAddFill size={25} color={"#00df9a"} className="mt-4 mr-6 cursor-pointer" onClick={toggleDesktopUserMenu} />
      </div>
    </div>
    {isDesktopUserMenuActive 
    ? <div className="hidden lg:block bg-[#ffe0bd]  w-[30%] fixed right-4  mt-0 border-4 border-white rounded-lg">
      {!user.email
      ?<LoginAndRegisterLink toggleDesktopUserMenu={toggleDesktopUserMenu}/>
      :<LogoutandEditLink toggleDesktopUserMenu={toggleDesktopUserMenu}/>
    }
    </div>
    : null
    }
    
    </>
  )

};
