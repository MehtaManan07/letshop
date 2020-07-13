import React, { useState, useEffect } from "react";
import { getCart, removeCartItem } from "../../functions/cart";
import Layout from "../../components/Layout";
import "./CartComponent.scss";
import CheckoutItem from "../../components/Cart/CheckoutItem";
import Checkout from "../../components/checkout/Checkout";

const CartComponent = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
    console.log(getCart());
  }, [run]);
  return (
    <Layout title="Shopping Cart" className="container mb-5">
      <div className="row">
        <div className="checkout-page col-md-6">
          <div className="checkout-header">
            <div className="header-block">
              <span> Product </span>
            </div>
            <div className="header-block">
              <span> Description </span>
            </div>
            <div className="header-block">
              <span> Quantity </span>
            </div>
            <div className="header-block">
              <span> Price </span>
            </div>
            <div className="header-block">
              <span> Remove </span>
            </div>
          </div>
          {items.length > 0 &&
            items.map((product, index) => {
              return (
                <CheckoutItem
                  key={index}
                  setRun={setRun}
                  run={run}
                  cartUpdate
                  product={product}
                />
              );
            })}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default CartComponent;
