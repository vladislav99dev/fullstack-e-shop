import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {GiTigerHead} from "react-icons/gi"

import { useAuthContext } from "../../context/AuthContext";
import { useLocalProductsContext } from "../../context/LocalProductsContext";
import { useModalsContext } from "../../context/ModalsContext";

import ordersRequester from "../../services/ordersRequester"

import { validateOrderUserInfo } from "../../validations/userValidations";

import AttentionModal from "../Modals/AttentionModal";
import SuccessModal from "../Modals/SuccessModal";
import Spinner from "../Spinner/Spinner";
import ValidationMessage from "../ValidationMessage/validationMessage";


const Checkout = () => {
  const [useProfileInfo, setUseProfileInfo] = useState(false);
  const [totalPrice,setTotalPrice] = useState(0);
  const [validationMessages,setValidationMessages] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {user,login} = useAuthContext();
  const{products} = useLocalProductsContext();
  const {modalState,setFailedModal,setSuccessModal,resetModals} = useModalsContext();
  // setValidation messages

  useEffect(()=> {
    if(user.email)  user.cart.map(product => setTotalPrice((prev) => prev + (product._id.price * product.quantity)));
    if(!user.email)  products.map(product => setTotalPrice((prev) => prev + (product.product.price * product.quantity)))
    
    return (()=> {
      setTotalPrice(0);
    })
  },[user,products])


    const fillFormWithUserInfo = (event) => {
      event.preventDefault();
      setUseProfileInfo(!useProfileInfo)
    }

    const checkoutHandler = async(event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      data["price"] = totalPrice

      let validationsResponse = validateOrderUserInfo(data);
      if(validationsResponse.length > 0) return setValidationMessages(validationsResponse);
      if(!validationsResponse.length) setValidationMessages([]);

      try {
        let response ;
        setIsLoading(true)
        if(user.email) response = await ordersRequester.createOrder(data,user._id,null);
        if(!user.email) response = await ordersRequester.createOrder(data,null,products);
        const jsonResponse = await response.json();
        setIsLoading(false);
        
        if(response.status !== 201) throw {responseStatus:response.status,message:jsonResponse.message};
        if(response.status === 201) {
          if(user.email) login(jsonResponse.user);
          return setSuccessModal(jsonResponse.message);
        }
      } catch(err){
        if(err.responseStatus) return setFailedModal(err.message);
      }
    }
    const modalButtonHandler = () => {
      resetModals();
      navigate('/home');
    }

    return (
      <>
      {modalState.isFailed.value 
      ? <AttentionModal
        titleMessage={"Something went wrong!"}
        descriptionMessage={modalState.isFailed.message}
        buttonHandler={modalButtonHandler}
        buttonName={"Try again"}
      />
      : null}
      {modalState.isSuccess.value 
      ? <SuccessModal 
      titleMessage={"Congrats!"}
      descriptionMessage={modalState.isSuccess.message}
      buttonHandler={modalButtonHandler}
      buttonName={"Go to home page"}/>
      : null}
      {isLoading 
      ? <Spinner/>
      :null}
        <div className=" bg-white py-10 flex-column lg:grid lg:grid-cols-2 h-full">
            <form onSubmit={checkoutHandler} className="py-6 lg:py-10">
              {validationMessages.length > 0
                ? validationMessages.map((message) => <ValidationMessage key={message} message={message}/>)
                : null
            }
              <div className="flex justify-between">
                <p className="uppercase text-2xl  ml-5 lg:ml-10 mb-2 font-bold text-gray-600">Shipping address</p>
                { user.email 
                ? <button onClick={fillFormWithUserInfo} className="text-sm mr-5 lg:mr-10 mt-2 italic font-bold text-white rounded-md mb-2 bg-[#00df9a] sm:py-2">Do you want to use profile information?</button>
                : null
              }
              </div>
              <div className=" md:w-[92%] h-[0.1rem]  bg-gray-600 mb-6 sm:ml-10 lg:ml-10 lg:w-[93%]" ></div>
                <div className="mb-6 flex 2xl:w-[97.5%] mr-[4%] lg:mr-0 ">
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 rounded-lg" type="text" name="firstName" id="firstName" placeholder="First Name *" defaultValue={useProfileInfo ? `${user.firstName}` : ''}/>
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 rounded-lg" type="text" name="lastName" id="lastName" placeholder="Last Name *" defaultValue={useProfileInfo ? `${user.lastName}` : ''}/>
                </div>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="email" id="email" placeholder="Email" defaultValue={useProfileInfo ? `${user.email}` : ''}/>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="street" id="street" placeholder="Street Address *" defaultValue={useProfileInfo ? `${user.street}` : ''}/>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="unitNumber" id="unitNumber" placeholder="Apartment/House Number# *" defaultValue={useProfileInfo ? `${user.unitNumber}` : ''}/>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="country" id="country" placeholder="Country *" defaultValue={useProfileInfo ? `${user.country}` : ''}/>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="city" id="city" placeholder="City *" defaultValue={useProfileInfo ? `${user.city}` : ''}/>
                <div className="flex 2xl:w-[97.5%] mr-[4%] lg:mr-0">
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="state" id="state" placeholder="State *" defaultValue={useProfileInfo ? `${user.state}` : ''}/>
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="zipCode" id="zipCode" placeholder="Zip Code *"defaultValue={useProfileInfo ? `${user.zipCode}` : ''} />
                </div>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone: ex.0988902378 *" defaultValue={useProfileInfo ? `${user.phoneNumber}` : ''}/>
                <button className=" ml-5 lg:ml-10 py-2 w-[50%] border-2 border-[#00df9a] rounded-lg mb-4 bg-[#00df9a] text-white font-bold italic" type="submit">Submit</button>
            </form>
            <div className="order-first lg:order-last">
                <div className="mt-20 ml-10 mr-10  bg-gray-100 rounded-lg">
                    <p className="uppercase text-xl font-bold  mt-10 text-center py-4 text-gray-600 border-b-2 border-gray-400">Order Summary</p>

                    {user.email 
                    ? user.cart.map(product => (
                      <div key={`${product._id._id}${product.size}`} className="flex justify-between py-2 border-b-2 border-gray-300">
                          <p className="ml-5 text-md font-bold  text-gray-400">{product._id.name}</p>
                          <div>
                          <p className="mr-5 text-md  italic text-gray-400">{`Quantity: ${product.quantity}`}</p>
                          <p className="mr-5 text-md font-bold italic text-gray-400">{`$${product._id.price}`}</p>
                          </div>
                      </div>
                  ))
                  : products.map(product => (
                    <div key={`${product.product._id}${product.size}`} className="flex justify-between py-2 border-b-2 border-gray-300">
                    <p className="ml-5 text-md font-bold  text-gray-400">{product.product.name}</p>
                    <div>
                    <p className="mr-5 text-md  italic text-gray-400">{`Quantity: ${product.quantity}`}</p>
                    <p className="mr-5 text-md font-bold italic text-gray-400">{`$${product.product.price}`}</p>
                    </div>
                  </div>
                  ))
                    
                  }

                    <div className="flex justify-between py-4">
                        <p className="ml-5 text-lg font-bold text-gray-500">Total:</p>
                        <p className="mr-10 text-xl font-bold text-gray-800">{`$${totalPrice.toFixed(2)}`}</p>
                    </div>
                </div>
                <div className=" flex justify-around border-2 border-[#00df9a] h-[180px] mt-10 ml-10 mr-10 rounded-md">
                        <GiTigerHead className="ml-4 mt-10 2xl:ml-32" size={100} color={'#00df9a'}/>
                        <div className="ml-4 mt-10 2xl:mr-32">
                            <p className="italic text-gray-500 lg:text-center">We are glad you choose us!</p>
                            <p className="text-center italic text-gray-500">You will get a free shipping from your next order!</p>
                            <p className="italic text-gray-500">Best regards, </p>
                            <p className="text-end text-xl font-bold uppercase italic text-[#00df9a]">- Supreme fashion shop</p>
                        </div>
                </div>
            </div>
            
        </div>
      </>
    )
}
export default Checkout;