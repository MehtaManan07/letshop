import React from "react";
import { Card, CardDeck } from "react-bootstrap";
import "./Cards.css";
import CountUp from "react-countup";
const Cards = ({ className, color, bg, endNum, cardText, cardTitle }) => {
  return (
    <Card className={className} bg={bg || "light"} border="dark">
      <Card.Body>
        <Card.Title style={{ color: color }}>{cardTitle}</Card.Title>
        <h4>
          <CountUp start={0} end={endNum} duration={2} seperator="," />
        </h4>
        <Card.Text>{cardText}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cards;
