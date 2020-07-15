import React from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
const UserDashboard = () => {
  const {
    data: {
      user: { name, email, role },
    },
  } = isAuth();

  const userInfo = () => (
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

  const userLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header"> User Links </h3>
        <ul className="list-group">
          <Link className="nav-link" to="/cart">
            My Cart
          </Link>
          <Link className="nav-link" to="/profile/update">
            Update Profile
          </Link>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header"> Purchase History </h3>
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
        <div className="col-3"> {userLinks()} </div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
