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
        <div className="bg-black md:grid md:grid-cols-5 mt-[20rem] w-full">
            <div>
                <ul className="text-white px-6 pt-8 pb-4 font-semibold w-full lg:ml-20">
                    <li className="py-[0.4rem] text-sm hover:cursor-pointer hover:text-[#00df9a]">FIND A STORE</li>
                    <li className="py-[0.4rem] text-sm hover:cursor-pointer hover:text-[#00df9a]">NIKE JOURNAL</li>
                    <li className="py-[0.4rem] text-sm hover:cursor-pointer hover:text-[#00df9a]">BECOME A MEMBER</li>
                    <li className="py-[0.4rem] text-sm hover:cursor-pointer hover:text-[#00df9a]">FEEDBACK</li>
                    <li className="py-[0.4rem] text-sm hover:cursor-pointer hover:text-[#00df9a]">PROMO CODES</li>
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
        <div className='flex px-6 py-4 mt-2 justify-center md:justify-end mr-4 '>
            <div className='flex h-10 lg:mr-20'>
                <SiTwitter color={"#00df9a"} size={30} className='ml-4 hover:cursor-pointer'/>
                <SiFacebook color={"#00df9a"} className='ml-4 hover:cursor-pointer' size={30}/>
                <SiInstagram color={"#00df9a"} className='ml-4 hover:cursor-pointer' size={30}/>
                <SiYoutube color={"#00df9a"} className='ml-4 hover:cursor-pointer' size={30}/>
            </div>
        </div>

        <div className='flex -ml-2 md:ml-[10rem] col-span-2 '>
            <div className='flex py-4 px-6'>
                <MdLocationOn color={"#00df9a"} size={20}/>
                <p className='text-white text-sm ml-2'>Bulgaria</p>
            </div>
            <p className='text-white text-sm px-6 py-4'>&copy; 2022 SUPREME FASHION SHOP, Inc.All Rights Reserved</p>
        </div>

        <div className='col-span-3 flex justify-center'>
            <ul className='text-gray-400 px-6 py-4 text-sm md:flex'>
                <li className='py-2 px-6 hover:text-white cursor-pointer'>Terms of Use</li>
                <li className='py-2 px-6 hover:text-white cursor-pointer'>Terms of Sale</li>
                <li className='py-2 px-6 hover:text-white cursor-pointer'>Company Details</li>
                <li className='py-2 px-6 hover:text-white cursor-pointer'>Privacy &#38; Cookie Policy</li>
                <li className='py-2 px-6 hover:text-white cursor-pointer'>Cookie Settings</li>
            </ul>
        </div>


        </div>   

    )
}


export default Footer;