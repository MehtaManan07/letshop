import Axios from "axios";

const { API } = require("../config");

export const getProducts = (sortBy) => {
    return Axios
      .get(`${API}/product?sortBy=${sortBy}&order=desc&limit=6`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };
  