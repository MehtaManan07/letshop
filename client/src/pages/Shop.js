import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getCategories } from "../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Checkbox from "../components/Checkbox";
import { prices } from "../components/FixedPrices";
import RadioBox from "../components/RadioBox";

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
    if(filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters(newFilters)
  };

  const handlePrice = value => {
    let array = [];
    for(let key in prices) {
      if(prices[key]._id === parseInt(value)) {
        console.log('values:',value)
        array = prices[key].array
        console.log(array)
      }
    }
    return array
  }

  return (
    <Layout
      title="Shop Page"
      description="Search and find the best books for you"
      className="container-fluid mb-3"
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
          <h5> Filter by price range </h5>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8"> right section </div>
      </div>
    </Layout>
  );
};

export default Shop;
