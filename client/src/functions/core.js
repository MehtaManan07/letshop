import Axios from "axios";
import queryString from "query-string";
const { API } = require("../config");

export const getProducts = (sortBy, limit) => {
  return Axios.get(`${API}/product?sortBy=${sortBy}&order=desc&limit=${limit}`)
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
    limit,
    skip,
    filters,
  };
  return Axios.post(`${API}/product/by/search`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

export const listSearch = (params) => {
  const query = queryString.stringify(params);
  console.log("query:", query);
  return Axios.get(`${API}/product/search?${query}`)
    .then((response) => {
      console.log("response:", response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
};
