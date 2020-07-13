import React from "react";
import { Link } from "react-router-dom";
import ProductCardImage from "./ProductCardImage";
import moment from 'moment'

const ProductCard = ({ product, showVViewButton = true }) => {

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <h3 className="card-header"> {product.name} </h3>
      <div className="card-body">
        <ProductCardImage product={product} url="product" />
        <p className="lead mt-2">
          {product.description.split(" ").slice(0, 10).join(" ")}
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
        <Link to={`/product/${product._id}`}>
          <button
            style={{ display: showVViewButton ? "" : "none" }}
            className="btn btn-outline-secondary mt-2 mb-2"
          >
            View Product
          </button>
        </Link>
        <button className="btn btn-outline-warning mt-2 ml-2 mb-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
