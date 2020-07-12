import React, { useState, useEffect } from "react";
import { getCategories } from "../functions/admin";

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

  const onChangeHandler = () => {};

  const onSubmitHandler = () => {};

  const searchForm = () => (
    <form onSubmit={onSubmitHandler}>
      <span className="input-group-text">
        <div className="input-group input-group-md">
          <div className="input-group-">
            <select className="btn mr-2 btn-outline-secondary">
              <option value="all">Select category</option>
              {data.categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={onChangeHandler("search")}
          />
        </div>
        <div className="btn input-group-append">
        <button className="input-group-text"> Search </button>
        </div>
      </span>
    </form>
  );

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="row">
      <div className="container mb-3"> {searchForm()} </div>
    </div>
  );
};

export default Search;
