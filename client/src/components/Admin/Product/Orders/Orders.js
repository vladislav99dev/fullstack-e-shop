import React, { useState, useEffect } from "react";
import ordersRequester from "../../../../services/ordersRequester";
import { useAuthContext } from "../../../../context/AuthContext";
import isAdmin from "../../../../HOC/adminRoutesGuard";
import modalMessages from "../../../../HOC/modalMessages";
import { useModalsContext } from "../../../../context/ModalsContext";

const Orders = () => {
  const [orders, setOrders] = useState();
  const { user } = useAuthContext();
  const { setFailedModal } = useModalsContext();

  useEffect(() => {
    ordersRequester
      .getAllOrders({ profileId: user._id }, user.accessToken)
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((response) => setOrders(response) );
  }, []);



  return <div className="min-h-[640px]">
    {orders?.map((order) => {
        return (
          <div key={order._id}>
            
          </div>
        )
    })}
  </div>;
};

export default isAdmin(modalMessages(Orders));
