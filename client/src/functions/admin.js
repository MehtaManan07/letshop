import Axios from "axios";

const { API } = require("../config");

export const createCategory = (userId, token, category) => {
  return Axios.post(
    `${API}/category/create/${userId}`,
    JSON.stringify(category),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

export const createProduct = (userId, token, product) => {
  return Axios.post(
    `${API}/product/create/${userId}`,
    JSON.stringify(product),
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};
