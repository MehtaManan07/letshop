import React from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";

const AdminDashboard = () => {
  const {
    data: {
      user: { name, email, role },
    },
  } = isAuth();

  const redirect = (path) => {
    return <Redirect to={path} />;
  };

  const adminInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header"> User Information </h3>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Fields</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Role</td>
            <td>
              <strong> {role === 1 ? "Admin" : "Registered User"} </strong>
            </td>
          </tr>
        </tbody>
      </Table>
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
        <Link to="/orders" className="col-3 btn btn-outline-dark"> Details </Link>
      </div>
        <li className="list-group-item"> Role </li>
      </div>
    );
  };

  return (
    <Layout
      title="Admin Dashboard"
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
