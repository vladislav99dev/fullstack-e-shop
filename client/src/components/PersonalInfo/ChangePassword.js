import {useReducer,useState} from "react"
import ValidationMessage from "../ValidationMessage/validationMessage";

import Input from "./Input";

const reducerPasswordsState = (state,{type,payload}) => {
    switch (type) {
        case "oldPassword":
            return {
                oldPassword: payload,
                newPassword: state.newPassword,
                repeatPassword: state.repeatPassword,
            }
        case "newPassword":
            return {
                oldPassword: state.oldPassword,
                newPassword: payload,
                repeatPassword: state.repeatPassword,
            }
        case "repeatPassword":
            return {
                oldPassword: state.oldPassword,
                newPassword: state.newPassword,
                repeatPassword: payload,
            }
        default:
            break;
    }
}


const ChangePassword = () => {
    const [validationMessages,setValidationMessages] = useState([]);
    const [passwordsState,dispatch] = useReducer(reducerPasswordsState,{
        oldPassword: '',
        newPassword:'',
        repeatPassword:''
    })

    const changePasswordsState = (passwordField,event) => {
        dispatch({type:passwordField,payload:event.target.value})
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(passwordsState.newPassword !== passwordsState.repeatPassword) return setValidationMessages(["New Password and Repeat Passwords does not match !"])
        
    }


    return (
        <>
        <h1 className="text-[#00df9a] text-2xl italic uppercase font-bold w-full text-center">Change Password</h1>
        { validationMessages.length 
        ? validationMessages.map((x) => <ValidationMessage key={x} message={x}/>)
        : null
        }
        <form onSubmit={submitHandler} className="mt-2">
            <Input labelName={"Enter Old Password"} changeState={changePasswordsState.bind(null,"oldPassword")} type={"password"}/>
            <Input labelName={"Enter New Password"} changeState={changePasswordsState.bind(null,"newPassword")} type={"password"}/>
            <Input labelName={"Repeat New Password"} changeState={changePasswordsState.bind(null,"repeatPassword")} type={"password"}/>
            <div className="flex justify-center">
                <button className="mt-4 mb-4 py-2 px-16 rounded-lg bg-[#00df9a] text-white italic font-bold text-xl hover:bg-green-300 ease-in-out duration-500" >Submit</button>
            </div>
        </form>
        </>
    )
}
export default ChangePassword;