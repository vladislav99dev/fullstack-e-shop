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
<div id="wrapper" className="h-full bg-white lg:grid lg:grid-cols-2">
<div >
    <p className="text-2xl pt-4 ml-6 font-semibold">{product.name}</p>
    <p className="text-xl ml-6 capitalize text-[grey]">{`${product.gender}'s ${product.type}`}</p>
    <p className="text-xl py-4 ml-6 font-medium text-[grey]">{`USD $${product.price}`}</p>
</div>

<img className="w-full lg:row-span-3 lg:order-first lg:h-[40rem] object-contain" src={`${product.imageUrl}`} alt={`${product.name}`} />

<div id="sizesAndButtons" className="lg:order-last">
    <p className="text-xl mt-4 py-4 ml-6 font-medium text-[grey]">Select Size</p>
    <div className="mt-6  grid grid-cols-3 gap-y-4 gap-x-8">
    {product.name ?  Object.entries(product.sizes).map(([size]) => <div className="border-2 rounded-md border-gray-300 flex justify-center"><p className="">{size}</p></div> ) : null}
    </div>
    <div className="flex justify-center">
    <button className="py-6 px-[30%] border-2 mt-8 mb-4 rounded-2xl bg-neutral-900 font-medium text-white">Add to basket</button>
    </div>
    <div className="flex justify-center">
    <button className="py-6 px-[33%] border-2 mb-8 rounded-2xl font-medium">Favourite<MdFavorite className="ml-[35%]"size={20}/></button>
    </div>
</div>

    </div>
)

}
export default ProductDetails;












{/* <div className="lg:order-last">
<p className="text-2xl pt-4 ml-6 font-semibold">{product.name}</p>
<p className="text-xl ml-6 capitalize text-[grey]">{`${product.gender}'s ${product.type}`}</p>
<p className="text-xl py-4 ml-6 font-medium text-[grey]">{`USD $${product.price}`}</p>
</div>

<img className="w-full lg:order-first" src={`${product.imageUrl}`} alt={`${product.name}`} />

<div id="sizesAndButtons" className="lg:order-last">
<p className="text-xl mt-4 py-4 ml-6 font-medium text-[grey]">Select Size</p>
<div className="mt-6  grid grid-cols-3 gap-y-4 gap-x-8">
{product.name ?  Object.entries(product.sizes).map(([size]) => <div className="border-2 rounded-md border-gray-300"><p className="ml-[40%]">{size}</p></div> ) : null}
</div>
<div className="flex justify-center">
<button className="py-6 px-[30%] border-2 mt-8 mb-4 rounded-2xl bg-neutral-900 font-medium text-white">Add to basket</button>
</div>
<div className="flex justify-center">
<button className="py-6 px-[33%] border-2 mb-8 rounded-2xl font-medium">Favourite<MdFavorite className="ml-[35%]"size={20}/></button>
</div>
</div> */}