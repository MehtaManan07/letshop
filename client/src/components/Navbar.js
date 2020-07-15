import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuth } from "../functions/auth";
import { cartItemsCount } from "../functions/cart";
import "../App.css";
import { Badge } from "react-bootstrap";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#eee" };
  }
};

const Navbar = (props) => {
  const guestLinks = (
    <>
      <Link
        className="nav-item nav-link"
        style={isActive(props.history, "/login")}
        to="/login"
      >
        Login
      </Link>
      <Link
        className="nav-item nav-link"
        style={isActive(props.history, "/register")}
        to="/register"
      >
        Register
      </Link>
    </>
  );
  const authLinks = (
    <>
      <Link
        className="nav-item nav-link"
        style={isActive(props.history, "/userDashboard")}
        to="/userDashboard"
      >
        <i className="fa fa-user">{' '}Dashboard</i>
      </Link>
      <li
        className="nav-item nav-link"
        style={{ cursor: "pointer", color: "#fff" }}
        onClick={() => logout(() => props.history.push("/"))}
      >
        Logout
      </li>
    </>
  );

  const adminLinks = (
    <>
      <Link
        className="nav-item nav-link"
        style={isActive(props.history, "/adminDashboard")}
        to="/adminDashboard"
      >
        <i className="fa fa-user">Dashboardd</i>
      </Link>
      <li
        className="nav-item nav-link"
        style={{ cursor: "pointer", color: "#fff" }}
        onClick={() => logout(() => props.history.push("/"))}
      >
        Logout
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link
        to="/"
        style={isActive(props.history, "/")}
        className="navbar-brand"
      >
        BookMart
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="ml-auto navbar-nav">
          <Link
            className="nav-item nav-link"
            style={isActive(props.history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
          <Link
            className="nav-item nav-link"
            style={isActive(props.history, "/cart")}
            to="/cart"
          >
           <i className="fa fa-shopping-cart"></i> Cart
            <sup>
              {cartItemsCount() > 0 && (
                <Badge variant="success"> {cartItemsCount()} </Badge>
              )}
            </sup>
          </Link>
          {isAuth()
            ? isAuth().data.user.role === 1
              ? adminLinks
              : authLinks
            : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
