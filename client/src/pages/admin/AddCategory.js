import React, { useState } from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { createCategory } from "../../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AddCategory = () => {

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSUccess] = useState(false);

  const { data } = isAuth();
  const onChangeHandler = (e) => {
    setError("");
    setName(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setError("");
    setSUccess(false);
    createCategory(data.user._id, data.token, { name }).then((response) => {
      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        setError("");
        setSUccess(true);
        console.log(response);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={onChangeHandler}
          placeholder="Add a name"
          value={name}
        />
        <div className="d-flex justify-content-center mt-2">
          <button className="btn btn-outline-success"> Add Category </button>
        </div>
      </div>
    </form>
  );

  return (
    <Layout title="Add Category" description="Add a new category...">
      <ToastContainer />
      <div className="row">
        <div className="col-md-8 offset-md-2"> {newCategoryForm()} </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
