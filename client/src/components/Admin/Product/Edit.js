import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

import * as productsRequester from "../../../services/productsRequester";
import useModalState from "../../../hooks/useModalState";
import { validateProductForms } from "../../../services/formValidationsServices";
import { extractAndFormatData } from "../../../services/dataServices";

import AttentionModal from "../../Modals/AttentionModal";
import SuccessModal from "../../Modals/SuccessModal";
import ValidationMessage from "../../ValidationMessage/validationMessage";

const Edit = () => {
  const { user } = useAuthContext();
  const [type, setType] = useState("");
  const [messages, setMessaages] = useState([]);
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const { modalState, setFailedModal, setSuccessModal, resetModals } =
    useModalState();
  const navigate = useNavigate();

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

  useEffect(() => {
    initialRequest(user.accessToken, productId)
      .then(({ response, jsonResponse }) => {
        if (response.status !== 200) setFailedModal(jsonResponse.message);
        if (response.status === 200) {
          const result = stringifySizes(jsonResponse);
          setProduct(result);
          setType(jsonResponse.type);
        }
      })
      .catch((err) => {
        console.log(err);
        setFailedModal("Server time out.")});
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

  const stringifySizes = (product) => {
        product.sizes = JSON.stringify(product.sizes)
        product.sizes = product.sizes.replaceAll('"','')
        product.sizes = product.sizes.replace("{",'')
        product.sizes = product.sizes.replace("}",'')
        return product  
  };

  const sortedGenders = genders.sort((a, b) => {
    if (a === product.gender) {
      return -1;
    }
  });
  const sortedBrands = brands.sort((a, b) => {
    if (a === product.brand) {
      return -1;
    }
  });
  const sortedTypes = types.sort((a, b) => {
    if (a === product.type) {
      return -1;
    }
  });
  const sortedClothingOptions = clothingOptions.sort((a, b) => {
    if (a === product.category) {
      return -1;
    }
  });
  const sortedShoeOptions = shoesOptions.sort((a, b) => {
    if (a === product.category) {
      return -1;
    }
  });

  const modalButtonHandler = () => {
    resetModals();
    navigate("/");
  };

  const handleSelect = (event) => {
    setType(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formatedData = extractAndFormatData(event.target);

    let validationsResponse = validateProductForms(formatedData);
    if (validationsResponse.length > 0)
      return setMessaages(validationsResponse);
    if (!validationsResponse.length) setMessaages([]);

    try {
      const response = await productsRequester.edit(
        formatedData,
        user.accessToken,
        product._id
      );
      const jsonResponse = await response.json();
      if (response.status !== 200) {
        setFailedModal(jsonResponse.message);
      }
      if (response.status === 200) {
        setSuccessModal("You have successfully updated the product!");
      }
    } catch (err) {
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

      <div className="bg-[#FAF9F6] rounded-3xl mt-6 w-full shadow-lg flex-row py-4">
        <h1 className="text-[#ffe0bd] text-2xl italic  font-bold w-full text-center mt-2">
          Hello, {user.firstName}
          <br />
          what we will edit today?
        </h1>
        {messages.length > 0
          ? messages.map((message) => (
              <ValidationMessage key={message} message={message} />
            ))
          : null}
        <form onSubmit={submitHandler}>
          <div className="flex mt-4 justify-center">
            <label htmlFor="type" className="w-[60px] mr-12">
              Type:
            </label>
            <select
              type="input"
              name="type"
              id="type"
              onChange={handleSelect}
              className="w-[190px] capitalize"
            >
              {sortedTypes.map((type) => (
                <option defaultValue={type}>{type}</option>
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
            >
              {type === "clothing"
                ? sortedClothingOptions.map((option) => (
                    <option key={option} defaultValue={option}>
                      {option}
                    </option>
                  ))
                : sortedShoeOptions.map((option) => (
                    <option key={option} defaultValue={option}>
                      {option}
                    </option>
                  ))}
            </select>
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
            >
              {sortedGenders.map((gender) => (
                <option defaultValue={gender}>{gender}</option>
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
              className="w-[190px] capitalize"
            >
              {sortedBrands.map((brand) => (
                <option defaultValue={brand}>{brand}</option>
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
                type === "clothing"
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
              className="py-2 px-10 mb-2 rounded-md text-white bg-[#d9b99b] font-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Edit;
