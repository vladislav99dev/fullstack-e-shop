import { useParams, useNavigate } from "react-router-dom";

import * as productsRequester from "../../../services/productsRequester";

import { useModalsContext } from "../../../context/ModalsContext";
import { useAuthContext } from "../../../context/AuthContext";

import isAdmin from "../../../HOC/adminRoutesGuard";


import AttentionModal from "../../Modals/AttentionModal";
import SuccessModal from "../../Modals/SuccessModal";

const Delete = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const { modalState, setSuccessModal, setFailedModal, resetModals } =
  useModalsContext();
  const { user } = useAuthContext();

  const deleteHandler = async () => {
    try {
      const response = await productsRequester.deleteOne(
        null,
        user.accessToken,
        productId
      );
      const jsonResponse = await response.json();
      if (response.status !== 200) throw {responseStatus:response.status, message:jsonResponse.message};
      if (response.status === 200) return setSuccessModal(jsonResponse.message);
    } catch (err) {
      if(err.responseStatus) return setFailedModal(err.message);
      console.log("err");
    }
  };

  const modalButtonHandler = () => {
    resetModals();
    navigate("/");
  };

  return (
    <>
      {!modalState.isFailed.value && !modalState.isSuccess.value ? (
        <AttentionModal
          titleMessage={"Are you sure you want to delete this item?"}
          descriptionMessage={
            "If you submit you will pernametly delete this from the database!"
          }
          buttonHandler={deleteHandler}
          buttonName={"DELETE"}
        />
      ) : modalState.isFailed.value ? (
        <AttentionModal
          titleMessage={"Something went wrong!"}
          descriptionMessage={modalState.isFailed.message}
          buttonHandler={modalButtonHandler}
          buttonName={"Go to home page"}
        />
      ) : (
        <SuccessModal
          titleMessage={"Delete successfull!"}
          descriptionMessage={modalState.isSuccess.message}
          buttonHandler={modalButtonHandler}
          buttonName={"Go to home page"}
        />
      )}
    </>
  );
};

export default isAdmin(Delete);
