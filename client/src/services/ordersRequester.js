import { url } from "../constants.js";

const userOrdersRequester = (method, data, profileId, products) => {
  let fetchUrl = `${url}/orders`;

  let options = {
    method: method,
    headers: {
      "content-type": "application/json",
    },
  };

  if (method === "POST") {
    fetchUrl = `${fetchUrl}/create`
    options.body = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.country,
      state: data.state,
      city: data.city,
      zipCode: data.zipCode,
      street: data.street,
      unitNumber: data.unitNumber,
      phoneNumber: data.phoneNumber,
      price:data.price,
      products: products,
      profileId: profileId
    });
  }
  if (method === "POST") return fetch(fetchUrl, options);
  if (method === "GET") return fetch(`${fetchUrl}/${profileId}`);
};

const adminOrdersRequester = (method, data, token, orderId) => {
  let fetchUrl = `${url}/admin/orders`;

  let options = {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  };

  if (method === "DELETE" || method === "PUT") {
    fetchUrl = `${fetchUrl}/${orderId}`;
  }

  if (method === "PUT") {
    options.body = JSON.stringify({
      orderdStatus: data.orderStatus,
    });
  }

  if (method === "DELETE" || method === "PUT") return fetch(fetchUrl, options);
  if (method === "GET") return fetch(fetchUrl);
};

const updateOrder = adminOrdersRequester.bind(null, "PUT");
const deleteOrder = adminOrdersRequester.bind(null, "DELETE");
const getAllOrders = adminOrdersRequester.bind(null, "GET");

const createOrder = userOrdersRequester.bind(null, "POST");
const getUserOrders = userOrdersRequester.bind(null, "GET");

const ordersRequester = {
    createOrder,
    getUserOrders,
}
export default ordersRequester;
