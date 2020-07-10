import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { register } from "../../functions/auth";
import { Redirect, Link } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    showPassword: false,
  });

  const { name, email, password, success } = values;


  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    register({ name, email, password }).then((data) => {
      if (data.error) {
        console.log('reached data.error')
        setValues({ ...values, error: data.error, success: false });
        toast.error(data.error)
      } else {
        console.log('reached data.success')
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const registrationForm = () => (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          type="text"
          placeholder="Enter your name"
          className="form-control"
          onChange={onChangeHandler("name")}
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted"> Email </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control"
          onChange={onChangeHandler("email")}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted"> Password </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="form-control"
          onChange={onChangeHandler("password")}
          value={password}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn col-4 btn-outline-dark"
          onClick={onSubmitHandler}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );

  const successAlert = () => (
    <div className="alert alert-info" style={{ display:  success ? '' : 'none' } } >
      Registered successfully, please <Link to="/login" > Login </Link>
    </div>
  );

  return (
    <Layout
      title="Register"
      className="container col-md-8 offset-md-2"
      description="Register yourself to start purchasing..."
    >
    {successAlert()}
      {registrationForm()}
      <ToastContainer />
    </Layout>
  );
};

export default Register;
