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

export const updateEnumValues = ( userId, token, orderId, status) => {
  return axios
    .put(
      `${API}/order/${orderId}/status/${userId}`,
      JSON.stringify({ status, orderId }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
};
