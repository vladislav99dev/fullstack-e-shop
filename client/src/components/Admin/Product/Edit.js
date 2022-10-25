import { useEffect, useState, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext";
import { useModalsContext } from "../../../context/ModalsContext";

import * as productsRequester from "../../../services/productsRequester";
import productsValidations from "../../../validations/productsValidations";
import {
  productSizeFormater,
} from "../../../services/dataServices";

import isAdmin from "../../../HOC/adminRoutesGuard";


import AttentionModal from "../../Modals/AttentionModal";
import SuccessModal from "../../Modals/SuccessModal";
import ValidationMessage from "../../ValidationMessage/validationMessage";

import productData from "../../../utils/productData";

const initialSelectStates = { type: "", category: "", gender: "", brand: "" };

const reducerSelectStates = (state, action) => {
  switch (action.type) {
    case "type":
      return {
        type: action.payload,
        category: state.category,
        gender: state.gender,
        brand: state.brand,
      };
    case "category":
      return {
        type: state.type,
        category: action.payload,
        gender: state.gender,
        brand: state.brand,
      };
    case "gender":
      return {
        type: state.type,
        category: state.category,
        gender: action.payload,
        brand: state.brand,
      };
    case "brand":
      return {
        type: state.type,
        category: state.category,
        gender: state.gender,
        brand: action.payload,
      };
    case "all":
      return {
        type: action.payload.type,
        category: action.payload.category,
        gender: action.payload.gender,
        brand: action.payload.brand,
      };
    default:
      return{
        type:"",
        category:"",
        gender:"",
        brand:"",
      }
  }
};

const Edit = () => {

  const [validationMessages, setValidationMessages] = useState([]);
  const [product, setProduct] = useState({});

  const [selectStates, dispatch] = useReducer(
    reducerSelectStates,
    initialSelectStates
    );
  const navigate = useNavigate();
  const { productId } = useParams();


  const { user } = useAuthContext();
  const { modalState, setFailedModal, setSuccessModal, resetModals } =
    useModalsContext();


  useEffect(() => {
    initialRequest(user.accessToken, productId)
      .then(({ response, jsonResponse }) => {
        if (response.status !== 200)  throw {responseStatus:response.status, message:jsonResponse.message}
        if (response.status === 200) {
          const result = productDisplaySizeFormatter(jsonResponse);
          setProduct(result);
          setAllSelectStates("all", {
            type: result.type,
            category: result.category,
            gender: result.gender,
            brand: result.brand,
          });
        }
      })
      .catch((err) => {
        if(err.responseStatus) setFailedModal(err.jsonResponse.message)
        console.log(err);
      });
  }, []);

  const initialRequest = async (accessToken, productId) => {
    const response = await productsRequester.getOne(
      null,
      accessToken,
      productId
    );
    const jsonResponse = await response.json();
    return { response, jsonResponse };
  };


  const productDisplaySizeFormatter = (product) => {
    product.sizes = JSON.stringify(product.sizes);
    product.sizes = product.sizes.replaceAll('"', "");
    product.sizes = product.sizes.replace("{", "");
    product.sizes = product.sizes.replace("}", "");
    return product;
  };

  const setSelectState = (state, event) => {
    dispatch({ type: state, payload: event.target.value });
  };

  const setAllSelectStates = (state, data) => {
    dispatch({ type: state, payload: data });
  };

  let sortedBrands = productData.brands.sort((a) =>
    a === product.brand ? -1 : 1
  );
  let sortedGenders = productData.genders.sort((a) =>
    a === product.gender ? -1 : 1
  );
  let sortedClothingOptions = productData.clothingOptions.sort((a) =>
    a === product.category ? -1 : 1
  );
  let sortedShoeOptions = productData.shoeOptions.sort((a) =>
    a === product.category ? -1 : 1
  );
  let sortedTypes = productData.types.sort((a) => (a === product.type ? -1 : 1));


  const modalButtonHandler = () => {
    resetModals();
    navigate("/");
  };


  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const formatedData = productSizeFormater(data);

    let validationsResponse = productsValidations.validateAllData(formatedData);
    if (validationsResponse.length > 0) return setValidationMessages(validationsResponse);
    if (!validationsResponse.length) setValidationMessages([]);

    try {
      const response = await productsRequester.edit(
        formatedData,
        user.accessToken,
        product._id,
        user._id
      );
      const jsonResponse = await response.json();
      
      if (response.status !== 200) throw{responseStatus:response.status,message:jsonResponse.message}
      if (response.status === 200) setSuccessModal("You have successfully updated the product!");
    } catch (err) {
      if(err.status) return setFailedModal(err.message)
      console.log(err);
    }
  };

  return (
    <>
      {modalState.isFailed.value ? (
        <AttentionModal
          titleMessage={"Operation failed!"}
          descriptionMessage={modalState.isFailed.message}
          buttonHandler={modalButtonHandler}
          buttonName={"Try again"}
        />
      ) : null}

      {modalState.isSuccess.value ? (
        <SuccessModal
          titleMessage={"Success"}
          descriptionMessage={modalState.isSuccess.message}
          buttonHandler={modalButtonHandler}
          buttonName={"Continue"}
        />
      ) : null}

      <div className="bg-white rounded-3xl mt-6 w-full shadow-lg flex-row py-4">
        <h1 className="text-[#00df9a] text-2xl italic  font-bold w-full text-center mt-2">
          Hello, {user.firstName}
          <br />
          what we will edit today?
        </h1>
        {validationMessages.length > 0
          ? validationMessages.map((message) => (
              <ValidationMessage key={message} message={message} />
            ))
          : null}
                  <form onSubmit={submitHandler}>
        <select type="text" name="type" onChange={setSelectState.bind(null, "type")} value={selectStates.type} className="form-input capitalize font-semibold text-gray-700" placeholder="">
            {productData.types.map(type => <option className="text-center font-semibold text-gray-700" key={type} value={type}>{type}</option>)}
        </select>

        <select type="input" name="category" id="category" className="form-input capitalize font-semibold text=gray-700 mt-0" value={selectStates.category} onChange={setSelectState.bind(null, "category")}>
            {selectStates.type === 'clothing' 
            ? sortedClothingOptions.map((option) => <option className="text-center font-semibold text-gray-700" key={option} value={option}>{option}</option>)
            : sortedShoeOptions.map((option) => <option className="text-center font-semibold text-gray-700"  key={option} value={option}>{option}</option>)
}       </select>

        <input type="text" className="form-input mt-0 capitalize text-center font-semibold text-gray-700" name="name" id="name" defaultValue={product.name}/>

        <select type="input" name="gender" id="gender" className="form-input mt-0 capitalize font-semibold text-gray-700" onChange={setSelectState.bind(null, "gender")} value={selectStates.gender}>
        {sortedGenders.map(gender => <option className="font-semibold text-gray-700 text-center" key={gender} value={gender}>{gender}</option>)}
        </select>

        <select type="input" name="brand" id="brand" className="form-input mt-0 text-center font-semibold text-grey-700 capitalize" onChange={setSelectState.bind(null, "brand")} value={selectStates.brand}>
        {sortedBrands.map(brand => <option className="font-semibold text-gray-700 text-center" key={brand} value={brand}>{brand}</option>)}
        </select>

        <textarea 
        type="input" name="sizes" 
        defaultValue={product.sizes}
        placeholder={selectStates.type=== 'clothing' 
        ? 'ex: XL:5, M:15, S:13 You should add comma as shown in example,without spacing between double dots!' 
        : 'ex: 43:10, 46:15, 42:13 You should add comma as shown in example'} 
        id="sizes" className="form-input mt-0 text-center font-semibold text-gray-700 mb-[0.25rem]">
        </textarea>

        <input type="input" name="imageUrl" id="imageUrl" className="form-input mt-0 text-center font-semibold text-gray-700" placeholder="ImageUrl:" defaultValue={product.imageUrl}/>
        
        <select type="input" name="color" id="color" className="form-input mt-0 text-center font-semibold text-grey-700 capitalize" defaultValue={product.color}>
        {productData.colors.map(color => <option className="font-semibold text-gray-700 text-center" key={color} value={color}>{color}</option>)}
        </select>
        
        <input type="number" name="price" id="price" className="form-input mt-0 text-center font-semibold text-gray-700" placeholder="Price:" defaultValue={product.price}/>
        <button className="py-2 border-[#00df9a] w-[25%] ml-[37.5%] mt-4 rounded-md italic font-bold text-xl text-white bg-[#00df9a] hover:bg-green-300 ease-in-out duration-500">Submit</button>
        
        </form>
      </div>
    </>
  );
};
export default isAdmin(Edit);



