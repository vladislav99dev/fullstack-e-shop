import { useReducer } from "react";

import { useAuthContext } from "../../context/AuthContext";

import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

const initialButtonsState = {
    edit:false,
    changePassword:false,
    orders:false
}

const reducerButtonsState = (state,action) => {
    switch(action.type) {
        case "edit" :
            return {
                edit:true,
                changePassword:false,
                orders:false,
            }
        case "changePassword" :
            return {
                edit:false,
                changePassword:true,
                orders:false,
            }
        case "orders" :
                return {
                    edit:false,
                    changePassword:false,
                    orders:true,
                }
    }
} 

const PersonalInfo = () => {
    const [buttonsState,dispatch] = useReducer(reducerButtonsState,initialButtonsState)
    const {user,login} = useAuthContext();

    const btnClickHandler = (type) => {
        dispatch({type:type})
    }
    return (
        <div className="flex justify-center">
            <div className="w-[15%] border-4 border-[#28282B]">
                <button onClick={btnClickHandler.bind(null,"edit")} className="py-4 border-b-4 border-[#28282B] w-full text-left font-extrabold text-[#28282B]">Edit Profile</button>
                <button onClick={btnClickHandler.bind(null,"changePassword")} className="py-4 border-b-4 border-[#28282B] w-full text-left font-extrabold text-[#28282B]">Change Password</button>
                <button onClick={btnClickHandler.bind(null,"orders")} className="py-4 border-b-4 border-[#28282B] w-full text-left font-extrabold text-[#28282B]">Orders</button>
            </div>
            <div className="w-[40%] border-2 border-[#00df9a] border-l-0">
                { buttonsState.edit ? <EditProfile user={user} login={login}/> : null }
                { buttonsState.changePassword ? <ChangePassword/> : null}
            </div>
        </div>
    )
}

export default PersonalInfo;