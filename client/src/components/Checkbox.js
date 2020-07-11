import React from "react";

const Checkbox = ({ categories }) => {
  return categories.map((category) => (
    <li key={category._id} className="list-unstyled">
      <input type="checkbox" className="form-check-input" />
      <label className="form-check-label"> {category.name} </label>
    </li>
  ));
};

export default Checkbox;
