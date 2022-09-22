import { useNavigate } from "react-router-dom";

import * as userRequester from "../../services/userRequester.js"

import { useAuthContext } from "../../context/AuthContext";

import { isLoggedIn } from "../../HOC/routesGuard.js";

import AttentionModal from "../Modals/AttentionModal";


const Logout = () => {
    const {logout} = useAuthContext();
    const navigate = useNavigate()

    const logoutHandler = async() => {
        try {
            await userRequester.logout()
            logout()
            return navigate('/')
        } catch(err){
            console.log(err);
        }
    }
    
    return (
        <AttentionModal titleMessage={"Are you sure you want to logout?"} buttonHandler={logoutHandler} buttonName={"Logout"} />
    )
}
export default isLoggedIn(Logout);