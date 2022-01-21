import React from "react";
import { Button, Card } from "react-bootstrap";

export function SingleProduct(props) {
  return (
    <Card style={{ width: "18rem" , marginRight:'10px' }}>
      <Card.Img
        variant="top"
        src={props.image}
        style={{ width: "200px", height: "200px"}}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
        <Button variant="dark" onClick={props.onClick}>
          View Product
        </Button>
      </Card.Body>
    </Card>
  );
}
