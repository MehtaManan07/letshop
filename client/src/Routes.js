import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";


const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={UserDashboard} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
