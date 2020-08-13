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
      console.log(error);
      return error;
    });
};

export const getProducts = () => {
  return Axios
    .get(`${API}/product?limit=10000000000000`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const deleteParticularProduct = (productId, userId, token) => {
  return Axios
    .delete(`${API}/product/${productId}/${userId}`,{
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const deleteParticularCategory = (categoryId, userId, token) => {
  return Axios
    .delete(`${API}/category/${categoryId}/${userId}`,{
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const updateParticularProduct = (productId, userId, token, product) => {
  return Axios
    .put(`${API}/product/${productId}/${userId}`,product,{
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const updateParticularCategory = (categoryId, userId, token, category) => {
  return Axios
    .put(`${API}/category/${categoryId}/${userId}`,category,{
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

