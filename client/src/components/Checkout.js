import { useAuthContext } from "../context/AuthContext";
import {GiTigerHead} from "react-icons/gi"
const Checkout = () => {
    const {user} = useAuthContext();
    let totalPrice = 0;
    user.cart.map((product) => totalPrice += product._id.price * product.quantity);
    return (
        <div className="bg-white py-10 flex-column lg:grid lg:grid-cols-2">
            <form className="py-6 lg:py-10">
                <p className="uppercase text-2xl  ml-5 lg:ml-10 mb-10 font-bold text-gray-600  border-b-2">Shipping address</p>
                <div className="mb-6 flex 2xl:w-[97.5%] mr-[4%] lg:mr-0 ">
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 rounded-lg" type="text" name="firstName" id="firstName" placeholder="First Name *"/>
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 rounded-lg" type="text" name="lastName" id="lastName" placeholder="Last Name *"/>
                </div>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="street" id="street" placeholder="Street Address *"/>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="unitNumber" id="unitNumber" placeholder="Apartment/House Number# *"/>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="country" id="country" placeholder="Country *"/>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="city" id="city" placeholder="City *"/>
                <div className="flex 2xl:w-[97.5%] mr-[4%] lg:mr-0">
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="state" id="state" placeholder="State *"/>
                    <input className="border-2 py-2 w-[50%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="zipCode" id="zipCode" placeholder="Zip Code *"/>
                </div>
                <input className="border-2 py-2 w-[93.5%]  ml-5 lg:ml-10 mb-6 rounded-lg" type="text" name="city" id="city" placeholder="Phone: ex.0988902378 *"/>
                <button className=" ml-5 lg:ml-10 py-2 w-[50%] border-2 border-[#00df9a] rounded-lg mb-4 bg-[#00df9a] text-white font-bold italic" type="submit">Submit</button>
            </form>
            <div className="order-first lg:order-last">
                <div className="mt-20 ml-10 mr-10  bg-gray-100 rounded-lg">
                    <p className="uppercase text-xl font-bold  mt-10 text-center py-4 text-gray-600 border-b-2 border-gray-400">Order Summary</p>
                    {user.cart.map(product => (
                        <div className="flex justify-between py-2 border-b-2 border-gray-300">
                            <p className="ml-5 text-md font-bold  text-gray-400">{product._id.name}</p>
                            <div>
                            <p className="mr-5 text-md  italic text-gray-400">{`Quantity: ${product.quantity}`}</p>
                            <p className="mr-5 text-md font-bold italic text-gray-400">{`$${product._id.price}`}</p>
                            </div>
                        </div>
                    )) }
                    <div className="flex justify-between py-4">
                        <p className="ml-5 text-lg font-bold text-gray-500">Total:</p>
                        <p className="mr-10 text-xl font-bold text-gray-800">{`$${totalPrice}`}</p>
                    </div>
                </div>
                <div className=" flex justify-between border-2 border-[#00df9a] h-[30%] mt-10 ml-10 mr-10 rounded-md">
                        <GiTigerHead className="ml-4 mt-10 2xl:ml-32" size={100} color={'#00df9a'}/>
                        <div className="ml-4 mt-10 2xl:mr-32">
                            <p className="italic text-gray-500 lg:text-center">We are glad you choose us!</p>
                            <p className="text-center italic text-gray-500">You will get a free shipping from your next order!</p>
                            <p className="italic text-gray-500">Best regards, </p>
                            <p className="text-end text-xl font-bold uppercase italic text-[#00df9a]">- Supreme fashion shop</p>
                        </div>
                </div>
            </div>
            
        </div>
    )
}
export default Checkout;



{/* <div className="leading-loose">
  <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
    <p className="text-gray-800 font-medium">Customer information</p>
    <div className="">
      <label className="block text-sm text-gray-00" for="cus_name">Name</label>
      <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Your Name" aria-label="Name"/>
    </div>
    <div className="mt-2">
      <label className="block text-sm text-gray-600" for="cus_email">Email</label>
      <input className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Your Email" aria-label="Email"/>
    </div>
    <div className="mt-2">
      <label className=" block text-sm text-gray-600" for="cus_email">Address</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Street" aria-label="Email"/>
    </div>
    <div className="mt-2">
      <label className="hidden text-sm block text-gray-600" for="cus_email">City</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="City" aria-label="Email"/>
    </div>
    <div className="inline-block mt-2 w-1/2 pr-1">
      <label className="hidden block text-sm text-gray-600" for="cus_email">Country</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Country" aria-label="Email"/>
    </div>
    <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
      <label className="hidden block text-sm text-gray-600" for="cus_email">Zip</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email"  name="cus_email" type="text" required="" placeholder="Zip" aria-label="Email"/>
    </div>
    <p className="mt-4 text-gray-800 font-medium">Payment information</p>
    <div className="">
      <label className="block text-sm text-gray-600" for="cus_name">Card</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Card Number MM/YY CVC" aria-label="Name"/>
    </div>
    <div className="mt-4">
      <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">$3.00</button>
    </div>
  </form>
</div> */}