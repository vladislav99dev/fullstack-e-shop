import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import * as productsRequester from "../../services/productsRequester"
import * as favouritesAndCartServices from "../../services/favouritesAndCartServices"
import useModalState from "../../hooks/useModalState";
import { useAuthContext } from "../../context/AuthContext";
import AttentionModal from "../Modals/AttentionModal";
import SuccessModal from "../Modals/SuccessModal";

const ProductDetails = () => {
const {productId} = useParams();
const [product,setProduct] = useState({});
const [size, setSize] = useState("");
const [quantity,setQuantity] = useState(0);
const {modalState,setSuccessModal,setFailedModal,resetModals} = useModalState()
const {user,login} = useAuthContext();


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

const clothingText = 'Made from soft fabric for lasting comfort, the Paris Saint-Germain T-Shirt has signature details to let you show everyone who you support';
const shoeText = "At home on Italian runways and local neighbourhood streets, the Nike Air Max Plus 3 features a design that's ahead of its time."

const addToCartHandler = async(event) => {
    event.preventDefault();
    const response = await favouritesAndCartServices.addToCart(user._id,product._id,size,quantity);
    const jsonResponse = await response.json();
    if(response.status !== 200) setFailedModal(jsonResponse.message);
    if(response.status === 200) {
        login(jsonResponse.user)
        setSuccessModal(jsonResponse.message)
    }
}


const addToFavouriteHandler = async(event) => {
    event.preventDefault(); 
    const response = await favouritesAndCartServices.addToFavourites(user._id,product._id);
    const jsonResponse = await response.json();
    if(response.status !== 200) setFailedModal(jsonResponse.message);
    if(response.status === 200) {
        login(jsonResponse.user);
        setSuccessModal(jsonResponse.message)
    }
}

const setSizeChoice = (event) => {
    event.preventDefault();
    const [size,qty] = event.target.value.split(',')
    if(Number(qty) > 0) {
        setSize(size)
    }
}
const setQuantityChoice = (event) => {
    setQuantity(Number(event.target.value))
}


return (
    <>
    {modalState.isFailed.value 
    ? <AttentionModal
        titleMessage={"Something went wrong!"}
        descriptionMessage={modalState.isFailed.message}
        buttonHandler={resetModals}
        buttonName={"Try again"}
    />
    :null
    }
    {modalState.isSuccess.value 
    ? <SuccessModal
        titleMessage={"Success!"}
        descriptionMessage={modalState.isSuccess.message}
        buttonHandler={resetModals}
        buttonName={"Continue"}
    />
    :null
    }
<div id="wrapper" className="h-full bg-white lg:grid lg:grid-cols-2 py-10">
    {product.name 
    ? <>
        <div className="lg:w-[60%] lg:ml-[15%]">
            <p className="text-2xl pt-4 ml-6 font-semibold">{product.name}</p>
            <p className="text-xl ml-6 capitalize text-[grey]">{`${product.gender}'s ${product.type}`}</p>
            <p className="text-xl py-4 ml-6 font-medium text-[grey]">{`USD $${product.price}`}</p>
            <p className="ml-6 text-md font-semibold text-gray-800">{product.type === 'clothing' ? clothingText : shoeText}</p>
        </div>

        <img className="w-full lg:row-span-3 lg:order-first lg:h-[40rem] lg:min-w-[70%] lg:max-w-[80%] xl:max-w-[60%] lg:rounded-xl lg:ml-[15%] xl:ml-[20%]" src={`${product.imageUrl}`} alt={`${product.name}`} />

        <form onSubmit={addToCartHandler} id="sizesAndButtons" className="w-[60%] ml-[15%]">
            <p className="text-xl mt-4 py-4 ml-6 font-medium text-[grey]">Select Size</p>
            <div className="mt-2  grid grid-cols-3 gap-y-4 gap-x-8">
            {Object.entries(product.sizes).map(([size,qty]) =>
             <button  key={size} value={[size,qty]} onClick={setSizeChoice} className={qty > 0 
                ? 'border-2 rounded-md border-gray-300 flex justify-center' 
                : 'rounded-md bg-gray-300 line-through flex justify-center cursor-default'}>{size}</button>)}
            </div>
            <div className="mt-6 w-[100%] text-center">
            <label htmlFor="selectQuantity">Select quantity</label>
                <select name="selectQuantity" className="w-[100%] border-2 border-[#DDDDDD] rounded-md font-semibold text-gray-700" onChange={setQuantityChoice}>
                    <option className="text-center" value="">Choose quantity</option>
                    <option className="text-center" value="1">1</option>
                    <option className="text-center" value="2">2</option>
                    <option className="text-center" value="3">3</option>
                    <option className="text-center" value="4">4</option>
                    <option className="text-center" value="5">5</option>
                    <option className="text-center" value="6">6</option>
                    <option className="text-center" value="7">7</option>
                    <option className="text-center" value="8">8</option>
                    <option className="text-center" value="9">9</option>
                    <option className="text-center" value="10">10</option>


                    
                </select>
            </div>

            <div className="flex justify-center">
            <button type="submit" className="py-6 px-[32%] border-2 mt-8 mb-4 rounded-2xl bg-neutral-900 font-medium text-white">Add to cart</button>
            </div>
            <div className="flex justify-center">
            <button className="py-6 px-[26%] border-2 mb-2 mt-4 rounded-2xl font-medium" onClick={addToFavouriteHandler}>Add to favourites &#x2764;</button>
            </div>
        </form>
    </>
    :null}
    </div>
    </>
)

}
export default ProductDetails;


                // if(selectedSize === size){
                //     return specialno
                // }               
                // return normalno



{/*              <button  key={size} value={qty} className={qty > 0 
                ? 'border-2 rounded-md border-gray-300 flex justify-center' 
                : 'rounded-md bg-gray-300 line-through flex justify-center cursor-default'}>{size}</button> */}





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