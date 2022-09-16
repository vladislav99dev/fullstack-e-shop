import { useNavigate } from "react-router-dom";

const CartFooter = ({
totalPrice,
toggleCartMenu
}) => {
  const navigate = useNavigate();

  const checkoutHandler = (event) => {
    event.preventDefault();
    toggleCartMenu();
    navigate('/order/checkout')
  }
    return (
        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>{`$${totalPrice.toFixed(2)}`}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <button onClick={checkoutHandler} className="flex items-center justify-center rounded-md border border-transparent w-full bg-[#00df9a] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-300">Checkout</button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button onClick={toggleCartMenu} type="button" className="font-medium text-[#00df9a] hover:text-green-300">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    )
}

export default CartFooter;