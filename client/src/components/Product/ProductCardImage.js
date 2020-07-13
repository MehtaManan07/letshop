import React from "react";
import { API } from "../../config";

const ProductCardImage = ({ product, url }) => {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/picture/${product._id}`}
        alt={product.name}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3"
      />
    </div>
  );
};

export default ProductCardImage;
