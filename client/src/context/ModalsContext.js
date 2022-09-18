import { useReducer ,useContext, createContext} from "react";


const ModalContext = createContext();

const initialModalState = {isSuccess:{value:false,message:''}, isFailed:{value:false,message:''}};


const reducerModalsState = (state,action) => {
    switch(action.type){
        case "setIsSuccess":
            return {
                isSuccess: {value:true,message:action.payload},
                isFailed:{value:false,message:''}
            };
        case "setIsFailed":
            return {
                isSuccess: {value:false,message:''},
                isFailed:{value:true,message:action.payload}
            };
        case "resetModals":
            return{
                isSuccess:{value:false,messages:''},
                isFailed:{value:false, message:''}
            }     
    }
};

export const ModalsProvider = ({children}) => {
    const [modalState,dispatch] = useReducer(reducerModalsState,initialModalState);

    const setSuccessModal = (message) => {
        dispatch({type:'setIsSuccess', payload:message})
    };
    const setFailedModal = (message) => {
        dispatch({type:'setIsFailed', payload:message})
    };
    const resetModals = () => {
        dispatch({type:'resetModals'})
    };

    return (
        <ModalContext.Provider value={{modalState, setSuccessModal, setFailedModal, resetModals}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalsContext = () => {
    const modalState = useContext(ModalContext);
    return modalState;
}