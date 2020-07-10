import React from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const {
    data: {
      user: { name, email, role },
    },
  } = isAuth();

  const adminInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header"> User Information </h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"> # </th>
            <th scope="col"> Fields </th>
            <th scope="col"> Data </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"> 1 </th>
            <th scope="row"> Name </th>
            <th scope="row"> {name} </th>
          </tr>
          <tr>
            <th scope="row"> 2 </th>
            <th scope="row"> Email </th>
            <th scope="row"> {email} </th>
          </tr>
          <tr>
            <th scope="row"> 3 </th>
            <th scope="row"> Role </th>
            <th scope="row"> {role === 1 ? "Admin" : "Registered User"} </th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const adminLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header"> Admin Links </h3>
        <ul className="list-group">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
          <Link className="nav-link" to="/create/product">
            Create Product
          </Link>
        </ul>
      </div>
    );
  };

  const ordersHistory = () => {
    return (
      <div className="card mb-5">
      <div className="row container">
        <h3 className="col-9"> Orders History </h3>
        <button className="col-3 btn btn-outline-dark"> Details </button>
      </div>
        <li className="list-group-item"> Role </li>
      </div>
    );
  };

  return (
    <Layout
      title="User Dashboard"
      className="container"
      description={`Hello ${name}`}
    >
      <div className="row">
        <div className="col-3"> {adminLinks()} </div>
        <div className="col-9">
          {adminInfo()}
          {ordersHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
