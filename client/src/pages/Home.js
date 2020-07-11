import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getProducts } from "../functions/core";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [productCount, setProductCount] = useState(0);

  const loadProductsBySell = () => {
    getProducts("sold").then((response) => {
      console.log(response);
      if (response.error) {
        setError(response.error);
      } else {
        setProductsBySell(response.data);
        setProductCount(response.count)
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((response) => {
      console.log(response);
      if (response.error) {
        setError(response.error);
      } else {
        setProductsByArrival(response.data);
        setProductCount(response.count)
      }
    });
  };
  
  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <Layout title="Home page" description="Ecommerce application"></Layout>
  );
};

export default Home;
