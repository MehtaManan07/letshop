import React from "react";
import { API } from "../../config";

const ProductCardImage = ({ item, url }) => {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/picture/${item._id}`}
        alt={item.name}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3"
      />
    </div>
  );
};

export default ProductCardImage;
