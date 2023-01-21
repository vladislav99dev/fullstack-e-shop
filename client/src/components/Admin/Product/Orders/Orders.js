import React, { useState, useEffect,useReducer } from "react";
import ordersRequester from "../../../../services/ordersRequester";
import { useAuthContext } from "../../../../context/AuthContext";
import isAdmin from "../../../../HOC/adminRoutesGuard";
import modalMessages from "../../../../HOC/modalMessages";
import { useModalsContext } from "../../../../context/ModalsContext";
import Order from "./Order";
import styles from "./Orders.module.css"


const Orders = () => {
  const [orders, setOrders] = useState();
  const { user } = useAuthContext();
  const { setFailedModal } = useModalsContext();
  const [currImage,setCurrImage] =useState();

  useEffect(() => {
    ordersRequester
      .getAllOrders({ profileId: user._id }, user.accessToken)
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((response) => setOrders(response) );
  }, []);



  return <div className={styles.container}>
    <div className={`${styles['orders-container']}`}>
    {orders?.map((order) => {
      return (
        <Order key={order.orderInfo.orderId} data={order} />
        )
      })}
      </div>
  </div>;
};

export default isAdmin(modalMessages(Orders));
