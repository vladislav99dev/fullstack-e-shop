import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateLogin } from "../../services/formValidationsServices";
import ValidationMessage from "../ValidationMessage/validationMessage";
import * as userRequester from "../../services/userRequester";

import { useAuthContext } from "../../context/AuthContext";
import { useLocalProductsContext } from "../../context/LocalProductsContext";
import { isNotLoggedIn } from "../../HOC/routesGuard";
import Spinner from "../Spinner/Spinner";
import * as favouritesAndCartServices from "../../services/favouritesAndCartServices";
import { useModalsContext } from "../../context/ModalsContext";

const Login = () => {
  const [messages, setMessaages] = useState([]);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { products, clearStorage } = useLocalProductsContext();
  const { setFailedModal} = useModalsContext();

  const addProductsFromLocalStorageToUserCart = async (profileId) => {
    const failedAddsMessages = [];
    let user = {}
    for (const product of products) {
      const response = await favouritesAndCartServices.addToCart(
        profileId,
        product.product._id,
        product.size,
        product.quantity
      );
      const jsonResponse = await response.json();
      if(response.status !== 200) failedAddsMessages.push(jsonResponse.message)
      if(response.status === 200) user = jsonResponse.user
  };
  return [user,failedAddsMessages.join(' ')]
}

  const loginHandler = async (event) => {
    event.preventDefault();
    setMessaages([]);

    const formdData = new FormData(event.target);
    const data = Object.fromEntries(formdData);

    let validationsResponse = validateLogin(data);
    if (validationsResponse.length > 0) {
      return setMessaages(validationsResponse);
    }

    try {
      setIsLoading(true);
      const response = await userRequester.login(data);
      let jsonResponse = await response.json();
      if (jsonResponse.error) {
        setIsLoading(false);
        return setMessaages([jsonResponse.error]);
      }
      //if json.isAdmin navigate to admin panel
      setIsLoading(false);
      login(jsonResponse);
      if (products.length > 0) {
        const [user,failedAddsMessages] = await addProductsFromLocalStorageToUserCart(jsonResponse._id);
        if(failedAddsMessages) 
        setFailedModal("There were some products that we currently dont have as much as you wanted in stock, so we removed them from your cart and added the ones we have.We are sorry for the issues :)")
        
        if(user.hasOwnProperty("email")) login(user)
        
      }
      clearStorage();
      return navigate("/");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      console.log("Server time out");
    }
  };

  return (
    <div className="bg-white pt-6 pb-10  rounded-3xl lg:mt-16 w-full shadow-lg flex-row lg:w-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-[#00df9a] text-2xl italic uppercase font-bold w-full text-center">
            Login
          </h1>
          {messages.length > 0
            ? messages.map((message) => (
                <ValidationMessage key={message} message={message} />
              ))
            : null}
          <form onSubmit={loginHandler}>
            <input
              type="text"
              name="email"
              className="py-2 w-2/3 ml-[17%] md:w-1/3 md:ml-[33.5%] mb-2 mt-6 border-2 border-green-300 hover:border-green-100 rounded-md"
              placeholder="Email:vladislavdorovski@abv.bg"
            />
            <input
              type="password"
              name="password"
              className="py-2 w-2/3 ml-[17%] md:w-1/3 md:ml-[33.5%] border-2 border-green-300 hover:border-green-100 rounded-md"
              placeholder="Password:"
            />
            <div className="w-2/3 ml-[17%] md:w-1/3 md:ml-[33.5%] flex justify-around mt-4">
              <p className="italic text-gray-600">You dont have an account?</p>
              <Link to={"users/register"} className="text-[#00df9a] font-bold">
                Sign in
              </Link>
            </div>
            <button className="py-2  border-[#00df9a] w-[25%] ml-[37.5%] mt-4 rounded-md italic font-bold text-xl text-white bg-[#00df9a] hover:bg-green-300 ease-in-out duration-500">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default isNotLoggedIn(Login);


  /* <div className="flex mt-10 justify-center">
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
</div>*/

