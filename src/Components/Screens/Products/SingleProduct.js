import React from "react";
import { Button, Card } from "react-bootstrap";

export function SingleProduct(props) {
  return (
    <Card style={{ width: "18rem", marginRight: "10px", marginBottom: "10px" }}>
        <Card.Img
          variant="top"
          src={props.image}
          style={{ width: "200px", height: "200px" }}
        />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <h6>Quantity : {props.quantity}</h6>
        <h6 style={{fontSize:'small'}}>Category : {props.category}</h6>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
      <Button variant="dark" onClick={props.onClick}>
        View Product
      </Button>
    </Card>
  );
}
