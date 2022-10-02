import { useState } from "react";
import { Link } from "react-router-dom";

import { validateLogin } from "../../validations/userValidations";
import * as userRequester from "../../services/userRequester";
import * as favouritesAndCartRequester from "../../services/favouritesAndCartRequester";

import { useAuthContext } from "../../context/AuthContext";
import { useLocalProductsContext } from "../../context/LocalProductsContext";
import { useModalsContext } from "../../context/ModalsContext";

import { isNotLoggedIn } from "../../HOC/routesGuard";

import ValidationMessage from "../ValidationMessage/validationMessage";
import Spinner from "../Spinner/Spinner";
import AttentionModal from "../Modals/AttentionModal";

const Login = () => {
  const [validationMessages, setValidationMessages] = useState([]);
  const { login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const { products, clearStorage } = useLocalProductsContext();
  const {modalState, setFailedModal, resetModals } = useModalsContext();

  const addProductsFromLocalStorageToUserCart = async (profileId) => {
    const failedAddMessages = [];
    let user = {};
    console.log(profileId);
    for (const product of products) {
      const response = await favouritesAndCartRequester.addToCart(
        profileId,
        product.product._id,
        product.size,
        product.quantity
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (response.status !== 200) failedAddMessages.push(jsonResponse.message);
      if (response.status === 200) user = jsonResponse.user;
    }
    return [user, failedAddMessages.join(" ")];
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    setValidationMessages([]);
    setIsLoading(true);

    const formdData = new FormData(event.target);
    const data = Object.fromEntries(formdData);

    const validationsResponse = validateLogin(data);
    if (validationsResponse.length > 0) {
      setIsLoading(false);
      return setValidationMessages(validationsResponse);
    }

    try {
      let userData = {};
      const response = await userRequester.login(data);
      const jsonResponse = await response.json();

      if (response.status !== 200) {
        setIsLoading(false)
        return setFailedModal(jsonResponse.message)
      }

      Object.assign(userData,jsonResponse.user)

      if(products.length > 0) {
        const [user,failedAddMessages] = await addProductsFromLocalStorageToUserCart(userData._id);
        if(failedAddMessages) setFailedModal(
          "There were some products that we currently dont have as much as you wanted in stock, so we removed them from your cart and added the ones we have.We are sorry for the issues :)"
        );
        if(user.hasOwnProperty("email")) Object.assign(userData,user)
        clearStorage();
      }

      login(userData)
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };


  return (
    <div className="bg-white pt-6 pb-10  rounded-3xl lg:mt-16 w-full shadow-lg flex-row lg:w-full">
      {isLoading ? <Spinner /> : null}
      {modalState.isFailed.value ? (
        <AttentionModal
          titleMessage="Something went wrong"
          descriptionMessage={modalState.isFailed.message}
          buttonHandler={resetModals}
          buttonName="Try again"
        />
      ) : null}
      <>
      { !isLoading
      ?<h1 className="text-[#00df9a] text-2xl italic uppercase font-bold w-full text-center">
        Login
      </h1>
      : null
    }

        {validationMessages.length > 0
          ? validationMessages.map((message) => (
              <ValidationMessage key={message} message={message} />
            ))
          : null}
        { !isLoading 
        ?
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
        :null
        }

      </>
    </div>
  );
};

export default isNotLoggedIn(Login);







// if (response.status === 200) {
//   let userData = jsonResponse.user;
//   if (products.length > 0) {
//     const [user, failedAddMessages] =
//       await addProductsFromLocalStorageToUserCart(jsonResponse._id);
//     if (failedAddMessages)
//       return setFailedModal(
//         "There were some products that we currently dont have as much as you wanted in stock, so we removed them from your cart and added the ones we have.We are sorry for the issues :)"
//       );
//     if (user.hasOwnProperty("email")) Object.assign(userData, user);
//     clearStorage();
//   }
//   login(userData);
//   return setSuccessModal(jsonResponse.message);
// }









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
