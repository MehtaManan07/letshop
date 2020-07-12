import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getCategories } from "../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Checkbox from "../components/Shop/Checkbox";
import { prices } from "../components/Shop/FixedPrices";
import RadioBox from "../components/Shop/RadioBox";
import ProductCard from "../components/Product/ProductCard";
import { getFilteredProducts } from "../functions/core";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [limit, setLimit] = useState(6);
  const [filteredResults, setFilteredResults] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const init = () => {
    getCategories().then((response) => {
      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        setCategories(response.data);
      }
    });
  };

  const loadFilteredResults = (filter) => {
    console.log(filter);
    getFilteredProducts(skip, limit, filter).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        console.log(response);
        setFilteredResults(response.data);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        console.log(response);
        setFilteredResults([...filteredResults, ...response.data]);
        setSize(response.size);
        console.log(size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      !size > 0 &&
      size <= limit && (
        <div className="d-flex justify-content-center">
          <button onClick={loadMore} className="btn btn-outline-secondary mb-5">
            Load more
          </button>
        </div>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    let array = [];
    for (let key in prices) {
      if (prices[key]._id === parseInt(value)) {
        console.log("values:", value);
        array = prices[key].array;
        console.log(array);
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <ToastContainer />
      <div className="row">
        <div className="col-4">
          <h5> Filter by categories </h5>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h5> Filter by price range </h5>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4"> Products </h2>
          <div className="row">
            {filteredResults.map((product) => (
              <div key={product._id} className="col-4 mb-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
