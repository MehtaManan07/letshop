import React from "react";
import { Link } from "react-router-dom";
import ProductCardImage from "./ProductCardImage";

const ProductCard = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <h3 className="card-header"> {product.name} </h3>
        <div className="card-body">
          <ProductCardImage item={product} url="product" />
          <p> {product.description.split(" ").slice(0, 10).join(" ")} </p>
          <p> $ {product.price} </p>
          <Link to="/">
            <button className="btn btn-outline-secondary mt-2 mb-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 ml-2 mb-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
