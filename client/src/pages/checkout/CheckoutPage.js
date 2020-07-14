import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { getCart } from "../../functions/cart";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
    console.log(getCart());
  }, []);

  const calculatedsubTotal = items.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price;
  }, 0);

  const shippingAmount = calculatedsubTotal > 150 ? `Free` : 20;
  let totalPrice
  shippingAmount === "Free"
    ? (totalPrice = calculatedsubTotal)
    : (totalPrice = calculatedsubTotal + shippingAmount);

  return (
    <Layout className="container mb-5">
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-success badge-pill">
              {items.length}
            </span>
          </h4>
          <CheckoutSummary
            totalPrice={totalPrice}
            shippingCharges={shippingAmount}
            items={items}
          />
          <Link to="/cart" style={{ textDecoration: 'none' }}>
           <button className="btn btn-outline-danger btn-lg  btn-block" type="submit">
              Back to Cart
            </button>
          </Link>
        </div>

        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" novalidate>
            <div className="mb-3">
              <label for="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
            </div>

            <div className="mb-3">
              <label for="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label for="country">Country</label>
                <input
                  className="form-control d-block w-100"
                  id="country"
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label for="state">State</label>
                <input
                  className="form-control d-block w-100"
                  id="state"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label for="zip">Zip</label>
                <input
                  type="number"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <hr className="mb-4" />
            <h4 className="mb-3">Payment</h4>
            <div className="row"></div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
