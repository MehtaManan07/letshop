import React, { useState } from "react";
import Layout from "../../components/Layout";

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const onChangeHandler = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
  const registrationForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          type="text"
          placeholder="Enter your name"
          className="form-control"
          onChange={onChangeHandler('name')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted"> Email </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control"
          onChange={onChangeHandler('email')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted"> Password </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="form-control"
          onChange={onChangeHandler('password')}
        />
      </div>
      <button className="btn btn-outline-dark col-md-5 offset-md-3"> SUBMIT </button>
    </form>
  );

  return (
    <Layout
      title="Register"
      className="container col-md-8 offset-md-2"
      description="Register yourself to start purchasing..."
    >
      {registrationForm()}
    </Layout>
  );
};

export default Register;
