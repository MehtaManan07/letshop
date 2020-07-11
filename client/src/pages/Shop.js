import React from "react";
import Layout from "../components/Layout";

const Shop = () => {
  return (
    <Layout title="Shop Page" className="container-fluid">
      <div className="row">
        <div className="col-4">left sidebar</div>
        <div className="col-8">right section</div>
      </div>
    </Layout>
  );
};

export default Shop;
