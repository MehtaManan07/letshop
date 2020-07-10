import React from 'react'

const AddProductForm = ({ values, onSubmitHandler, handleChange }) => {
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
          value={values.price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option value="5cde522ad8b1ff1b89c36987">Python</option>
          <option value="5cde522ad8b1ff1b89c36987">PHP</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={values.quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
    )
}

export default AddProductForm
