import { Link } from "react-router-dom";

import { removeFromFavourties } from "../../../services/favouritesAndCartServices";

import { useModalsContext } from "../../../context/ModalsContext";
import { useAuthContext } from "../../../context/AuthContext";

import AttentionModal from "../../Modals/AttentionModal";

const FavouritesCard = ({
  product,
  profileId,
  manageIsLoading,
  toggleFavouritesMenu
}) => {
    const {modalState,setFailedModal,resetModals} = useModalsContext();
    const {login} = useAuthContext();
    
    const removeHandler = async(event) => {
      event.preventDefault();
      manageIsLoading(true)
      try{
        const response = await removeFromFavourties(profileId,product._id);
        const jsonResponse = await response.json();
        if(response.status !== 200) setFailedModal(jsonResponse.message);
        if(response.status === 200) login(jsonResponse.user);
        manageIsLoading(false)
      }catch(err){
        console.log(err);
        manageIsLoading(false)
      }
    }
    return (
      <>
      {modalState.isFailed.value 
      ? <AttentionModal
      titleMessage={'Something went wrong'}
      descriptionMessage={modalState.isFailed.message}
      buttonHandler={resetModals}
      buttonName={"Try again"}/>
      : null
      }
        <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img src={product.imageUrl} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3 onClick={toggleFavouritesMenu}>
                <Link to={`products/${product.gender}/details/${product._id}`}>{product.name}</Link>
              </h3>
              <p className="ml-4">{`$${product.price}`}</p>
            </div>
            <p className="mt-1 text-md text-gray-500 font-bold capitalize">{product.brand}</p>
            <p className="mt-1 text-sm text-gray-500 capitalize">{product.color}</p>
          </div>
          <div className="flex flex-1 items-end justify-end text-sm">
            <div className="flex">
              <button onClick={removeHandler} type="button" className="font-medium text-[#00df9a] hover:text-green-300 ">Remove</button>
            </div>
          </div>
        </div>
      </li>
      </>
    )
}

export default FavouritesCard;