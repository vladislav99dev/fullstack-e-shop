import { useParams, useNavigate } from "react-router-dom";
import * as productsRequester from "../../../services/productsRequester";
import AttentionModal from "../../Modals/AttentionModal";
import useModalState from "../../../hooks/useModalState";
import SuccessModal from "../../Modals/SuccessModal";
import { useAuthContext } from "../../../context/AuthContext";

const Delete = () => {
  const { productId } = useParams();
  const { modalState, setSuccessModal, setFailedModal, resetModals } =
    useModalState();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      const response = await productsRequester.deleteOne(
        null,
        user.accessToken,
        productId
      );
      const jsonResponse = await response.json();
      console.log(response);
      console.log(jsonResponse);
      if (response.status === 404) setFailedModal(jsonResponse.message);
      if (response.status === 200) return setSuccessModal(jsonResponse.message);
    } catch (err) {
      console.log(err);
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

export default Delete;
