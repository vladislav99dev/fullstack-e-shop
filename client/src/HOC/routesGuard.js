import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const isLoggedIn = (Component) => {
  const WrapperComponent = (props) => {
    const { user } = useAuthContext();
    console.log(user);
    const navigate = useNavigate();
    return user._email ? <Component {...props} /> : navigate("/");
  };
  return WrapperComponent;
};

export const isNotLoggedIn = (Component) => {
  const WrapperComponent = (props) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    return !user.email ? <Component {...props} /> : navigate("/");
  };
  return WrapperComponent;
};
