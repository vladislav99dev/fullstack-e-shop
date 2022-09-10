import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import * as productsRequester from "../../services/productsRequester"
import useModalState from "../../hooks/useModalState";


const ProductDetails = () => {
const {productId} = useParams();
const [product,setProduct] = useState({});
const {modalState,setSuccessModal,setFailedModal,resetModals} = useModalState()

useEffect(() => {
    initialRequset(productId).then(({response,jsonResponse}) => {
        if (response.status !== 200) setFailedModal(jsonResponse.message)
        console.log(Object.entries(product.sizes))
        if(response.status === 200) setProduct(jsonResponse)
    }).catch(err => {
        console.log(err);
        setFailedModal("server time out.")
    })
},[])

const initialRequset = async(id) => {
    //try get one objec assignment
    const response = await productsRequester.getOne(null,null,id)
    const jsonResponse = await response.json()
    return {response,jsonResponse}
} 

return (
    <div className="h-full bg-white">
        <p className="text-2xl pt-4 ml-6 font-semibold">{product.name}</p>
        <p className="text-xl ml-6 capitalize text-[grey]">{`${product.gender}'s ${product.type}`}</p>
        <p className="text-xl py-4 ml-6 font-medium text-[grey]">{`USD $${product.price}`}</p>

        <img className="w-full" src={`${product.imageUrl}`} alt={`${product.name}`} />
        <p className="text-xl mt-4 py-4 ml-6 font-medium text-[grey]">Select Size</p>
        <div className="mt-6  grid grid-cols-3 gap-y-4 gap-x-8">
            {Object.entries(product.sizes).map(([size]) => <p className="border-2 rounded-md border-gray-300"><div className="ml-[40%]">{size}</div></p> )}
        </div>
        <div className="flex justify-center">
        <button className="py-6 px-[30%] border-2 mt-8 mb-4 rounded-2xl bg-neutral-900 font-medium text-white">Add to basket</button>
        </div>
        <div className="flex justify-center">
        <button className="py-6 px-[34%] border-2 mb-8 rounded-2xl font-medium">Favourite<MdFavorite className="ml-[35%]"size={20}/></button>
        </div>
    </div>
)

}
export default ProductDetails;