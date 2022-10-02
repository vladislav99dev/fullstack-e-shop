import { useReducer } from 'react'

import {SiTwitter,SiFacebook,SiInstagram,SiYoutube} from 'react-icons/si'
import {MdLocationOn} from "react-icons/md"

import MobileToggle from './MobileToggle'
import DesktopCard from './DesktopCard'

const initialTogglesState = {
    hetHelp:false,
    about:false,
    apps:false,
}


const reducerToggleState = (state,action) => {
    switch (action.type) {
        case "getHelp":
            return {
                getHelp:!state.getHelp,
                about:false,
                apps:false
            }
        case "about":
            return {
                getHelp:false,
                about:!state.about,
                apps:false
            }  
        case "apps":
            return {
                getHelp:false,
                about:false,
                apps:!state.apps
            }   
        default:
            break;
    }
}

const Footer = () => {
    const [togglesState,dispatch] = useReducer(reducerToggleState,initialTogglesState);

    const toggler = (type) => {
        dispatch({type:type})
    }
    return (
        <div className="bg-black md:grid md:grid-cols-4">
            <div>
                <ul className="text-white px-6 pt-8 pb-4 font-semibold">
                    <li className="py-[0.4rem] text-sm">FIND A STORE</li>
                    <li className="py-[0.4rem] text-sm">NIKE JOURNAL</li>
                    <li className="py-[0.4rem] text-sm">BECOME A MEMBER</li>
                    <li className="py-[0.4rem] text-sm">FEEDBACK</li>
                    <li className="py-[0.4rem] text-sm">PROMO CODES</li>
                </ul>
            </div>

        <MobileToggle 
        togglesState={togglesState} 
        clickHandler ={toggler.bind(null,"getHelp")} 
        titleName={"GET HELP"} 
        services={["Order Status","Shipping and Delivery","Returns", "Payment Options", "Contact us"]}
        state={"getHelp"}
        />

        <MobileToggle 
        togglesState={togglesState} 
        clickHandler ={toggler.bind(null,"about")} 
        titleName={"ABOUT NIKE"} 
        services={["News","Carrers","Investors", "Sustainability"]}
        state={"about"}
        />

        <MobileToggle 
        togglesState={togglesState} 
        clickHandler ={toggler.bind(null,"apps")} 
        titleName={"NIKE APPS"} 
        services={["Nike App","Nike Run Club","Nike Training Club", "SNKRS"]}
        state={"apps"}
        />

        <DesktopCard 
        titleName={"GET HELP"}
        services={["Order Status","Shipping and Delivery","Returns", "Payment Options", "Contact us"]}
        />
        <DesktopCard 
        titleName={"GET HELP"}
        services={["Order Status","Shipping and Delivery","Returns", "Payment Options", "Contact us"]}
        />
        <DesktopCard 
        titleName={"GET HELP"}
        services={["Order Status","Shipping and Delivery","Returns", "Payment Options", "Contact us"]}
        />




        {/* <div onClick={toggler.bind(null,"getHelp")} className='flex justify-between cursor-pointer bg-[#00df9a] hover:bg-green-300 ease-in-out duration-200 md:hidden'>
            <ul  className="text-white px-6 py-4 font-semibold text-sm">GET HELP
                    {togglesState.getHelp 
                    ?<>
                        <li className="py-[0.25rem] text-sm mt-4 text-green-100">Order Status</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Shipping and Delivery</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Reteurns</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Payment Options</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Contact us</li> 
                    </>
                    :null
                    }
            </ul>
            {togglesState.getHelp 
            ? <BiMinus className='mt-4 mr-4' color={'white'} size={30}/> 
            : <BiPlus className='mt-4 mr-4' color={'white'} size={30}/>
            }   
        </div> */}

        {/* <div onClick={toggler.bind(null,"about")} className='flex justify-between cursor-pointer bg-[#00df9a] hover:bg-green-300 ease-in-out duration-200 md:hidden'>
            <ul  className="text-white px-6 py-4 font-semibold text-sm">ABOUT NIKE
                    {togglesState.about 
                    ?<>
                        <li className="py-[0.25rem] text-sm mt-4 text-green-100">News</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Careers</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Reteurns</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Investors</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Sustainability</li> 
                    </>
                    :null
                    }
            </ul>
            {togglesState.about 
            ? <BiMinus className='mt-4 mr-4' color={'white'} size={30}/> 
            : <BiPlus className='mt-4 mr-4' color={'white'} size={30}/>
            }   
        </div>

        <div onClick={toggler.bind(null,"apps")} className='flex justify-between cursor-pointer bg-[#00df9a] hover:bg-green-300 ease-in-out duration-200 md:hidden'>
            <ul  className="text-white px-6 py-4 font-semibold text-sm">NIKE APPS
                    {togglesState.apps 
                    ?<>
                        <li className="py-[0.25rem] text-sm mt-4 text-green-100">Nike-App</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Nike Run Club</li>
                        <li className="py-[0.25rem] text-sm text-green-100">Nike Training Club</li>
                        <li className="py-[0.25rem] text-sm text-green-100">SNKRS</li>
                    </>
                    :null
                    }
            </ul>
            {togglesState.apps 
            ? <BiMinus className='mt-4 mr-4' color={'white'} size={30}/> 
            : <BiPlus className='mt-4 mr-4' color={'white'} size={30}/>
            }   
        </div> */}





        <div className='flex px-6 py-4'>
                <SiTwitter color={"#00df9a"} size={30}/>
                <SiFacebook color={"#00df9a"} className='ml-4 hover:cursor-pointer' size={30}/>
                <SiInstagram color={"#00df9a"} className='ml-4' size={30}/>
                <SiYoutube color={"#00df9a"} className='ml-4' size={30}/>
        </div>

        <div className='md:flex'>
            <div className='flex py-4 px-6'>
                <MdLocationOn color={"#00df9a"} size={20}/>
                <p className='text-white text-sm ml-2'>Bulgaria</p>
            </div>
            <p className='text-white text-sm px-6'>&copy; 2022 SUPREME FASHION SHOP, Inc.All Rights Reserved</p>
        </div>

        <div>
            <ul className='text-gray-400 px-6 py-4 text-sm md:flex'>
                <li className='py-2 hover:text-white cursor-pointer'>Terms of Use</li>
                <li className='py-2 hover:text-white cursor-pointer'>Terms of Sale</li>
                <li className='py-2 hover:text-white cursor-pointer'>Company Details</li>
                <li className='py-2 hover:text-white cursor-pointer'>Privacy &#38; Cookie Policy</li>
                <li className='py-2 hover:text-white cursor-pointer'>Cookie Settings</li>
            </ul>
        </div>


        </div>   

    )
}


export default Footer;