import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";

import  {useModalsContext} from "../../../context/ModalsContext"

import ValidationMessage from "../../ValidationMessage/validationMessage";

import * as productsRequester from '../../../services/productsRequester'
import {formDataExtracter, dataSizeFormater } from "../../../services/dataServices";
import AttentionModal from "../../Modals/AttentionModal";
import SuccessModal from "../../Modals/SuccessModal"

import productsValidations from "../../../services/formValidations/productsValidations";
import formData from "../../../utils/formData";




const Create = () => {
    const {user} = useAuthContext();
    const [type,setType] = useState('clothing');
    const [messages,setMessaages] = useState([]);
    const {modalState, setSuccessModal, setFailedModal, resetModals} = useModalsContext();

    const handleSelect = (event) => {
        setType(event.target.value);
    };

    const submitHandler = async(event) => {
        event.preventDefault();
        const data  = formDataExtracter(event.target)
        console.log(data);
        const formatedData = dataSizeFormater(data)
        let validationsResponse = productsValidations.validateAllData(formatedData)
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
        <h1 className="text-[#00df9a] text-2xl italic  font-bold w-full text-center mt-2">
            Hello, {user.firstName}
            <br/>
            what product we will create today?
            </h1>
        {messages.length > 0 
        ? messages.map((message) => <ValidationMessage key={message} message={message}/>)
        : null
        }
        <form onSubmit={submitHandler}>

        <select type="text" name="type" onChange={handleSelect} className="form-input capitalize font-semibold text-gray-700" placeholder="">
            {formData.types.map(type => <option className="text-center font-semibold text-gray-700" key={type} value={type}>{type}</option>)}
        </select>

        <select type="input" name="category" id="category" className="form-input capitalize font-semibold text=gray-700 mt-0">
            {type === 'clothing' 
            ? formData.clothingOptions.map((option) => <option className="text-center font-semibold text-gray-700" key={option} value={option}>{option}</option>)
            : formData.shoeOptions.map((option) => <option className="text-center font-semibold text-gray-700"  key={option} value={option}>{option}</option>)
}       </select>

        <input type="text" className="form-input mt-0 capitalize text-center font-semibold text-gray-700" name="name" id="name" placeholder="Product Name:"/>

        <select type="input" name="gender" id="gender" className="form-input mt-0 capitalize font-semibold text-gray-700">
        {formData.genders.map(gender => <option className="font-semibold text-gray-700 text-center" key={gender} value={gender}>{gender}</option>)}
        </select>

        <select type="input" name="brand" id="brand" className="form-input mt-0 text-center font-semibold text-grey-700 capitalize">
        {formData.brands.map(brand => <option className="font-semibold text-gray-700 text-center" key={brand} value={brand}>{brand}</option>)}
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
        {formData.colors.map(color => <option className="font-semibold text-gray-700 text-center" key={color} value={color}>{color}</option>)}
        </select>
        
        <input type="number" name="price" id="price" className="form-input mt-0 text-center font-semibold text-gray-700" placeholder="Price:"/>
        <button className="py-2 border-[#00df9a] w-[25%] ml-[37.5%] mt-4 rounded-md italic font-bold text-xl text-white bg-[#00df9a] hover:bg-green-300 ease-in-out duration-500">Submit</button>
        
        </form>
    </div>
    </>
    );
};

export default Create;







{/* <div className="flex mt-4 justify-center">
<label htmlFor="type" className="w-[60px] mr-12">Type:</label>
<select type="input" name="type" id="type" onChange={handleSelect} className="w-[190px] capitalize">
{formData.types.map(type => <option key={type} value={type}>{type}</option>)}
</select>
</div>
<div className="flex mt-4 justify-center">
<label htmlFor="category" className="w-[60px] mr-12">Category:</label>
<select type="input" name="category" id="category" className="w-[190px] capitalize">
    {type === 'clothing' 
    ? formData.clothingOptions.map((option) => <option key={option} value={option}>{option}</option>)
    : formData.shoeOptions.map((option) => <option key={option} value={option}>{option}</option>)
}
</select>
</div>
<div className="flex mt-4 justify-center">
<label htmlFor="name" className="w-[60px] mr-12">Name:</label>
<input type="input" name="name" id="name" className="w-[190px] capitalize"></input>
</div>
<div className="flex mt-4 justify-center">
<label htmlFor="gender" className="w-[60px] mr-12">Gender:</label>
<select type="input" name="gender" id="gender" className="w-[190px] capitalize">
    {formData.genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
</select>
</div>
<div className="flex mt-4 justify-center">
<label htmlFor="brand" className="w-[60px] mr-12">Brand:</label>
<select type="input" name="brand" id="brand" className="w-[190px] capitalize">
{formData.brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}

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
</div> */}
