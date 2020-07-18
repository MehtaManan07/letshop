import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { Link } from "react-router-dom";
import { Table, CardDeck } from "react-bootstrap";
import Cards from "../../components/Admin/Cards";
import { listOrders } from "../../functions/order";
import { getAllUsers } from "../../functions/user";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const {
    data: {
      user: { _id, name, email, role },
      token,
    },
  } = isAuth();

  useEffect(() => {
    loadOrders(_id, token);
    loadUsers();
  }, []);

  const loadOrders = (userId, token) => {
    listOrders(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setOrders(response.orders);
      }
    });
  };

  const loadUsers = () => {
    getAllUsers().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setUsers(response);
      }
    });
  };

  const adminLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header"> Admin Links </h3>
        <ul className="list-group">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
          <Link className="nav-link" to="/create/product">
            Create Product
          </Link>
        </ul>
      </div>
    );
  };

  const ordersHistory = () => {
    return (
      <div className="card mb-5">
        <div className="row container">
          <h3 className="col-9"> Orders History </h3>
          <Link to="/orders" className="col-3 btn btn-outline-dark">
            Details
          </Link>
        </div>
        <li className="list-group-item"> Role </li>
      </div>
    );
  };

  const cards = [
    {
      className: "green-border",
      color: "rgba(0,255,0,0.5)",
      endNum: orders.length,
      cardText: "Total number of Orders till date",
      cardTitle: "Total Orders",
    },
    {
      className: "blue-border",
      color: "rgba(0,0,255,0.5)",
      endNum: users.length,
      cardText: "Total number of Users delivered till date",
      cardTitle: "Total Users",
    },
    {
      className: "red-border",
      color: "rgba(255,0,0,0.5)",
      endNum: orders.length,
      cardText: "Total number of Orders cancelled till date",
      cardTitle: "Cancelled Orders",
    },
  ];

  return (
    <Layout
      title="Admin Dashboard"
      className="container"
      description={`Hello ${name}`}
    >
      <CardDeck>
        {cards.map((card) => (
          <Cards
            className={card.className}
            cardTitle={card.cardTitle}
            endNum={card.endNum}
            color={card.color}
            cardText={card.cardText}
          />
        ))}
      </CardDeck>
      <hr />
      <div className="row">
        <div className="col-3"> {adminLinks()} </div>
        <div className="col-9">{ordersHistory()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
