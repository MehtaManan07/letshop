import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  listOrders,
  getEnumValues,
  updateEnumValues,
} from "../../functions/order";
import { isAuth } from "../../functions/auth";
import Cards from "../../components/Admin/Cards";
import { Table, Form, Badge, CardDeck } from "react-bootstrap";
import moment from "moment";
import ProductsModal from "../../components/Admin/ProductsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [particularOrder, setParticularOrder] = useState();
  const [statusValues, setStatusValues] = useState([]);

  const userId = isAuth() && isAuth().data.user._id;
  const token = isAuth() && isAuth().data.token;

  const cards = [{
    className: 'total-orders',
    color: 'rgba(0,255,0,0.5)',
    endNum: orders.length,
    cardText: 'Total number of Orders till date',
    cardTitle: 'Total Orders'
  },{
    className: 'delivered-orders',
    color: 'rgba(0,0,255,0.5)',
    endNum: orders.length,
    cardText: 'Total number of Orders delivered till date',
    cardTitle: 'Delivered Orders'
  },{
    className: 'orders-cancelled',
    color: 'rgba(255,0,0,0.5)',
    endNum: orders.length,
    cardText: 'Total number of Orders cancelled till date',
    cardTitle: 'Cancelled Orders'
  },]

  console.log(isAuth())

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

  const loadStatusValues = (userId, token) => {
    getEnumValues(userId, token).then((response) => {
      console.log(response);
      if (response.error) {
        console.log(response.error);
      } else {
        setStatusValues(response);
      }
    });
  };

  const handleStatusChange = (event, Id) => {
    updateEnumValues(token, Id, event.target.value, userId).then(
      (response) => {
        console.log(response)
        if (response.error) {
          console.log(response.error);
        } else {
          loadOrders();
        }
      }
    );
  };

  const showStatus = (order) => (
    <Form>
      <Form.Control
        as="select"
        custom
        onChange={(event) => handleStatusChange(event, order._id)}
      >
        <option>Select</option>
        {statusValues.map((value, index) => (
          <option value={value} key={index}>
            {value}
          </option>
        ))}
      </Form.Control>
    </Form>
  );

  useEffect(() => {
    loadOrders(userId, token);
    loadStatusValues(userId, token);
  }, []);

  return (
    <Layout
      title="Orders"
      description="Manage all your orders here"
      className="container"
    >
      {orders && (
        <CardDeck>
        {
          cards.map(card => (
          <Cards
            className={card.className}
            cardTitle={card.cardTitle}
            endNum={card.endNum}
            color={card.color}
            cardText={card.cardText}
          />
          ))
        }
        </CardDeck>
      )}
      <h3 className=" bg-light d-flex justify-content-center"> Orders </h3>
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
            <tr style={{ cursor: "pointer" }} key={i}>
              <td>{i + 1}</td>
              <td>{order._id}</td>
              {/* <td>{order.transaction_id}</td> */}
              <td>${order.amount}</td>
              <td>{order.user.name}</td>
              <td>{moment(order.createdAt).fromNow()}</td>
              <td>
                <Badge variant="success"> {order.status} </Badge>
              </td>
              {/* <td>{showStatus(order)}</td> */}
              <td>{order.address}</td>
              <td
                className="btn btn-warning btn-sm"
                onClick={() => {
                  setParticularOrder(order);
                  setShow(true);
                }}
              >
                View Products
              </td>
            </tr>
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
