import { createContext, useContext,  useReducer } from "react";

const NavTogglesContext = createContext();

const initialMenuState = {
  isUserMobileLinksActive: false,
  isProductsMobileLinksActive: false,
  isDesktopUserLinksActive: false,
  isCartMenuActive:false
};

const reducerMenuState = (state, action) => {
  switch (action.type) {
    case "setUserMobileLinks":
        return {
            isUserMobileLinksActive: !state.isUserMobileLinksActive,
            isProductsMobileLinksActive: false,
            isDesktopUserLinksActive: false,
            isCartMenuActive:false
        };
    case "setProductsMobileLinks":
        return {
            isUserMobileLinksActive: false,
            isProductsMobileLinksActive: !state.isProductsMobileLinksActive,
            isDesktopUserLinksActive: false,
            isCartMenuActive:false
        };
    case "setDesktopUserLinks":
        return {
            isUserMobileLinksActive: false,
            isProductsMobileLinksActive: false,
            isDesktopUserLinksActive: !state.isDesktopUserLinksActive,
            isCartMenuActive:false
        };
    case "setCartMenu": 
        return {
          isUserMobileLinksActive: false,
          isProductsMobileLinksActive: false,
          isDesktopUserLinksActive: false,
          isCartMenuActive: !state.isCartMenuActive
        }    
    default:
      return{
        isUserMobileLinksActive: false,
        isProductsMobileLinksActive: false,
        isDesktopUserLinksActive: false,
        isCartMenuActive:false
      }
  }
};

export const NavTogglesProvider = ({ children }) => {
  const[state,dispatch] = useReducer(reducerMenuState,initialMenuState);

  const toggleUserMenu = () => {
    console.log('clicking');
    dispatch({type:'setUserMobileLinks'})
  };

  const toggleProductsMenu = () => {
    dispatch({type:'setProductsMobileLinks'})
  };

  const toggleDesktopUserMenu = () => {
    dispatch({type:'setDesktopUserLinks'})
  };
  
  const toggleCartMenu = () => {
    dispatch({type:'setCartMenu'})
  }

  // const outsideClick = () => {
  //   dispatch();
  // }

  return (
    <NavTogglesContext.Provider
      value={{
        isUserMobileLinksActive:state.isUserMobileLinksActive,
        toggleUserMenu,
        isProductsMobileLinksActive:state.isProductsMobileLinksActive,
        toggleProductsMenu,
        isDesktopUserLinksActive:state.isDesktopUserLinksActive,
        toggleDesktopUserMenu,
        isCartMenuActive:state.isCartMenuActive,
        toggleCartMenu
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
