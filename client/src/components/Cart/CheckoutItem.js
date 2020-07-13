import React, { useState } from "react";
import "./CheckoutItem.scss";
import ProductCardImage from "../Product/ProductCardImage";
import {
  updateCartItem,
  removeCartItem,
  cartItemsCount,
} from "../../functions/cart";

const CheckoutItem = ({
  cartUpdate = false,
  product,
  run = undefined,
  setRun = (f) => f,
}) => {
  const [count, setCount] = useState(product.count);

  console.log(cartItemsCount());

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateCartItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend"></div>
            <input
              style={{ height: 50, width: 60 }}
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="checkout-item">
      {cartItemsCount() > 0 && (
        <>
          <div className="image-container">
            <ProductCardImage product={product} url="product" />
          </div>
          <span className="names"> {product.name} </span>
          <span className="quantities">
            {showCartUpdateOptions(cartUpdate)}
          </span>
          <span className="prices">{product.price}</span>
          <div
            onClick={() => {
              removeCartItem(product._id);
              setRun(!run);
            }}
            className="remove-button"
          >
            &#10005;
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutItem;
