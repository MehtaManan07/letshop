import React from "react";

const AddressForm = ({ onChangeHandler, addressSubmitHandler, address }) => {
  const { main, optional, country, zip, state } = address;
  
  return (
    <form
      onSubmit={addressSubmitHandler}
      className="needs-validation"
      noValidate
    >
      <div className="mb-3">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          name="main"
          value={main}
          onChange={onChangeHandler("main")}
          placeholder="1234 Main St"
          required
        />
      </div>

      <div className="mb-3">
        <label>
          Address 2 <span className="text-muted">(Optional)</span>
        </label>
        <input
          required
          type="text"
          className="form-control"
          name="optional"
          value={optional}
          onChange={onChangeHandler("optional")}
          placeholder="Apartment or suite"
        />
      </div>

      <div className="row">
        <div className="col-md-5 mb-3">
          <label>State</label>
          <input
            required
            className="form-control d-block w-100"
            onChange={onChangeHandler("state")}
            value={state}
            name="state"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>Country</label>
          <input
            required
            className="form-control d-block w-100"
            name="country"
            onChange={onChangeHandler("country")}
            value={country}
          />
        </div>
        <div className="col-md-3 mb-3">
          <label>Zip</label>
          <input
            type="number"
            className="form-control"
            name="zip"
            value={zip}
            onChange={onChangeHandler("zip")}
            placeholder=""
            required
          />
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
