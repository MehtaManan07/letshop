import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getCategories } from "../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Checkbox from "../components/Checkbox";
import { prices } from "../components/FixedPrices";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const init = () => {
    getCategories().then((response) => {
      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        console.log(response);
        setCategories(response.data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters)
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find the best books for you"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h5> Filter by categories </h5>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
        </div>
        <div className="col-8"> right section </div>
      </div>
    </Layout>
  );
};

export default Shop;
