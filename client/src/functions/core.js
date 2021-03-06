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

export const getSingleProduct = (productId) => {
  return Axios.get(`${API}/product/${productId}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getRelatedProducts = (productId, limit) => {
  return Axios.get(`${API}/product/related/${productId}?limit=2`)
    .then((response) => {
      console.log("response from core:", response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getBraintreeClientToken = (userId, token) => {
  return Axios.get(`${API}/payment/braintree/getToken/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "Application/json",
    },
  }).then((response) => {
    return response.data
  }).catch(error => {
    console.log(error)
    return error
  })
};

export const processPaymentt = (userId, token, paymentData) => {
  return Axios.post(`${API}/payment/braintree/payment/${userId}`, paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "Application/json",
    },
  }).then((response) => {
    console.log(response);
    return response.data
  }).catch(error => {
    console.log(error.message)
    return error
  })
};
