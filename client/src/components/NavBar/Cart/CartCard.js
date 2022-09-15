import { Link } from "react-router-dom";
import { removeFromCart } from "../../../services/favouritesAndCartServices";
import { useAuthContext } from "../../../context/AuthContext";
import useModalState from "../../../hooks/useModalState";
import AttentionModal from "../../Modals/AttentionModal"

const CartCard = ({
    product,
    quantity,
    size,
    toggleCartMenu,
    profileId,
    manageIsLoading
}) => {


  const {modalState,setFailedModal,resetModals} = useModalState();
  const {login} = useAuthContext();


  const removeHandler = async(event) => {
    event.preventDefault();
    manageIsLoading(true)
    try{
      const response = await removeFromCart(profileId,product._id,size)
      const jsonResponse = await response.json();
      if(response.status !== 200) setFailedModal(jsonResponse.message)
      if(response.status === 200){
        login(jsonResponse.user)
      }
      manageIsLoading(false)
    }catch(err){
      console.log(err);
      manageIsLoading(false)
    }

  }
    return(
      <>
      {modalState.isFailed.value 
      ? <AttentionModal
      titleMessage={'Something went wrong'}
      descriptionMessage={modalState.isFailed.message}
      buttonHandler={resetModals}
      buttonName={"Try again"}/>
      :null
      }
        <li className="flex py-6 hover:bg-gray-100 rounded-md ease-in duration-100">
        <div className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img src={product.imageUrl} alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="h-full w-full object-cover object-center"/>
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3 onClick={toggleCartMenu}>
                <Link  to={`/products/${product.gender}/details/${product._id}`}>{product.name}</Link>
              </h3>
              <p className="ml-4">{`$${product.price}`}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500 capitalize">{`${product.color}`}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">{`Size: ${size}`}</p>
            <p className="text-gray-500">{`Qty: ${quantity}`}</p>
            <div className="flex">
              <button onClick={removeHandler} type="button" className="font-medium text-[#00df9a] hover:text-green-300">Remove</button>
            </div>
          </div>
        </div>
      </li>
      </>
    )
}
export default CartCard;