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
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return Axios
    .get(`${API}/category`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error;
      console.log(error);
    });
};
