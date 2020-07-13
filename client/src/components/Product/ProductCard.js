import React from "react";
import { Link } from "react-router-dom";
import ProductCardImage from "./ProductCardImage";

const ProductCard = ({ product, showVViewButton = true }) => {
  console.log(product.category);
  return (
    <div className="card">
      <h3 className="card-header"> {product.name} </h3>
      <div className="card-body">
        <ProductCardImage product={product} url="product" />
        <p className="lead mt-2"> {product.description.split(" ").slice(0, 10).join(" ")} </p>
        <p className="black-9"> $ {product.price} </p>
        <p className="black-7"> Category: <strong> { product.category && product.category.name} </strong> </p>
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
