import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getProducts } from "../functions/core";
import ProductCard from "../components/Product/ProductCard";
import Search from "../components/Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [productCount, setProductCount] = useState(0);

  const loadProductsBySell = () => {
    getProducts("sold").then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProductsBySell(response.data);
        setProductCount(response.count);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((response) => {
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
      className="container-fluid"
    >
    {/* <Search /> */}
      <h2 className="mb-4"> Best Sellers </h2>
      <div className="row">
        {productsBySell.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <h2 className="mb-4"> Latest Arrivals </h2>
      <div className="row">
        {productsByArrival.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
