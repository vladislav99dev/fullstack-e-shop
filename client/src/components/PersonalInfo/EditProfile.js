import { useReducer,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModalsContext } from "../../context/ModalsContext";


import { validateUserEdit } from "../../validations/userValidations";
import * as userRequester from "../../services/userRequester";


import Input from "./Input";
import AttentionModal from "../Modals/AttentionModal";
import SuccessModal from "../Modals/SuccessModal";

import ValidationMessage from "../ValidationMessage/validationMessage";



const reducerFormDataState = (state,{type,payload}) => {
    if(type === 'cleanup') return {};
    if( type !== 'firstName' && type !== 'lastName' && type !== 'email' &&
        type !== 'country' && type !== 'state' && type !== 'city' &&
        type !== 'zipCode' && type !== 'country'&& type !== 'street' && 
        type !== 'unitNumber' && type !== 'phoneNumber') return state;
    delete state[type]
    return {
        [type]:payload,
        ...state
    }
}

const EditProfile = ({user,login}) => {
    const [validationMessages,setValidationMessages] = useState([]);
    const [formDataState,dispatch] = useReducer(reducerFormDataState, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        country: user.country,
        state: user.state,
        city: user.city,
        zipCode: user.zipCode,
        street: user.street,
        unitNumber: user.unitNumber,
        phoneNumber: user.phoneNumber,
    })
    const navigate = useNavigate();
    const {modalState,setFailedModal,setSuccessModal,resetModals} = useModalsContext();

    const changeFormData = (type,event) => {
        if(type === 'cleanup') return {};
        dispatch({type:type,payload:event.target.value})
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        const validationsResponse = validateUserEdit(formDataState);
        if(validationsResponse.length > 0) return setValidationMessages(validationsResponse);

        try{
            const response = await userRequester.edit(formDataState,user._id);
            const jsonResponse = await response.json();
            if(response.status !== 200) throw {message:jsonResponse.message};
            if(response.status === 200) {
                login(jsonResponse.user)
                return setSuccessModal(jsonResponse.message)
            } 
        }catch(err){
            console.log(err);
            return setFailedModal(err.message)
        }
        
    }

    const modalBtnHandlers = (modal) => {
        resetModals()
        if(modal === 'success')  return navigate('/home')
    }

    return (
        <>
        <h1 className="text-[#00df9a] text-2xl italic uppercase font-bold w-full text-center">Edit Profile</h1>
        <form onSubmit={submitHandler} className="mt-2">
            {modalState.isFailed.value 
            ? <AttentionModal
                titleMessage={"Something went wrong"}
                descriptionMessage={modalState.isFailed.message}
                buttonName={"Try again"}
                buttonHandler={resetModals}
            />
            :null
            }
            {modalState.isSuccess.value 
            ? <SuccessModal
                titleMessage={"Success!"}
                descriptionMessage={modalState.isFailed.message}
                buttonName={"Go to home page"}
                buttonHandler={modalBtnHandlers.bind(null,"success")}
            />
            :null
            }
            {validationMessages.length > 0 
            ?   validationMessages.map((x) => <ValidationMessage key={x} message={x}/>)
            :   null
            }

            <Input labelName={"First Name"} defaultValue={formDataState.firstName} changeFormData={changeFormData.bind(null,"firstName")}/>
            <Input labelName={"Last Name"} defaultValue={formDataState.lastName} changeFormData={changeFormData.bind(null,"lastName")}/>
            <Input labelName={"Email"} defaultValue={formDataState.email} changeFormData={changeFormData.bind(null,"email")}/>
            <Input labelName={"Country"} defaultValue={formDataState.country} changeFormData={changeFormData.bind(null,"country")}/>
            <Input labelName={"State"} defaultValue={formDataState.state} changeFormData={changeFormData.bind(null,"state")}/>
            <Input labelName={"City"} defaultValue={formDataState.city} changeFormData={changeFormData.bind(null,"city")}/>
            <Input labelName={"Zip Code"} defaultValue={formDataState.zipCode} changeFormData={changeFormData.bind(null,"zipCode")}/>
            <Input labelName={"Country"} defaultValue={formDataState.country} changeFormData={changeFormData.bind(null,"country")}/>
            <Input labelName={"Street"} defaultValue={formDataState.street} changeFormData={changeFormData.bind(null,"street")}/>
            <Input labelName={"Unit Number"} defaultValue={formDataState.unitNumber} changeFormData={changeFormData.bind(null,"unitNumber")}/>
            <Input labelName={"Phone Number"} defaultValue={formDataState.phoneNumber} changeFormData={changeFormData.bind(null,"phoneNumber")}/>

            <div className="flex justify-center">
                <button className="mt-4 mb-4 py-2 px-16 rounded-lg bg-[#00df9a] text-white italic font-bold text-xl hover:bg-green-300 ease-in-out duration-500">Submit</button>
            </div>
        </form>
        </>
    )
}


export default EditProfile;



