import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


import * as productsRequester from "../../../services/productsRequester"
import { useModalsContext } from "../../../context/ModalsContext";

import ProductLayoutCard from "./ProductLayoutCard";
import AttentionModal from "../../Modals/AttentionModal";
import Filter from "./Filter";
import Spinner from "../../Spinner/Spinner";

const ProductsLayout = () => {
  const [products,setProducts] = useState([]);
  const [isFilterShown,setIsFilterShown] = useState(false);
  const [isLoading,setIsLoading] = useState(true);


  const {gender} = useParams();
  const navigate = useNavigate();

  const {modalState,setFailedModal,resetModals} = useModalsContext()


  useEffect(()=> {
    setIsLoading(true)
    if(gender !== 'men' && gender !== 'women' && gender !== 'boys' && gender !== 'girls' && gender !== 'all') navigate('/');
    initialRequest(gender).then(({response,jsonResponse}) => {
      setIsLoading(false)
      if (response.status !== 200) throw {responseStatus:response.status, message:jsonResponse.message};
      if (response.status === 200) setProducts(jsonResponse)
    }).catch((err) => {
      if(err.responseStatus) return setFailedModal(err.message);
      console.log(err)
    })

  },[gender])

  const initialRequest = async (gender) => {
    const response = await productsRequester.getMany(gender)
    const jsonResponse = await response.json()
    return {response,jsonResponse}
  }

  const filterButtonHandler = () => {
    setIsFilterShown(!isFilterShown);
  }

  return (
    <>
    {modalState.isFailed.value 
    ? <AttentionModal 
    titleMessage={"Something went wrong"}
    descriptionMessage={modalState.isFailed.message}
    buttonHandler={resetModals}
    buttonName={"Try again"}/>
    :<div className="bg-white">
    { isLoading 
    ? <Spinner/>
    : <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-[100rem] lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>
        <div className="mt-2">
          <button onClick={filterButtonHandler} className="py-2 px-10 rounded-md italic font-bold text-xl text-white bg-[#00df9a] hover:bg-green-300 ease-in-out duration-500">{isFilterShown ? 'Hide Filters' : 'Show Filters'}</button>
        </div>
        {isFilterShown 
        ?<Filter
        gender={gender}/>
        :null
        }
        <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map(product  => <ProductLayoutCard key={product._id} product={product}/>)}
        </div>
      </div>}
    </div>
    }
  </>  
  );
};

export default ProductsLayout;
