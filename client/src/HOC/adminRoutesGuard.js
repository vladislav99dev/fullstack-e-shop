import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {url} from '../constants';
import {useAuthContext} from "../context/AuthContext"

import Spinner from "../components/Spinner/Spinner"

const requester = async(token,profileId) => {
    const response = await fetch(`${url}/admin/checkToken`,{
        method:"POST",
        headers:{
                'authorization': token,
                'content-type':'application/json'
            },
        body:JSON.stringify({
            profileId
        })
        })
        const jsonResponse = await response.json();
        return {response,jsonResponse};
    }
    
    
const isAdmin = (Component) => {
    const WrapperComponent = (props) => {
        const {user} = useAuthContext();
        const [isAdmin,setIsAdmin] = useState(false);
        const navigate = useNavigate();
        
        useEffect(() => {
            requester(user.accessToken,user._id).then(({response,jsonResponse}) => {
                if(response.status !== 200)  navigate('/home')
                if(response.status === 200)  setIsAdmin(jsonResponse.isAdmin)
            }).catch(err => {
                console.log(err);
            })
        },[])

        if(!isAdmin) return <Spinner/>
        if(isAdmin) return <Component {...props}/>
    };
    return WrapperComponent;
  };

  export default isAdmin;
