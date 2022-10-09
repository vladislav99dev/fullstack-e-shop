import { useNavigate } from "react-router-dom";

import * as userRequester from "../../services/userRequester.js"

import { useAuthContext } from "../../context/AuthContext";

import { isLoggedIn } from "../../HOC/routesGuard.js";

import AttentionModal from "../Modals/AttentionModal";


const Logout = () => {
    const {user,logout} = useAuthContext();
    const navigate = useNavigate()

    const logoutHandler = async() => {
        try {
            await userRequester.logout(null,user._id)
            logout()
            return navigate('/home')
        } catch(err){
            console.log(err);
        }
    }
    
    return (
        <AttentionModal titleMessage={"Are you sure you want to logout?"} buttonHandler={logoutHandler} buttonName={"Logout"} />
    )
}
export default isLoggedIn(Logout);