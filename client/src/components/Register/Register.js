import { useState } from "react";
import {useNavigate } from "react-router-dom";


import { validateRegister } from "../../services/formValidationsServices";
import * as userRequester from "../../services/userRequester.js";

import { isNotLoggedIn } from "../../HOC/routesGuard";

import {useModalsContext} from "../../context/ModalsContext";

import ValidationMessage from "../ValidationMessage/validationMessage";
import AttentionModal from "../Modals/AttentionModal";
import SuccessModal from "../Modals/SuccessModal";
import Spinner from "../Spinner/Spinner";

const Register = () => {
    const[messages,setMessaages] = useState([]);
    const[isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const {modalState,setFailedModal,setSuccessModal,resetModals} = useModalsContext();

    const navigateToLogin = () => {
        resetModals()
        navigate('/users/login')  
    }

    const registerHandler = async(event) => {
        event.preventDefault();
        setMessaages([]);
        setIsLoading(true);

        const formdData = new FormData(event.target);
        const data = Object.fromEntries(formdData);

        const validationsResponse = validateRegister(data);
        if(validationsResponse.length > 0){
            setIsLoading(false)
            return setMessaages(validationsResponse);}

        try{
            const response = await userRequester.register(data);
            const jsonResponse = await response.json();
            setIsLoading(false)

            if(response.status !== 201) return setFailedModal(jsonResponse.message)
            if(response.status === 201) return setSuccessModal(jsonResponse.message)
        } catch(err){
            setIsLoading(false)
            console.log(err);
        }

    }
    return(
        <div className="bg-white rounded-3xl mt-6 w-full shadow-lg">

            {isLoading 
            ? <Spinner/>
            : null}

            {modalState.isFailed.value 
            ? <AttentionModal
            titleMessage={"Something went wrong"}
            descriptionMessage={modalState.isFailed.message}
            buttonHandler={resetModals}
            buttonName={"Try again"}
            />
            : null}

            {modalState.isSuccess.value
            ? <SuccessModal
            titleMessage={"Congrats!"}
            descriptionMessage={modalState.isSuccess.message}
            buttonHandler={navigateToLogin}
            buttonName={"Login"}/>
            : null}

            <h1 className="text-[#00df9a] py-4 text-3xl italic uppercase font-bold w-full text-center mt-8">Register</h1>
             {messages.length > 0 
            ? messages.map((message) => <ValidationMessage key={message} message={message}/>)
            : null
            }
            <form onSubmit={registerHandler} className=" " >
                <div className="flex justify-around">
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg " type="text" name="firstName" id="firstName" placeholder="First Name *" />
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg" type="text" name="lastName" id="lastName" placeholder="Last Name *" /> 
                </div>
                <input className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]" type="text" name="email" id="email" placeholder="vladislavdorovski@abv.bg *" />
                <input className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]" type="text" name="country" id="country" placeholder="Country *" />
                <input className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]" type="text" name="state" id="state" placeholder="State *" />
                <div className="flex justify-around mt-2">
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg " type="text" name="city" id="city" placeholder="City *" />
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg" type="text" name="zipCode" id="zipCode" placeholder="Zip Code *" /> 
                </div>
                <div className="flex justify-around mt-2">
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg " type="text" name="street" id="street" placeholder="Street *" />
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg" type="text" name="unitNumber" id="unitNumber" placeholder="Apartment/House Number# *" /> 
                </div>
                <input className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]" type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone: ex.0988902378 *" />
                <div className="flex justify-around mt-2">
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg " type="password" name="password" id="password" placeholder="Password *" />
                    <input className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg" type="password" name="re-password" id="re-password" placeholder="Repeat Password *" /> 
                </div>
                <div className="flex justify-center">
                <button className="mt-8 mb-10 py-2 px-16 rounded-lg bg-[#00df9a] text-white italic font-bold text-xl hover:bg-green-300 ease-in-out duration-500" >Submit</button>
                </div>
            </form>
        </div>
    )
}
export default isNotLoggedIn(Register);







{/* <div className="flex mt-4 justify-center">
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
<div className="flex justify-center mt-8">
<label>Already have an account?<Link to={"users/login"} className="text-[#3abeff] text-lg"> Sign in</Link></label>
</div> 
<div className="flex mt-6 justify-center">
<button type="submit" className="py-2 mb-10 px-10 rounded-md text-white bg-[#DDDDDD] font-bold">Submit</button>
</div> */}