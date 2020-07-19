import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Chart from "../../components/Admin/Chart";
import {
  listOrders,
  getEnumValues,
  updateEnumValues,
} from "../../functions/order";
import { isAuth } from "../../functions/auth";
import Cards from "../../components/Admin/Cards";
import { Form, CardDeck } from "react-bootstrap";
import OrderTable from "../../components/Admin/OrderTable";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [particularOrder, setParticularOrder] = useState();
  const [statusValues, setStatusValues] = useState([]);

  const userId = isAuth() && isAuth().data.user._id;
  const token = isAuth() && isAuth().data.token;

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
      endNum: orders.length,
      cardText: "Total number of Orders delivered till date",
      cardTitle: "Delivered Orders",
    },
    {
      className: "red-border",
      color: "rgba(255,0,0,0.5)",
      endNum: orders.length,
      cardText: "Total number of Orders cancelled till date",
      cardTitle: "Cancelled Orders",
    },
  ];

  const loadOrders = (userId, token) => {
    listOrders(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setOrders(response.orders);
      }
    });
  };

  const onClickHandler = (order) => {
    setParticularOrder(order);
    setShow(true);
  };

  const loadStatusValues = (userId, token) => {
    getEnumValues(userId, token).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setStatusValues(response);
      }
    });
  };

  const handleStatusChange = (event, Id) => {
    updateEnumValues(token, Id, event.target.value, userId).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        loadOrders();
      }
    });
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
      )}
      <h3 className=" bg-light d-flex justify-content-center"> Orders </h3>
      <OrderTable
        orders={orders}
        onClickHandler={onClickHandler}
        setShow={setShow}
        show={show}
        particularOrder={particularOrder}
      />
      <Chart orders={orders} />
    </Layout>
  );
};

export default Orders;
