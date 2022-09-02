import { createContext, useContext,  useReducer } from "react";

const NavTogglesContext = createContext();

const initialMenuState = {
  isUserMenuActive: false,
  isProductsMenuActive: false,
  isDesktopUserMenuActive: false,
};

const reducerMenuState = (state, action) => {
  switch (action.type) {
    case "setIsUserMenuActive":
        return {
            isUserMenuActive: !state.isUserMenuActive,
            isProductsMenuActive: false,
            isDesktopUserMenuActive: false,
        };
    case "setIsProductsMenuActive":
        return {
            isUserMenuActive: false,
            isProductsMenuActive: !state.isProductsMenuActive,
            isDesktopUserMenuActive: false,
        };
    case "setIsDesktopUserMenuActive":
        return {
            isUserMenuActive: false,
            isProductsMenuActive: false,
            isDesktopUserMenuActive: !state.isDesktopUserMenuActive,
        };
    default:
      return{
        isUserMenuActive: false,
        isProductsMenuActive: false,
        isDesktopUserMenuActive: false,
      }
  }
};

export const NavTogglesProvider = ({ children }) => {
  const[state,dispatch] = useReducer(reducerMenuState,initialMenuState);

  const toggleUserMenu = () => {
    dispatch({type:'setIsUserMenuActive'})
  };

  const toggleProductsMenu = () => {
    dispatch({type:'setIsProductsMenuActive'})
  };

  const toggleDesktopUserMenu = () => {
    dispatch({type:'setIsDesktopUserMenuActive'})
  };

  return (
    <NavTogglesContext.Provider
      value={{
        isUserMenuActive:state.isUserMenuActive,
        toggleUserMenu,
        isProductsMenuActive:state.isProductsMenuActive,
        toggleProductsMenu,
        isDesktopUserMenuActive:state.isDesktopUserMenuActive,
        toggleDesktopUserMenu,
      }}
    >
      {children}
    </NavTogglesContext.Provider>
  );
};

export const useNavTogglesContext = () => {
  const navToggles = useContext(NavTogglesContext);
  return navToggles;
};
