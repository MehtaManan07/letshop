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
