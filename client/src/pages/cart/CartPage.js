import React, { useState, useEffect } from "react";
import { getCart } from "../../functions/cart";
import Layout from "../../components/Layout";
import "./CartPage.css";
import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const calculatedsubTotal = items.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price;
  }, 0);

  const shippingAmount =
    items.length !== 0 ? (calculatedsubTotal > 150 ? 0 : 20) : 0;

  const finalTotal = calculatedsubTotal + shippingAmount;

  return (
    <Layout title="Shopping Cart">
      <section className="shopping-cart dark">
        <div className="container">
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                {items.length > 0 ? (
                  <div className="items">
                    {items.map((product, index) => {
                      return (
                        <CartItem
                          key={index}
                          setRun={setRun}
                          run={run}
                          cartUpdate
                          product={product}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-middle">
                  <i className="fa fa-shopping-cart fa-4x"> Your cart is empty </i>
                  </div>
                )}
              </div>
              <div className="col-md-12 col-lg-4">
                <CartSummary
                  items={items}
                  calculatedsubTotal={calculatedsubTotal}
                  finalTotal={finalTotal}
                  shippingAmount={shippingAmount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CartPage;
{
  /* <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div> */
}
