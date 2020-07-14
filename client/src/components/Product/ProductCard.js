import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductCardImage from "./ProductCardImage";
import moment from 'moment'
import { addCartItem } from "../../functions/cart";


const ProductCard = ({ product, showVViewButton = true }) => {

  const [redirect, setRedirect] = useState(false)

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  const addToCart = () => {
    addCartItem(product, () => {
      setRedirect(true)
    })
  }

  return (
    <div className="card">
      <h3 className="card-header"> {product.name} </h3>
      <div className="card-body">
      {/* {redirect && <Redirect to="/cart" /> } */}
        <ProductCardImage product={product} url="product" />
        <p className="lead mt-2">
          {product.description.split(" ").slice(0, 7).join(" ")}
        </p>
        <p className="black-10"> $ {product.price} </p>
        <p className="black-9">
          Category:
          <strong> {product.category && product.category.name} </strong>
        </p>
        <p className="black-8">
          Added {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br/>
        <div className="row">
        <Link to={`/product/${product._id}`}>
          <button
            style={{ display: showVViewButton ? "" : "none" }}
            className="btn btn-outline-secondary mt-2 mb-2"
          >
            View Product
          </button>
        </Link>
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 ml-2 mb-2">
          Add to Cart
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
