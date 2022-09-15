import { useState } from "react";
import CartCard from "./CartCard";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import Spinner from "../../Spinner/Spinner";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavTogglesContext } from "../../../context/NavTogglesContext";



const ProductsCard = () => {

  const [isLoading,setIsLoading] = useState(false);
  const {toggleCartMenu} = useNavTogglesContext();
  const { user } = useAuthContext();
  let totalPrice = 0;
  user.cart.map((product) => totalPrice += product._id.price * product.quantity);

  const manageIsLoading = (value) => {
    setIsLoading(value)
  }


  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        --> */}
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <CartHeader toggleCartMenu={toggleCartMenu}/>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >{isLoading 
                        ? <Spinner/>
                        : user.cart.length 
                        ? user.cart.map((product) => (
                            <CartCard
                              key={`${product._id._id}${product.size}`}
                              product={product._id}
                              quantity={product.quantity}
                              size={product.size}
                              toggleCartMenu={toggleCartMenu}
                              profileId={user._id}
                              manageIsLoading={manageIsLoading}
                            />
                          ))
                        : <p className="text-md font-bold text-green-300">No products added to cart!</p>
                      }
                      </ul>
                    </div>
                  </div>
                </div>
                <CartFooter totalPrice={totalPrice} toggleCartMenu={toggleCartMenu}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsCard;
