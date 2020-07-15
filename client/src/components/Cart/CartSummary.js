import React from "react";
import "./CartSummary.css";
import { Link } from "react-router-dom";
import { isAuth } from "../../functions/auth";

const CartSummary = ({
  items,
  calculatedsubTotal,
  shippingAmount,
  finalTotal,
}) => {
  return (
    <div className="shopping-cart">
      <div className="summary">
        <h3>Summary</h3>
        <div className="summary-item">
          <span className="text">Total Items</span>
          <span className="price">{items.length}</span>
        </div>
        <div className="summary-item">
          <span className="text">Subtotal</span>
          <span className="price">${calculatedsubTotal}</span>
        </div>
        <div className="summary-item">
          <span className="text">Shipping</span>
          <span className="price">${shippingAmount}</span>
        </div>
        <div className="summary-item">
          <span className="text">Total</span>
          <span className="price">${finalTotal}</span>
        </div>
        {isAuth() ? (
          <Link style={{ textDecoration: "none" }} to="/checkout">
            <button
              disabled={items.length > 0 ? false : true}
              type="button"
              className="btn btn-outline-primary btn-lg btn-block"
            >
              Checkout
            </button>
          </Link>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button type="button" className="btn btn-primary btn-lg btn-block">
              Login to checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
