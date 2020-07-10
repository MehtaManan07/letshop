import React from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
const UserDashboard = () => {
  const {
    data: {
      user: { name, email, role },
    },
  } = isAuth();

  return (
    <Layout title="User Dashboard" className="container" description="profile">
      <div className="card mb-5">
        <h3 className="card-header"> User Information </h3>
        <table className="table">
        <thead>
          <th scope="col"> # </th>
          <th scope="col"> Fields </th>
          <th scope="col"> Data </th>
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
            <th scope="row"> {role === 1 ? 'Admin' : 'Registered User'} </th>
          </tr>
        </tbody>
        </table>
      </div>
      <div className="card mb-5">
        <h3 className="card-header"> Purchase History </h3>
        <li className="list-group-item"> Role </li>
      </div>
    </Layout>
  );
};

export default UserDashboard;
