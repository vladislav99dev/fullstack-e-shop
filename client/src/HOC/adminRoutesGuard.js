import {useState,useEffect} from "react";
import {Navigate} from "react-router-dom";

import {url} from '../constants';
import {useAuthContext} from "../context/AuthContext"

import Spinner from "../components/Spinner/Spinner"

const requester = async(token) => {
    const response = await fetch(`${url}/admin/checkToken`,{
        headers:{
                'authorization': token
            }
        })
        const jsonResponse = await response.json();
        if(response.status !== 200) throw {...jsonResponse}
        return {...jsonResponse}
    }
    
    
const isAdmin = (Component) => {
    const WrapperComponent = (props) => {
        const {user} = useAuthContext();
        const [isAdmin,setIsAdmin] = useState({});
        
        useEffect(() => {
            requester(user.accessToken).then(response => {
                setIsAdmin(response);
            }).catch(err => {
                setIsAdmin(err);
            })
        },[])

        if(!isAdmin.hasOwnProperty('isAdmin')) return <Spinner/>
        if(!isAdmin.isAdmin) return <Navigate to={'/home'}/>
        if(isAdmin.isAdmin) return <Component {...props}/>
    };
    return WrapperComponent;
  };

  export default isAdmin;
