import React from "react";
import "./Sidebar.css";
import {Link} from 'react-router-dom'

const Sidebar = () => {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
  }

  return (
    <div>
      <div id="mySidenav" className="sidenav">
        <span className="closebtn" onClick={closeNav}>
          &times;
        </span>
        <Link to="/">BOOKMART</Link>
        <hr style={{ color: '#FFF' }} />
        <Link to="/orders">Orders</Link>
        <Link to="/create/category">Manage Categories</Link>
        <Link to="/create/product">Add Product</Link>
        <Link to="/products">Products</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
      <span className="openBtn" onClick={openNav}>&#9776;</span>
    </div>
  );
};

export default Sidebar;
