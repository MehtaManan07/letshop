import React from "react";
import { isAuth } from "../../functions/auth";
import { Link } from "react-router-dom";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const calculatedTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showChechout = () => {
    return isAuth() ? (
      <Link to="/checkout-clicked">
        <button className="btn btn-primary">Checkout</button>
      </Link>
    ) : (
      <Link to="/login">
        <button className="btn btn-primary">Login to checkout</button>
      </Link>
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
