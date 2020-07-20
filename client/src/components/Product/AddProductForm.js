import React from "react";
import { Form, Row } from "react-bootstrap";

const AddProductForm = ({ buttonText, values, onSubmitHandler, handleChange }) => {
  return (
    <form className="mb-3" onSubmit={onSubmitHandler}>
      <h4>Post Image</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("picture")}
            type="file"
            name="picture"
            accept="image/*"
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={values.name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={values.description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          min="1"
          value={values.price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Select</option>
          {values.categories &&
            values.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          min="0"
          className="form-control"
          value={values.quantity}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-success col-md-6">{buttonText}</button>
      </div>
    </form>
  );
};

export default AddProductForm;
