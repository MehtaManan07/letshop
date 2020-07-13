import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const RegistrationForm = ({ values, onSubmitHandler, onChangeHandler }) => {
  const [show, setShow] = useState(false);

  const passwordTypeChange = () => {
    setShow(!show);
  };

  const { email, password, name } = values;
  return (
    <div className="signup-form">
      <form onSubmit={onSubmitHandler}>
        <h2> Register </h2>
        <p>Please fill in this form to create an account!</p>
        <hr />
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="fa fa-user"></span>
              </span>
            </div>
            <input
              type="text"
              onChange={onChangeHandler("name")}
              placeholder="Enter your name"
              className="form-control"
              value={name}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="fa fa-paper-plane"></span>
              </span>
            </div>
            <input
              type="email"
              placeholder="Enter your name"
              onChange={onChangeHandler("email")}
              className="form-control"
              value={email}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="fa fa-lock"></span>
              </span>
            </div>
            <input
              type={show ? "text" : "password"}
              placeholder="Password..."
              onChange={onChangeHandler("password")}
              className="form-control"
              value={password}
            />
            <div className="input-group-append">
              <button
                type="button"
                style={{ cursor: "pointer" }}
                onClick={passwordTypeChange}
                className="fa fa-eye"
              ></button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="btn btn-primary btn-lg"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