{/* <form onSubmit={submitHandler}>
<div className="flex mt-4 justify-center">
  <label htmlFor="type" className="w-[60px] mr-12">
    Type:
  </label>
  <select
    type="input"
    name="type"
    id="type"
    onChange={setSelectState.bind(null, "type")}
    className="w-[190px] capitalize"
    value={selectStates.type}
  >
    {sortedTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="category" className="w-[60px] mr-12">
    Category:
  </label>
  <select
    type="input"
    name="category"
    id="category"
    className="w-[190px] capitalize"
    onChange={setSelectState.bind(null, "category")}
    value={selectStates.category}
  >
    {selectStates.type === "clothing"
      ? sortedClothingOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      : sortedShoeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
  </select>
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="name" className="w-[60px] mr-12">
    Name:
  </label>
  <input
    type="input"
    name="name"
    id="name"
    className="w-[190px] capitalize"
    defaultValue={product.name}
  ></input>
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="gender" className="w-[60px] mr-12">
    Gender:
  </label>
  <select
    type="input"
    name="gender"
    id="gender"
    className="w-[190px] capitalize"
    onChange={setSelectState.bind(null, "gender")}
    value={selectStates.gender}
  >
    {sortedGenders.map((gender) => (
      <option key={gender} value={gender}>
        {gender}
      </option>
    ))}
  </select>
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="brand" className="w-[60px] mr-12">
    Brand:
  </label>
  <select
    type="input"
    name="brand"
    id="brand"
    value={selectStates.brand}
    onChange={setSelectState.bind(null, "brand")}
    className="w-[190px] capitalize"
  >
    {sortedBrands.map((brand) => (
      <option key={brand} value={brand}>
        {brand}
      </option>
    ))}
  </select>
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="sizes" className="w-[60px] mr-12">
    Sizes and Quantities:
  </label>
  <textarea
    type="input"
    name="sizes"
    defaultValue={product.sizes}
    placeholder={
      selectStates.type === "clothing"
        ? "ex: XL : 5, M : 15,  S : 13 You should add comma as shown in example"
        : "ex: 43 : 10, 46 : 15, 42 : 13 You should add comma as shown in example"
    }
    id="sizes"
    className="w-[190px]"
  ></textarea>
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="imageUrl" className="w-[60px] mr-12">
    ImageUrl:
  </label>
  <input
    type="input"
    name="imageUrl"
    id="imageUrl"
    className="w-[190px]"
    defaultValue={product.imageUrl}
  />
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="color" className="w-[60px] mr-12">
    Color:
  </label>
  <input
    type="input"
    name="color"
    id="color"
    className="w-[190px] capitalize"
    defaultValue={product.color}
  />
</div>
<div className="flex mt-4 justify-center">
  <label htmlFor="price" className="w-[60px] mr-12">
    Price:
  </label>
  <input
    type="number"
    name="price"
    id="price"
    className="w-[190px]"
    defaultValue={product.price}
  />
</div>
<div className="flex mt-4 justify-center">
  <button
    type="submit"
    className="py-2 px-10 mb-2 rounded-md text-white bg-[#00df9a] font-bold"
  >
    Submit
  </button>
</div>
</form> */}
