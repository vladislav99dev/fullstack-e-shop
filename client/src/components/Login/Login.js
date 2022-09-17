import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";

import { validateLogin } from "../../services/formValidationsServices";
import ValidationMessage from "../ValidationMessage/validationMessage";
import * as userRequester from '../../services/userRequester'

import { useAuthContext } from "../../context/AuthContext";
import { useLocalProductsContext } from "../../context/LocalProductsContext";
import { isNotLoggedIn } from "../../HOC/routesGuard";
import Spinner from "../Spinner/Spinner"

const Login = () => {
    const [messages,setMessaages] = useState([])
    const {login} = useAuthContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const {clearStorage} = useLocalProductsContext();

    const loginHandler = async (event) => {
        event.preventDefault();
        setMessaages([])

        const formdData = new FormData(event.target);
        const data = Object.fromEntries(formdData);

        let validationsResponse = validateLogin(data);
        if (validationsResponse.length > 0) {
        return setMessaages(validationsResponse)
        }

        try{
            setIsLoading(true)
            const response = await userRequester.login(data);
            let json = await response.json();
            if(json.error){
                setIsLoading(false)
                return  setMessaages([json.error])
            }
            //if json.isAdmin navigate to admin panel
            setIsLoading(false)
            login(json)
            clearStorage()
            return navigate('/')
        } catch(err){
            setIsLoading(false)
            console.log(err);
            console.log('Server time out');
            // throw(err)
        }
    }


    return(
        <div className="bg-[#FAF9F6]  rounded-3xl lg:mt-16 w-full shadow-lg flex-row lg:w-full">
            {isLoading 
            ?<Spinner/>
            :<><h1 className="text-[#00df9a] text-2xl italic uppercase font-bold w-full text-center mt-8">Login</h1>
            {messages.length > 0
            ? messages.map((message) => <ValidationMessage key={message} message={message}/>)
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
            <div className="flex justify-center mt-10">
                <label htmlFor="rememberMe">Remember me?</label>
                <input className="ml-1" type="checkbox" name="rememberMe"/>
            </div> 
            <div className="flex justify-center mt-2">
                <label>Don't have an account?<Link to={"users/register"} className="text-[#3abeff] text-lg"> Sign up</Link></label>
            </div> 
            <div className="flex justify-center mt-6 ">
                <button type="submit" className="py-2 mb-10 px-10 rounded-md text-white bg-[#DDDDDD] font-bold">Submit</button>
            </div>
            </form>
            </>
            }
            
        </div>
    )
}


export default isNotLoggedIn(Login);