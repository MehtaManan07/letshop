import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from './pages/admin/AdminDashBoard'


const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/userDashboard" component={UserDashboard} />
        <AdminRoute path="/adminDashboard" component={AdminDashboard} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
