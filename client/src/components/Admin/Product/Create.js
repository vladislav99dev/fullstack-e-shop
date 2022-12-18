import { useState } from "react";

import { useAuthContext } from "../../../context/AuthContext";
import  {useModalsContext} from "../../../context/ModalsContext"


import * as productsRequester from '../../../services/productsRequester'
import { productSizeFormater } from "../../../services/dataServices";
import productsValidations from "../../../validations/productsValidations";

import productData from "../../../utils/productData";

import isAdmin from "../../../HOC/adminRoutesGuard";

import ValidationMessage from "../../ValidationMessage/validationMessage";
import AttentionModal from "../../Modals/AttentionModal";
import SuccessModal from "../../Modals/SuccessModal"





const Create = () => {
    const {user} = useAuthContext();
    const [type,setType] = useState('clothing');
    const [validationMessages,setValidationMessages] = useState([]);
    const {modalState, setSuccessModal, setFailedModal, resetModals} = useModalsContext();

    const handleSelect = (event) => {
        setType(event.target.value);
    };

    const submitHandler = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target) ;
        const data = Object.fromEntries(formData);

        const formatedData = productSizeFormater(data)


        let validationsResponse = productsValidations.validateAllData(formatedData)
        if(validationsResponse.length > 0) return setValidationMessages(validationsResponse);
        if(!validationsResponse.length)  setValidationMessages([]);


        try {
            const response = await productsRequester.create(formatedData,user.accessToken,null,user._id)
            const jsonResponse = await response.json();

            if(response.status !== 201) throw {responseStatus:response.status, message:jsonResponse.message}
            if(response.status === 201) setSuccessModal("You have successfully create new product!");
        } catch(err){
            if(err.responseStatus) return setFailedModal(err.message);
        }
    };

    return(
        <>
        {modalState.isFailed.value 
        ? <AttentionModal 
        titleMessage={'Creation failed!'} 
        descriptionMessage={modalState.isFailed.message} 
        buttonHandler={resetModals} 
        buttonName={'Try again'}/>   
        : null}
        
        {modalState.isSuccess.value
        ? <SuccessModal 
        titleMessage={'Success'}
        descriptionMessage={modalState.isSuccess.message}
        buttonHandler={resetModals}
        buttonName={'Create another one'}/> 
        : null}

        <div className="bg-white rounded-3xl mt-6 w-full shadow-lg flex-row py-4">
        <h1 className="text-[#00df9a] text-2xl italic  font-bold w-full text-center mt-2">
            Hello, {user.firstName}
            <br/>
            what product we will create today?
            </h1>
        {validationMessages.length > 0 
        ? validationMessages.map((message) => (
            <ValidationMessage key={message} message={message}/>))
        : null
        }
        <form onSubmit={submitHandler}>
        <select type="text" name="type" onChange={handleSelect} className="form-input capitalize font-semibold text-gray-700" placeholder="">
            {productData.types.map(type => <option className="text-center font-semibold text-gray-700" key={type} value={type}>{type}</option>)}
        </select>

        <select type="input" name="category" id="category" className="form-input capitalize font-semibold text=gray-700 mt-0">
            {type === 'clothing' 
            ? productData.clothingOptions.map((option) => <option className="text-center font-semibold text-gray-700" key={option} value={option}>{option}</option>)
            : productData.shoeOptions.map((option) => <option className="text-center font-semibold text-gray-700"  key={option} value={option}>{option}</option>)
}       </select>

        <input type="text" className="form-input mt-0 capitalize text-center font-semibold text-gray-700" name="name" id="name" placeholder="Product Name:"/>

        <select type="input" name="gender" id="gender" className="form-input mt-0 capitalize font-semibold text-gray-700">
        {productData.genders.map(gender => <option className="font-semibold text-gray-700 text-center" key={gender} value={gender}>{gender}</option>)}
        </select>

        <select type="input" name="brand" id="brand" className="form-input mt-0 text-center font-semibold text-grey-700 capitalize">
        {productData.brands.map(brand => <option className="font-semibold text-gray-700 text-center" key={brand} value={brand}>{brand}</option>)}
        </select>

        <textarea 
        type="input" name="sizes" 
        placeholder={type=== 'clothing' 
        ? 'ex: XL:5, M:15, S:13 You should add comma as shown in example,without spacing between double dots!' 
        : 'ex: 43:10, 46:15, 42:13 You should add comma as shown in example'} 
        id="sizes" className="form-input mt-0 text-center font-semibold text-gray-700 mb-[0.25rem]">
        </textarea>

        <input type="input" name="imageUrl" id="imageUrl" className="form-input mt-0 text-center font-semibold text-gray-700" placeholder="ImageUrl:" />
        
        <select type="input" name="color" id="color" className="form-input mt-0 text-center font-semibold text-grey-700 capitalize">
        {productData.colors.map(color => <option className="font-semibold text-gray-700 text-center" key={color} value={color}>{color}</option>)}
        </select>
        
        <input type="number" name="price" id="price" className="form-input mt-0 text-center font-semibold text-gray-700" placeholder="Price:"/>
        <button className="py-2 border-[#00df9a] w-[25%] ml-[37.5%] mt-4 rounded-md italic font-bold text-xl text-white bg-[#00df9a] hover:bg-green-300 ease-in-out duration-500">Submit</button>
        
        </form>
    </div>
    </>
    );
};

export default isAdmin(Create);

