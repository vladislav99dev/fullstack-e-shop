import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import { validateRegister } from "../../services/formValidationsServices";
import ValidationMessage from "../ValidationMessage/validationMessage";

import * as userRequester from "../../services/userRequester.js"
import { isNotLoggedIn } from "../../HOC/routesGuard";

const Register = () => {
    const[messages,setMessaages] = useState([]);
    const navigate = useNavigate();
    const registerHandler = async(event) => {
        event.preventDefault();
        setMessaages([]);

        const formdData = new FormData(event.target);
        const data = Object.fromEntries(formdData);
        let validationsResponse = validateRegister(data);
        if(validationsResponse.length > 0){
            return setMessaages(validationsResponse);
        }
        try{
            const response = await userRequester.register(data);
            let json = await response.json();
            console.log(json);
            if(json.error){
                return setMessaages([json.error]);
            }
            return navigate('/users/login')
        } catch(err){
            console.log(err);
            console.log('Server time out');
            // throw(err)
        }

    }
    return(
        <div className="bg-[#FAF9F6] rounded-3xl mt-6 w-full shadow-lg flex-row">
            <h1 className="text-[#ffe0bd] text-2xl italic uppercase font-bold w-full text-center mt-8">Register</h1>
            {messages.length > 0 
            ? messages.map((message) => <ValidationMessage key={message} message={message}/>)
            : null
            }
            <form onSubmit={registerHandler} >
            <div className="flex mt-4 justify-center">
                <label htmlFor="firstName" className="">First Name:</label>
                <input type="input" name="firstName" id="firstName" className="ml-6"/>
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="lastName" className=" ">Last Name:</label>
                <input type="input" name="lastName" id="lastName" className="ml-6" />
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="email" className="">Email:</label>
                <input type="input" name="email" id="email" className="ml-[72px]" />
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="country" className="">Country:</label>
                <input type="input" name="country" id="country" className="ml-12" />
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="city" className="mr-2">City:</label>
                <input type="input" name="city" id="city" className="ml-20" />
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="street" className="">Street Adress:</label>
                <input type="input" name="street" id="street" className="" />
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="password" className="">Password:</label>
                <input type="password" name="password" id="password" className="ml-8" />
            </div>
            <div className="flex mt-4 justify-center">
                <label htmlFor="re-password" className="">Re-Password:</label>
                <input type="password" name="re-password" id="re-password" className="" />
            </div>
            <div className="flex justify-center mt-2">
                <label>Already have an account?<Link to={"users/login"} className="text-[#3abeff] text-lg"> Sign in</Link></label>
            </div> 
            <div className="flex mt-4 justify-center">
                <button type="submit" className="py-2 px-10 rounded-md text-white bg-[#d9b99b] font-bold">Submit</button>
            </div>
            </form>
        </div>
    )
}
export default isNotLoggedIn(Register);