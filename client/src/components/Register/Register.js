import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateRegister } from "../../validations/userValidations";
import * as userRequester from "../../services/userRequester.js";

import { isNotLoggedIn } from "../../HOC/routesGuard";

import { useModalsContext } from "../../context/ModalsContext";

import modalMessages from "../../HOC/modalMessages";

import ValidationMessage from "../ValidationMessage/validationMessage";
import SuccessModal from "../Modals/SuccessModal";
import Spinner from "../Spinner/Spinner";

const Register = () => {
  const [validationMessages, setValidationsMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { modalState, setFailedModal, setSuccessModal, resetModals } =
    useModalsContext();

  const navigateToLogin = () => {
    resetModals();
    navigate("/users/login");
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    setValidationsMessages([]);
    setIsLoading(true);

    const formdData = new FormData(event.target);
    const data = Object.fromEntries(formdData);

    const validationsResponse = validateRegister(data);
    if (validationsResponse.length > 0) {
      setIsLoading(false);
      return setValidationsMessages(validationsResponse);
    }

    try {
      const response = await userRequester.register(data);
      const jsonResponse = await response.json();
      setIsLoading(false);

      if (response.status !== 201)
        throw {
          responseStatus: response.status,
          message: jsonResponse.message,
        };
      if (response.status === 201) return setSuccessModal("Congrats",jsonResponse.message,navigateToLogin,"Login");
    } catch (err) {
      setIsLoading(false);
      if (err.responseStatus)
        return setFailedModal(
          "Something went wrong",
          err.message,
          () => {
            resetModals();
          },
          "Try again"
        );
      console.log(err);
    }
  };
  return (
    <div className="bg-white rounded-3xl mt-6 w-full shadow-lg">
      {isLoading && <Spinner />}

      {modalState.isSuccess.value ? (
        <SuccessModal
          titleMessage={"Congrats!"}
          descriptionMessage={modalState.isSuccess.message}
          buttonHandler={navigateToLogin}
          buttonName={"Login"}
        />
      ) : null}

      {!isLoading ? (
        <h1 className="text-[#00df9a] py-4 text-3xl italic uppercase font-bold w-full text-center mt-8">
          Register
        </h1>
      ) : null}
      {validationMessages.length > 0
        ? validationMessages.map((message) => (
            <ValidationMessage key={message} message={message} />
          ))
        : null}
      {!isLoading ? (
        <form onSubmit={registerHandler} className=" ">
          <div className="flex justify-around">
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg "
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name *"
            />
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name *"
            />
          </div>
          <input
            className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]"
            type="text"
            name="email"
            id="email"
            placeholder="vladislavdorovski@abv.bg *"
          />
          <input
            className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]"
            type="text"
            name="country"
            id="country"
            placeholder="Country *"
          />
          <input
            className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]"
            type="text"
            name="state"
            id="state"
            placeholder="State *"
          />
          <div className="flex justify-around mt-2">
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg "
              type="text"
              name="city"
              id="city"
              placeholder="City *"
            />
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg"
              type="text"
              name="zipCode"
              id="zipCode"
              placeholder="Zip Code *"
            />
          </div>
          <div className="flex justify-around mt-2">
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg "
              type="text"
              name="street"
              id="street"
              placeholder="Street *"
            />
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg"
              type="text"
              name="unitNumber"
              id="unitNumber"
              placeholder="Apartment/House Number# *"
            />
          </div>
          <input
            className="mt-2 border-2 border-green-300 hover:border-green-100 rounded-lg py-2 w-[55%] ml-[22.5%] mr-[22.5%]"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Phone: ex.0988902378 *"
          />
          <div className="flex justify-around mt-2">
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] ml-[20%] rounded-lg "
              type="password"
              name="password"
              id="password"
              placeholder="Password *"
            />
            <input
              className="border-2 border-green-300 hover:border-green-100 py-2 w-[25%] mr-[20%] rounded-lg"
              type="password"
              name="re-password"
              id="re-password"
              placeholder="Repeat Password *"
            />
          </div>
          <div className="flex justify-center">
            <button className="mt-8 mb-10 py-2 px-16 rounded-lg bg-[#00df9a] text-white italic font-bold text-xl hover:bg-green-300 ease-in-out duration-500">
              Submit
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};
export default isNotLoggedIn(modalMessages(Register));
