import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { createCategory } from "../../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AddProduct = () => {
  const {
    data: {
      user: { name, email, role },
      token,
    },
  } = isAuth();

  return (
    <Layout title="Add Product" description="Add a new product to your shop...">
      <div className="row">
        <div className="col-md-8 offset-md-2"></div>
      </div>
    </Layout>
  );
};

export default AddProduct;
