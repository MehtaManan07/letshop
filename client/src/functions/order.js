import { API } from "../config";
import axios from "axios";

export const createOrder = (userId, token, orderData) => {
  return axios
    .post(
      `${API}/order/newOrder/${userId}`,
      { order: orderData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const listOrders = (userId, token) => {
  return axios
    .get(`${API}/order/list/${userId}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getEnumValues = (userId, token) => {
  return axios
    .get(`${API}/order/status-values/${userId}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const updateEnumValues = (token, orderId, status, userId) => {
  let url = `${API}/order/${orderId}/status/${userId}`;
  console.log(url)
  return axios
    .put(url, status, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.data);
      return error;
    });
};
