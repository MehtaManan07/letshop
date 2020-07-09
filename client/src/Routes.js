import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <Switch>
    <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

export default Routes;
