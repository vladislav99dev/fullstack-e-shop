import { useState } from "react";
import { ImMenu } from "react-icons/im";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
  const [navBar,setNavbar] = useState(false);

  const handleToggleNav = () => {
    setNavbar(!navBar)
  }

  return (
    <div className="text-white flex justify-between items-center h-24 mx-auto px-4">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>
      <ul className="hidden md:flex">
        <li className="p-4 text-xl">Home</li>
        <li className="p-4 text-xl">About</li>
        <li className="p-4 text-xl">Company</li>
        <li className="p-4 text-xl">Contancts</li>
      </ul>
      <div onClick={handleToggleNav} className="block md:hidden">
        {navBar ? <IoClose size={35} color={"#00df9a"}/> : <ImMenu size={35} color={"#00df9a"}/>  }
      </div>
      <div className={navBar ? "fixed left-0 top-0 w-[90%] h-full border-r border-r-gray-900 bg-[#000300]": "fixed left-[-100%]"}>
        <h1 className="w-full text-3xl font-bold text-[#00df9a] ml-4 mt-8">REACT.</h1>
        <ul className="pt-10 uppercase">
          <li className="p-4 text-xl border-b w-[90%] border-gray-600">Home</li>
          <li className="p-4 text-xl border-b w-[90%] border-gray-600">About</li>
          <li className="p-4 text-xl border-b w-[90%] border-gray-600">Company</li>
          <li className="p-4 text-xl border-b w-[90%] border-gray-600">Contancts</li>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
