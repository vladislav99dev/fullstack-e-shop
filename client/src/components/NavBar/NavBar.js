import { useNavTogglesContext } from "../../context/NavTogglesContext";
import { useModalsContext } from "../../context/ModalsContext";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

import { Link } from "react-router-dom";

import CartLayout from "./Cart/CartLayout";
import FavouritesLayout from "./Favourites/FavouritesLayout";

import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { GiTigerHead } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import styles from "./NavBar.module.css";

import modalMessages from "../../HOC/modalMessages";

const NavBar = () => {
  const { setFailedModal, resetModals } = useModalsContext();
  const { user, login } = useAuthContext();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const {
    toggleCartMenu,
    toggleFavouritesMenu,
    isCartMenuActive,
    isFavouritesMenuActive,
  } = useNavTogglesContext();

  const manageFavouritesAccess = () => {
    if (user.email) {
      resetModals();
      return toggleFavouritesMenu();
    }
    if (!user.email)
      setFailedModal(
        "You should be logged in to use this feature!",
        "",
        () => {
          console.log("hello you clicking it :D");
        },
        "Click"
      );
  };

  const Icons = () => (
    <ul className={styles["nav-icons"]}>
      <MdFavorite
        onClick={manageFavouritesAccess}
        size={35}
        color={"#00df9a"}
      />
      <RiShoppingCart2Fill
        size={35}
        color={"#00df9a"}
        onClick={toggleCartMenu}
      />
      <ImMenu
        size={35}
        color={"#00df9a"}
        className="xl:hidden"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
      />
      <div className="hidden">
        <AiOutlineClose size={35} color={"#00df9a"} />
      </div>
    </ul>
  );

  const PageLinks = ({ isMobileNavOpen }) => (
    <ul
      className={`${styles["nav-links"]} ${
        !isMobileNavOpen ? styles["hide"] : ""
      }`}
    >
      <li>
        <Link to={"products/all"} className={styles["nav-link"]}>
          All
        </Link>
      </li>
      <li>
        <Link to="products/men" className={styles["nav-link"]}>
          Men
        </Link>
      </li>
      <li>
        <Link to={"products/women"} className={styles["nav-link"]}>
          Women
        </Link>
      </li>
      <li>
        <Link to={"products/boys"} className={styles["nav-link"]}>
          Boys
        </Link>
      </li>

      <li>
        <Link to={"products/girls"} className={styles["nav-link"]}>
          Girls
        </Link>
      </li>

      <li>
        <Link to={"products/sale"} className={styles["sale-link"]}>
          SALE
        </Link>
      </li>
      <li>
        <Link to={"products/brands"} className={styles["nav-link"]}>
          Brands
        </Link>
      </li>
      <li className={styles["nav-user-links"]}>
        <Link to={"users/login"} className={styles["nav-login-button"]}>
          Login
        </Link>
        <Link to={"users/register"} className={styles["nav-register-button"]}>
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav className={styles["nav-container"]}>
        <div className={styles["logo"]}>
          <GiTigerHead size={80} color={"#00df9a"} />
        </div>
        <Icons />
        <PageLinks isMobileNavOpen={isMobileNavOpen} />
      </nav>
      {isCartMenuActive && <CartLayout toggleCartMenu={toggleCartMenu} />}
      {isFavouritesMenuActive && (
        <FavouritesLayout toggleFavouritesMenu={toggleFavouritesMenu} />
      )}
    </>
  );
};
export default modalMessages(NavBar);
