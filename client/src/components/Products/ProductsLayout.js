import ProductLayoutCard from "./ProductLayoutCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import * as productsRequester from "../../services/productsRequester"
import useModalState from "../../hooks/useModalState";

const ProductsLayout = () => {
  const {gender} = useParams();
  const navigate = useNavigate();
  const [products,setProducts] = useState([]);
  const {modalState,setSuccessModal,setFailedModal,resetModals} = useModalState()


  useEffect(()=> {
    if(gender !== 'men' && gender !== 'women' && gender !== 'boys' && gender !== 'girls') navigate('/users/logout');
    console.log(gender);
    initialRequest(gender).then(({response,jsonResponse}) => {
      if (response.status !== 200) setFailedModal(jsonResponse.message);
      if (response.status === 200) setProducts(jsonResponse)
    }).catch((err) => {
      setFailedModal("Server time out.");
    })

  },[gender])

  const initialRequest = async (gender) => {
    const response = await productsRequester.getMany(gender)
    const jsonResponse = await response.json()
    return {response,jsonResponse}
  }

  return (
    //should isplay attention modal

    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-[100rem] lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map(product  => <ProductLayoutCard key={product._id} product={product}/>)}
        </div>
      </div>
    </div>
  );
};

export default ProductsLayout;
