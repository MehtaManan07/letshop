import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { register } from "../../functions/auth";
import { Link } from "react-router-dom";
import RegistrationForm from "../../components/Auth/RegistrationForm";

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
        console.log("REGISTER ERROR:", data.error);
        setValues({ ...values, error: data.error, success: false });
        toast.error(data.error);
      } else {
        console.log("REGISTER SUCCESS:", data);
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

  const successAlert = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Registered successfully, please <Link to="/login"> Login </Link>
    </div>
  );

  return (
    <Layout
      title="Register"
      className="container col-md-8 offset-md-2"
      description="Register yourself to start purchasing..."
    >
      {successAlert()}
      <RegistrationForm
        values={values}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
      />
      <ToastContainer />
    </Layout>
  );
};

export default Register;
