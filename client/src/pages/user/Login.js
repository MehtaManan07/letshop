import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { login, authenticate } from "../../functions/auth";
import Loader from "../../components/Loader";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "a@.com",
    password: "password",
    error: "",
    loading: false,
    redirectToRef: false,
  });

  const { name, email, password, loading, redirectToRef } = values;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    login({ email, password }).then((data) => {
      if (data.error) {
        console.log("reached data.error");
        setValues({ ...values, error: data.error, loading: false });
        toast.error(data.error);
      } else {
        console.log("reached data.success");
        toast.success("Welcome");
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToRef: true,
          });
          // console.log(authenticate().data)
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

  const redirectUser = () => {
    if (redirectToRef) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Login"
      className="container col-md-8 offset-md-2"
      description="Login yourself to start purchasing..."
    >
      {loading && <Loader />}
      {registrationForm()}
      {redirectUser()}
      <ToastContainer />
    </Layout>
  );
};

export default Login;
