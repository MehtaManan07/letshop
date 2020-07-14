import React, { useState, useEffect } from "react";
import { isAuth } from "../../functions/auth";
import { Link } from "react-router-dom";
import { getBraintreeClientToken } from "../../functions/core";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: "",
    error: "",
    instance: {},
    address: {},
  });

  const userId = isAuth() && isAuth().data.user._id;
  const token = isAuth() && isAuth().data.token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((response) => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        setData({ ...data, success: true, clientToken: response.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const calculatedTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showChechout = () => {
    return isAuth() ? (
      <div> {showDropIn()} </div>
    ) : (
      <Link to="/login">
        <button className="btn btn-primary">Login to checkout</button>
      </Link>
    );
  };

  const purchase = () => {
    let nonce;
    let getnonce = data.instance
      .requestPaymentMethod()
      .then((response) => {
        console.log(response);
        nonce = response.nonce;
        console.log("Send nonce and total", nonce, calculatedTotal(products));
      })
      .catch((error) => {
        console.log("token error:", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => {
    return (
      <div className="">
        {data.clientToken !== "" && products.length > 0 ? (
          <div className="">
            <DropIn
              options={{ authorization: data.clientToken }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={purchase} className="btn col-md-12 btn-success">
              Pay
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div>
      <h2> Total: ${calculatedTotal()} </h2>
      {showChechout()}
    </div>
  );
};

export default Checkout;