import React, { useState, useEffect } from "react";
import { getCategories } from "../functions/admin";
import { listSearch } from "../functions/core";
import ProductCard from "./Product/ProductCard";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const loadCategories = () => {
    getCategories().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setData({ ...data, categories: response.data });
      }
    });
  };

  const searchInfo = () => {
    console.log(data.search, data.category);
    if (data.search) {
      listSearch({
        search: data.search || undefined,
        category: data.category,
      }).then((response) => {
        console.log("response:", response);
        if (response.error) {
          console.log(response.error.response);
        } else {
          setData({ ...data, results: response.data, searched: true });
        }
      });
    }
  };

  const onChangeHandler = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    searchInfo();
  };

  const searchForm = () => (
    <form onSubmit={onSubmitHandler}>
      <span className="input-group-text">
        <div className="input-group input-group-md">
          <div className="input-group-">
            <select
              className="btn mr-2 btn-outline-secondary"
              onChange={onChangeHandler("category")}
            >
              <option value="All">Select category</option>
              {data.categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={onChangeHandler("search")}
          />
        </div>
        <div className="btn input-group-append">
          <button className="input-group-text btn btn-outline-success">
            Search
          </button>
        </div>
      </span>
    </form>
  );

  useEffect(() => {
    loadCategories();
  }, []);

  const searchedProducts = (results = []) => {
    return (
      <div className="row">
        {results.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    );
  };
  return (
    <div className="row">
      <div className="container mb-3"> {searchForm()} </div>
      <div className="container-fluid mb-3">
        {searchedProducts(data.results)}
      </div>
    </div>
  );
};

export default Search;
