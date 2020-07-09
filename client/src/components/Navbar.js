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
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm fixed-top">
      <div className="container">
        <Link
          to="/"
          style={isActive(props.history, "/")}
          className="navbar-brand"
        >
          Let's Shop
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link"
                style={isActive(props.history, "/login")}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/register"
                className="nav-link"
                style={isActive(props.history, "/register")}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
