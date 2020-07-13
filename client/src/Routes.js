import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/Routing/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";
import AdminRoute from "./components/Routing/AdminRoute";
import AdminDashboard from './pages/admin/AdminDashBoard'
import AddCategory from "./pages/admin/AddCategory";
import AddProduct from "./pages/admin/AddProduct";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import CartComponent from "./pages/cart/CartComponent";


const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={CartComponent} />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:productId" component={SingleProduct} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/userDashboard" component={UserDashboard} />
        <AdminRoute path="/adminDashboard" component={AdminDashboard} />
        <AdminRoute path="/create/category" component={AddCategory} />
        <AdminRoute path="/create/product" component={AddProduct} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
