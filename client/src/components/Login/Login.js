import { useState } from "react";

import { validateLogin } from "../../services/formValidationsServices";
import ValidationMessage from "../ValidationMessage/validationMessage";
import * as userRequester from '../../services/userRequester'

import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [messages,setMessaage] = useState(false)
    const {login} = useAuthContext();
    const navigate = useNavigate();

    const loginHandler = async (event) => {
        event.preventDefault();
        setMessaage(false)

        const formdData = new FormData(event.target);
        const data = Object.fromEntries(formdData);

        let validationsResponse = validateLogin(data);
        if (validationsResponse.length > 0) {
        return setMessaage(validationsResponse)
        }

        try{
            const response = await userRequester.login(data);
            let json = await response.json();
            if(json.error){
                return  setMessaage([json.error])
            }
            login(json)
            navigate('/')
        } catch(err){
            console.log(err);
            console.log('Server time out');

            // throw(err)
        }
    }


    return(
        <div className="bg-[#FAF9F6] h-80 rounded-3xl mt-16 w-full shadow-lg flex-row lg:w-full">
            <h1 className="text-[#ffe0bd] text-2xl italic uppercase font-bold w-full text-center mt-8">Login</h1>
            {messages 
            ? messages.map((message) => <ValidationMessage message={message}/>)
            : null
            }
            <form onSubmit={loginHandler}>
            <div className="flex mt-10 justify-center">
                <label htmlFor="email">Email:</label>
                <input type="input" name="email" id="email" className="ml-8" placeholder="ex.petrpetrov@abv.bg" />
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"  />
            </div>
            <div className="flex justify-center mt-4">
                <label htmlFor="rememberMe">Remember me?</label>
                <input type="checkbox" name="rememberMe" className=""/>
            </div> 
            <div className="flex justify-center mt-4 ">
                <button type="submit" className="py-2 px-10 rounded-md text-white bg-[#d9b99b] font-bold">Submit</button>
            </div>
            </form>
        </div>
    )
}


export default Login;