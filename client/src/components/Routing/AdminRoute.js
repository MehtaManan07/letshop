import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../functions/auth";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().data.user.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
export default AdminRoute;
