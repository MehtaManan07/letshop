import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import "./Cards.css";
import CountUp from "react-countup";
const Cards = ({ endTotal, endDelivered, endCancelled }) => {
  return (
    <CardDeck>
      <Card className="total-orders" bg="light" border="dark">
        <Card.Body>
          <Card.Title style={{ color: "green" }}> Total Orders </Card.Title>
          <h4>
            <CountUp start={0} end={endTotal} duration={2} seperator="," />
          </h4>
          <Card.Text>Total orders received till date</Card.Text>
        </Card.Body>
      </Card>
      <Card className="delivered-orders" bg="light" border="dark">
        <Card.Body>
          <Card.Title style={{ color: "rgba(0,0,255,0.5)" }}>
            Orders Delivered
          </Card.Title>
          <h4>
            <CountUp
              start={0}
              end={endDelivered}
              duration={2.25}
              seperator=","
            />
          </h4>
          <Card.Text>Total orders delivered till date</Card.Text>
        </Card.Body>
      </Card>
      <Card className="orders-cancelled" bg="light" border="dark">
        <Card.Body>
          <Card.Title style={{ color: "rgba(255,0,0,0.5)" }}>
            Orders Cancelled
          </Card.Title>
          <h4>
            <CountUp
              start={0}
              end={endCancelled}
              duration={2.5}
              seperator=","
            />
          </h4>
          <Card.Text>Total orders cancelled till date</Card.Text>
        </Card.Body>
      </Card>
    </CardDeck>
  );
};

export default Cards;
