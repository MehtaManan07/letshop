import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { isAuth } from "../../functions/auth";
import { Link } from "react-router-dom";
import { CardDeck, Table } from "react-bootstrap";
import Chart from "../../components/Admin/Chart";
import Cards from "../../components/Admin/Cards";
import { listOrders } from "../../functions/order";
import { getAllUsers } from "../../functions/user";
import { getProducts } from "../../functions/core";
import OrderTable from "../../components/Admin/OrderTable";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [productsBySell, setProductsBySell] = useState([]);
  const [show, setShow] = useState(false);
  const [particularOrder, setParticularOrder] = useState();

  const {
    data: {
      user: { _id, name, email, role },
      token,
    },
  } = isAuth();

  useEffect(() => {
    loadOrders(_id, token);
    loadUsers();
    loadProductsBySell();
  }, []);

  const onClickHandler = (order) => {
    setParticularOrder(order);
    setShow(true);
  };

  const loadOrders = (userId, token) => {
    listOrders(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
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

  const totalRevenue = (values, key) => {
    const revenue = values.reduce((prev, curr) => prev + (curr[key] || 0), 0);
    return revenue;
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
      <div class="col-xl-12 col-lg-5">
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Lastest Orders</h6>
        </div>
        <div class="card-body">
        <OrderTable
        orders={orders.slice(0,5)}
        onClickHandler={onClickHandler}
        setShow={setShow}
        show={show}
        particularOrder={particularOrder}
      />
        </div>
      </div>
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
      endNum: totalRevenue(orders, "amount"),
      cardText: "Total revenue generated till date",
      cardTitle: "Total Revenue",
    },
  ];

  const loadProductsBySell = () => {
    getProducts("sold", 5).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setProductsBySell(response.data);
      }
    });
  };

  return (
    <Layout
      title="Admin Dashboard"
      className="container"
      description={`Hello ${name}`}
    >
    <div className="row d-flex justify-content-center">
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
    </div>
      <hr />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Earnings Overview
              </h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                {orders && <Chart orders={orders} />}
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Best Sellers</h6>
            </div>
            <div class="card-body">
              <Table bordered striped responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Items sold</th>
                  </tr>
                </thead>
                <tbody>
                  {productsBySell.map((product, i) => (
                    <tr key={product._id}>
                      <td> {i + 1} </td>
                      <td> {product.name} </td>
                      <td> $ {product.price} </td>
                      <td> {product.sold} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row">
          </div>
        </div>
      </div>
            {ordersHistory()}
    </Layout>
  );
};

export default AdminDashboard;
