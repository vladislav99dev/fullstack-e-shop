import { useModalsContext } from "../context/ModalsContext";
import AttentionModal from "../components/Modals/AttentionModal";
import SuccessModal from "../components/Modals/SuccessModal";

import React from "react";

const modalMessages = (Component) => {
  const WrapperComponent = (props) => {
    const {
      modalState: { isFailed, isSuccess },
    } = useModalsContext();

    if (isFailed.value)
      return (
        <AttentionModal
          titleMessage={isFailed.titleMessage}
          descriptionMessage={isFailed.descriptionMessage}
          buttonHandler={isFailed.buttonHandler}
          buttonName={isFailed.buttonName}
        />
      );
    if (isSuccess.value)
      return (
        <SuccessModal
          titleMessage={isFailed.titleMessage}
          descriptionMessage={isFailed.descriptionMessage}
          buttonHandler={isFailed.buttonHandler}
          buttonName={isFailed.buttonName}
        />
      );
    return <Component {...props} />;
  };
  return WrapperComponent;
};

export default modalMessages;
