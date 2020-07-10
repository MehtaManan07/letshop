import { API } from '../config'
import axios from "axios";

export const register = (user) => {
    return axios
      .post(`${API}/auth/register`, JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response.data;
      });
  };

  export const login = (user) => {
    return axios
      .post(`${API}/auth/login`, JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response.data;
      });
  };
