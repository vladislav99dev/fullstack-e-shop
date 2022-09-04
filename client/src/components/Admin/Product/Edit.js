import { useEffect,useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useParams,useNavigate } from "react-router-dom";

import * as productsRequester from "../../../services/productsRequester"
import useModalState from "../../../hooks/useModalState";
import { validateProductForms } from "../../../services/formValidationsServices";

import AttentionModal from "../../Modals/AttentionModal";
import SuccessModal from "../../Modals/SuccessModal";
import ValidationMessage from "../../ValidationMessage/validationMessage";


const Edit = () => {
    const {user} = useAuthContext();
    const [type,setType] = useState('clothing');
    const [messages,setMessaages] = useState([]);
    const [product,setProduct] = useState({});
    const {productId} = useParams();
    const navigate = useNavigate();
    const {modalState,setFailedModal,setSuccessModal,resetModals} = useModalState()


    const initialRequest = async(user,productId) => {
        const response = await productsRequester.getOne(null,user.accessToken,productId);
        const jsonResponse = await response.json();
        return {response,jsonResponse}
    }

    useEffect(()=> {
         initialRequest(user,productId)
         .then(({response,jsonResponse}) => {
            if(response.status !== 200) setFailedModal(jsonResponse.message);
            if(response.status === 200) setProduct(jsonResponse);
         })
    },[])

    const attentionModalButtonHandler = () => {
        resetModals()
        navigate('/')
    }

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
        //if data has ho coma or semicolons return error message
        let validationsResponse = validateProductForms(formatedData);
        if(validationsResponse.length > 0) return setMessaages(validationsResponse);
        if(!validationsResponse.length)  setMessaages([]);
        try{
            const response = await productsRequester.edit(formatedData,user.accessToken,product._id);
            const jsonResponse = await response.json();
            if(response.status !== 200){
                setFailedModal(jsonResponse.message);
            }
            if(response.status === 200){
                setSuccessModal("You have successfully updated the product!");
            }
        } catch(err){
            console.log(err);
        }
    }

    const shoesOptions = ['Lifestyle','Running','Football','Gym','Boxing and Wrestling'];
    const clothingOptions = ['T-shirts','Sweatshirts','Tracksuits','Shorts','Jackets'];

    return (
    <>
        {modalState.isFailed.value 
        ? <AttentionModal 
        titleMessage={'Operation failed!'} 
        descriptionMessage={modalState.isFailed.message} 
        buttonHandler={attentionModalButtonHandler} 
        buttonName={'Try again'}/>  
        : null}

        {modalState.isSuccess.value
        ? <SuccessModal 
        titleMessage={'Success'}
        descriptionMessage={modalState.isSuccess.message}
        buttonHandler={attentionModalButtonHandler}
        buttonName={'Continue'}/> 
        : null}

    <div className="bg-[#FAF9F6] rounded-3xl mt-6 w-full shadow-lg flex-row py-4">
        <h1 className="text-[#ffe0bd] text-2xl italic  font-bold w-full text-center mt-2">
            Hello, {user.firstName}
            <br/>
            what we will edit today?
            </h1>
        {messages.length > 0 
        ? messages.map((message) => <ValidationMessage key={message} message={message}/>)
        : null
        }
        <form onSubmit={submitHandler}>
        <div className="flex mt-4 justify-center">
            <label htmlFor="type" className="w-[60px] mr-12">Type:</label>
            <select type="input" name="type" id="type" onChange={handleSelect} className="w-[190px]">
                <option value="clothing">Clothing</option>
                <option value="shoes">Shoes</option>
            </select>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="category" className="w-[60px] mr-12">Category:</label>
            <select type="input" name="category" id="category" className="w-[190px] ">
                {type === 'clothing' 
                ? clothingOptions.map((option) => <option key={option} value={option}>{option}</option>)
                : shoesOptions.map((option) => <option key={option} value={option}>{option}</option>)
            }
            </select>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="gender" className="w-[60px] mr-12">Gender:</label>
            <select type="input" name="gender" id="gender" className="w-[190px] ">
                <option value="men">Men</option>
                <option value="women">Women</option>
            </select>
        </div>
        <div className="flex mt-4 justify-center">
            <label htmlFor="brand" className="w-[60px] mr-12">Brand:</label>
            <select type="input" name="brand" id="brand" className="w-[190px] ">
                <option value="nike">Nike</option>
                <option value="jordan">Jordan</option>
                <option value="adidas">Adidas</option>
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
)
}
export default Edit;