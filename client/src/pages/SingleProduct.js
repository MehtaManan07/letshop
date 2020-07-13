import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getSingleProduct, getRelatedProducts } from "../functions/core";
import ProductCard from "../components/Product/ProductCard";

const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const loadSingleProduct = (productId) => {
    getSingleProduct(productId).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProduct(response.data);
        //fetch related products here
        getRelatedProducts(response.data._id, 2).then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            setRelatedProducts(response.data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <ProductCard product={product} showVViewButton={false} />
          )}
        </div>
        {
          relatedProducts.data && relatedProducts.data.length > 0 &&
        <div className="col-4">
          <h4> Related Products </h4>
          { relatedProducts.data && relatedProducts.data.map((relatedProduct,index) => (
            <div className="mb-3">
              <ProductCard key={index} product={relatedProduct} />
            </div>
          ))}
        </div>
        }
      </div>
    </Layout>
  );
};

export default SingleProduct;
