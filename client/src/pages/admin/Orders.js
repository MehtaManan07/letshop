import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { listOrders } from "../../functions/order";
import { isAuth } from "../../functions/auth";
import Cards from "../../components/Admin/Cards";
import { Table, Badge, Accordion, Card, Button } from "react-bootstrap";
import moment from "moment";
import ProductsModal from "../../components/Admin/ProductsModal";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [particularOrder, setParticularOrder] = useState();

  const userId = isAuth() && isAuth().data.user._id;
  const token = isAuth() && isAuth().data.token;

  const triggerModal = (order) => {
    setShow(true);
    return;
  };

  const loadOrders = (userId, token) => {
    listOrders(userId, token).then((response) => {
      console.log(response);
      if (response.error) {
        console.log(response.error);
      } else {
        setOrders(response.orders);
      }
    });
  };

  useEffect(() => {
    loadOrders(userId, token);
  }, []);

  return (
    <Layout
      title="Orders"
      description="Manage all your orders here"
      className="container"
    >
      {orders && (
        <div className="container">
          <Cards
            header="Orders"
            title="Total Orders"
            endTotal={orders.length}
            endDelivered={orders.length}
            endCancelled={orders.length}
          />
          <hr />
        </div>
      )}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Id</th>
            {/* <th>Transaction Id</th> */}
            <th>Amount</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Address</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <>
              <tr style={{ cursor: "pointer" }} key={i}>
                <td>{i + 1}</td>
                <td>{order._id}</td>
                {/* <td>{order.transaction_id}</td> */}
                <td>${order.amount}</td>
                <td>Name</td>
                <td>{moment(order.createdAt).fromNow()}</td>
                <td>
                  <Badge variant="success">{order.status}</Badge>
                </td>
                <td>{order.address}</td>
                <td
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setParticularOrder(order)
                    setShow(true)
                    }}
                >
                  View Products
                </td>
              </tr>
            </>
          ))}
          <ProductsModal
            order={particularOrder}
            show={show}
            onHide={() => setShow(false)}
          />
        </tbody>
      </Table>
    </Layout>
  );
};

export default Orders;
