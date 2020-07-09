import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#eee" };
  }
};

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link
        to="/"
        style={isActive(props.history, "/")}
        className="navbar-brand"
      >
        Let's Shop
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
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
