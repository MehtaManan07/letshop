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
          <Link to="/orders" className="col-3 btn btn-outline-dark">
            {" "}
            Details{" "}
          </Link>
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
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Earnings (Monthly)
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  $40,000
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

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
