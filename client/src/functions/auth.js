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

  export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
      localStorage.setItem('jwt',JSON.stringify(data))
      next()
    }
  }

  export const logout = (next) => {
    if(typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next()
      return axios.get(`${API}/auth/logout`)
      .then(response => console.log('logout', response))
      .catch(error => console.log('logout:',error))
    }
  }

  export const isAuth = () => {
    if(typeof window == 'undefined') {
      return false;
    }
    if(localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'))
    } else return false;
  }