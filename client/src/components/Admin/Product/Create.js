import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { validateProductForms } from "../../../services/formValidationsServices";
import useModalState from "../../../hooks/useModalState"

import ValidationMessage from "../../ValidationMessage/validationMessage";

import * as productsRequester from '../../../services/productsRequester'
import AttentionModal from "../../Modals/AttentionModal";
import SuccessModal from "../../Modals/SuccessModal"




const Create = () => {
    const {user} = useAuthContext();
    const [type,setType] = useState('clothing');
    const [messages,setMessaages] = useState([]);
    const {modalState, setSuccessModal, setFailedModal, resetModals} = useModalState();

    let shoesOptions = [
        "lifestyle",
        "running",
        "football",
        "gym",
        "boxing and wrestling",
      ];
      let clothingOptions = [
        "t-shirts",
        "sweatshirts",
        "tracksuits",
        "shorts",
        "jackets",
      ];
      let types = ["clothing", "shoes"];
      let genders = ["women", "men", "boys", "girls"];
      let brands = ["nike", "jordan", "adidas"];

  
    const handleSelect = (event) => {
        setType(event.target.value);
    };

    const dataFormater = (data) => {
        data.sizes = data.sizes.split(',');
        data.sizes = data.sizes.map(x => x.split(':')) ;
        data.sizes = Object.fromEntries(data.sizes);
        data.price = Number(data.price);
        for (const key in data.sizes) {
           data.sizes[key] = Number(data.sizes[key]);
        };
        return data;
    };

    const submitHandler = async(event) => {
        event.preventDefault();
        const formData = new FormData(event.target) ;
        const data = Object.fromEntries(formData);
        const formatedData = dataFormater(data);
        let validationsResponse = validateProductForms(formatedData);
        if(validationsResponse.length > 0) return setMessaages(validationsResponse);
        if(!validationsResponse.length)  setMessaages([]);
        try{
            const response = await productsRequester.create(formatedData,user.accessToken)
            const jsonResponse = await response.json();
            if(response.status !== 201){
                setFailedModal(jsonResponse.message);
            }
            if(response.status === 201){
                setSuccessModal("You have successfully create new product!");
            }
        } catch(err){
            console.log(err);
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

        <div className="bg-[#FAF9F6] rounded-3xl mt-6 w-full shadow-lg flex-row py-4">
        <h1 className="text-[#ffe0bd] text-2xl italic  font-bold w-full text-center mt-2">
            Hello, {user.firstName}
            <br/>
            what product we will create today?
            </h1>
        {messages.length > 0 
        ? messages.map((message) => <ValidationMessage key={message} message={message}/>)
        : null
        }
        <form onSubmit={submitHandler}>
        <div className="flex mt-4 justify-center">
            <label htmlFor="type" className="w-[60px] mr-12">Type:</label>
            <select type="input" name="type" id="type" onChange={handleSelect} className="w-[190px] capitalize">
            {types.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="category" className="w-[60px] mr-12">Category:</label>
            <select type="input" name="category" id="category" className="w-[190px] capitalize">
                {type === 'clothing' 
                ? clothingOptions.map((option) => <option key={option} value={option}>{option}</option>)
                : shoesOptions.map((option) => <option key={option} value={option}>{option}</option>)
            }
            </select>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="gender" className="w-[60px] mr-12">Gender:</label>
            <select type="input" name="gender" id="gender" className="w-[190px] capitalize">
                {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
            </select>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="brand" className="w-[60px] mr-12">Brand:</label>
            <select type="input" name="brand" id="brand" className="w-[190px] capitalize">
            {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}

            </select>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="sizes" className="w-[60px] mr-12">Sizes and Quantities:</label>
            <textarea 
            type="input" name="sizes" 
            placeholder={type=== 'clothing' 
            ? 'ex: XL : 5, M : 15,  S : 13 You should add comma as shown in example' 
            : 'ex: 43 : 10, 46 : 15, 42 : 13 You should add comma as shown in example'} 
            id="sizes" className="w-[190px]">
            </textarea>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="imageUrl" className="w-[60px] mr-12">ImageUrl:</label>
            <input type="input" name="imageUrl" id="imageUrl" className="w-[190px]" />
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="color"  className="w-[60px] mr-12">Color:</label>
            <input type="input" name="color" id="color" className="w-[190px]" />
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="price"  className="w-[60px] mr-12">Price:</label>
            <input type="number" name="price" id="price" className="w-[190px]" />
        </div>
        <div className="flex mt-4 justify-center">
            <button type="submit" className="py-2 px-10 mb-2 rounded-md text-white bg-[#d9b99b] font-bold">Submit</button>
        </div>

        </form>
    </div>
    </>
    );
};

export default Create;