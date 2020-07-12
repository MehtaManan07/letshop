import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getSingleProduct } from "../functions/core";
import ProductCard from "../components/Product/ProductCard";
const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

  const loadSingleProduct = (productId) => {
    getSingleProduct(productId).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProduct(response.data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    console.log(productId);
    loadSingleProduct(productId);
  }, []);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.category + " : category id"
      }
      className="container-fluid mb-4"
    >
      {product && product.description && <ProductCard product={product} showVViewButton={false} />}
    </Layout>
  );
};

export default SingleProduct;
