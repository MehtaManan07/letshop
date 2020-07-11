import Axios from "axios";

const { API } = require("../config");

export const getProducts = (sortBy) => {
  return Axios.get(`${API}/product?sortBy=${sortBy}&order=desc&limit=6`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit, skip, filters
  }
  return Axios.post(
    `${API}/product/by/search`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};
