import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { login, authenticate } from "../../functions/auth";
import Loader from "../../components/Loader";
import { Redirect } from "react-router-dom";
import { isAuth } from "../../functions/auth";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToRef: false,
  });
  
  const { email, password, loading, redirectToRef } = values;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    login({ email, password }).then((data) => {
      if (data.error) {
        console.log('LOGIN ERROR:',data.error)
        setValues({ ...values, error: data.error, loading: false });
        toast.error(data.error);
      } else {
        console.log('LOGIN SUCCESS:',data)
        toast.success("Welcome");
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToRef: true,
          });
        });
      }
    });
  };

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const redirectUser = () => {
    if (redirectToRef) {
      if( isAuth() && isAuth().data.user.role === 0 ) {
        return <Redirect to="/userDashboard" />;
      } else {
        return <Redirect to="/adminDashboard" />
      }
    }
  };

  return (
    <Layout
      title="Login"
      className="container col-md-8 offset-md-2"
      description="Login yourself to start purchasing..."
    >
      {loading && <Loader />}
      <LoginForm values={values} onSubmitHandler={onSubmitHandler} onChangeHandler={onChangeHandler} />
      {redirectUser()}
      <ToastContainer />
    </Layout>
  );
};

export default Login;
