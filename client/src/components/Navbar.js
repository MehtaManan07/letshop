import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuth } from "../functions/auth";
import "../App.css";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#eee" };
  }
};

const Navbar = (props) => {
  const guestLinks = (
    <div className="ml-auto navbar-nav">
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
      <Link
        className="nav-item nav-link"
        style={isActive(props.history, "/shop")}
        to="/shop"
      >
        Shop
      </Link>
    </div>
  );
  const authLinks = (
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
        style={isActive(props.history, "/userDashboard")}
        to="/userDashboard"
      >
        DashBoard
      </Link>
      <li
        className="nav-item nav-link"
        style={{ cursor: "pointer", color: "#fff" }}
        onClick={() => logout(() => props.history.push("/"))}
      >
        Logout
      </li>
    </div>
  );

  const adminLinks = (
    <div className="ml-auto navbar-nav">
      <Link
        className="nav-item nav-link"
        style={isActive(props.history, "/adminDashboard")}
        to="/adminDashboard"
      >
        DashBoardd
      </Link>
      <li
        className="nav-item nav-link"
        style={{ cursor: "pointer", color: "#fff" }}
        onClick={() => logout(() => props.history.push("/"))}
      >
        Logout
      </li>
    </div>
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
        {isAuth()
          ? isAuth().data.user.role === 1
            ? adminLinks
            : authLinks
          : guestLinks}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
