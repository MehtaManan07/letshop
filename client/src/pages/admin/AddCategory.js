import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import {
  createCategory,
  getCategories,
  updateParticularCategory,
  deleteParticularCategory,
} from "../../functions/admin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [buttonText, setButtonText] = useState("Add Category");

  const { data } = isAuth();
  const onChangeHandler = (e) => {
    setError("");
    setName(e.target.value);
  };

  const init = () => {
    getCategories().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setCategories(res.data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(data.user._id, data.token, { name }).then((response) => {
      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        setError("");
        setSuccess(true);
        init();
        toast.success(`New category added`);
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
          <button className="btn btn-outline-success mr-3">{buttonText}</button>
          <Link to="/adminDashboard">
            <button className="btn btn-outline-secondary">Cancel</button>
          </Link>
        </div>
      </div>
    </form>
  );

  // const categorySubmitHandler = () => {
  //   updateParticularCategory(
  //     categoryID,
  //     data.user._id,
  //     data.token,
  //     category
  //   ).then((res) => {
  //     console.log(res);
  //   });
  // };

  const updateCategory = (categoryName) => {
    setName(categoryName);
    setButtonText("Update Category");
  };

  const deleteCategory = (categoryId) => {
    alert(`Are you sure?`);
    deleteParticularCategory(categoryId, data.user._id, data.token).then(
      (res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          init();
        }
      }
    );
  };

  return (
    <Layout
      title="Add Category"
      className="container"
      description="Add a new category..."
    >
      <ToastContainer />
      <div className="row">
        <div className="col-md-8 offset-md-2"> {newCategoryForm()} </div>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <i
                    onClick={() => updateCategory(category.name)}
                    style={{
                      cursor: "pointer",
                      color: "rgba(0,0,255,0.5)",
                    }}
                    className="fa fa-edit"
                  />
                  <i
                    onClick={() => deleteCategory(category._id)}
                    style={{ cursor: "pointer", color: "rgba(255,0,0,0.5)" }}
                    className="fa fa-trash"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default AddCategory;
