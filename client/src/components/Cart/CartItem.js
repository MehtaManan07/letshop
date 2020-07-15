import React, { useState } from "react";
import "./CartItem.css";
import ProductCardImage from "../Product/ProductCardImage";
import {
  updateCartItem,
  removeCartItem,
  cartItemsCount,
} from "../../functions/cart";

const CartItem = ({
  cartUpdate = false,
  product,
  run = undefined,
  setRun = (f) => f,
}) => {
  const [count, setCount] = useState(product.count);

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateCartItem(productId, event.target.value);
    }
  };
  return (
    <div className="product">
      <div className="row">
        <div className="col-md-3">
          <ProductCardImage
            className="img-fluid mx-auto d-block image"
            product={product}
            url="product"
          />
        </div>
        <div className="col-md-8">
          <div className="info">
            <div className="row">
              <div className="col-md-5 product-name">
                <div className="product-name">
                  <h4 href="#">{product.name}</h4>
                </div>
              </div>
              <div className="col-md-4 quantity">
                <label htmlFor="quantity">Quantity:</label>
                {cartUpdate && (
                  <input
                    type="number"
                    className="form-control quantity-input"
                    value={count}
                    onChange={handleChange(product._id)}
                  />
                )}
              </div>
              <div className="col-md-3 price">
                <span>${product.price}</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              removeCartItem(product._id);
              setRun(!run);
            }}
            className="col-md-1"
          >
            <button className="btn btn-outline-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
