import { useState } from "react";

import { validateLogin } from "../../services/formValidationsServices";
import ValidationMessage from "../ValidationMessage/validationMessage";


const Login = () => {
    const [messages,setMessaage] = useState(false)


    const loginHandler = (event) => {
        event.preventDefault();
        setMessaage(false)
        const formdData = new FormData(event.target);
        const data = Object.fromEntries(formdData);
        let validationsResponse = validateLogin(data);
        if (validationsResponse.length > 0) {
        return setMessaage(validationsResponse)
        }
    }


    return(
        <div className="bg-[#FAF9F6] h-96 rounded-3xl mt-16 w-full shadow-lg flex-row">
            <h1 className="text-[#ffe0bd] text-2xl italic uppercase font-bold w-full text-center mt-8">Login</h1>
            {messages 
            ? messages.map((message) => <ValidationMessage message={message}/>)
            : null
            }
            <form onSubmit={loginHandler}>
            <div className="flex mt-20 justify-center items-align">
                <label htmlFor="email" className="italic text-[#ffe0bd] font-bold text-xl ">Email:</label>
                <input type="input" name="email" id="email" className="max-w-xl rounded-md w-48" placeholder="ex.petrpetrov@abv.bg" />
            </div>
            <div className="flex mt-10 justify-center items-align">
                <label htmlFor="password" className="italic text-[#ffe0bd] font-bold text-xl ">Password:</label>
                <input type="password" name="password" id="password" className="max-w-xl rounded-md w-48" />
            </div>
            <div className="flex justify-center mt-6">
                <label htmlFor="rememberMe" className="text-lg italic text-[#ffe0bd] font-bold ">Remember me?</label>
                <input type="checkbox" name="rememberMe" className="ml-2"/>
            </div> 
            <div className="flex justify-center mt-6 ">
                <button type="submit" className="py-2 px-10 rounded-md text-white bg-[#d9b99b] font-bold">Submit</button>
            </div>
            </form>
        </div>
    )
}


export default Login;