import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getProducts } from "../functions/core";
import ProductCard from "../components/Product/ProductCard";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [productCount, setProductCount] = useState(0);

  const loadProductsBySell = () => {
    getProducts("sold", 3).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProductsBySell(response.data);
        setProductCount(response.count);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt", 3).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProductsByArrival(response.data);
        setProductCount(response.count);
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <Layout
      title="Home page"
      description="Ecommerce application"
      className="container"
    >
      {/* <Search /> */}
      <h4 className="mb-4"> Best Sellers </h4>
      <div className="row">
        {productsBySell.map((product) => (
          <div key={product._id} className="col-4 mb-3">
            <ProductCard product={product}  />
          </div>
        ))}
      </div>
      <h4 className="mb-4"> Latest Arrivals </h4>
      <div className="row">
        {productsByArrival.map((product) => (
          <div key={product._id} className="col-4 mb-3">
            <ProductCard product={product}  />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
