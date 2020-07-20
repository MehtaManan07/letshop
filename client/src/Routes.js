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
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Orders from "./pages/admin/Orders";
import Profile from "./pages/user/Profile";
import Sidebar from "./components/Admin/Sidebar";
import ManageProducts from "./pages/admin/ManageProducts";


const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" component={CartPage} />
        <Route path="/sidebar" component={Sidebar} />
        <Route path="/orders" component={Orders} />
        <Route path="/login" component={Login} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:productId" component={SingleProduct} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/user/profile/:userId" component={Profile} />
        <PrivateRoute path="/userDashboard" component={UserDashboard} />
        <AdminRoute path="/adminDashboard" component={AdminDashboard} />
        <AdminRoute path="/create/category" component={AddCategory} />
        <AdminRoute path="/create/product" component={AddProduct} />
        <AdminRoute path="/products" component={ManageProducts} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
