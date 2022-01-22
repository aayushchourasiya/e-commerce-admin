import React from "react";
import { Container } from "react-bootstrap";
import image from "../assets/loader.gif"

function Loading() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:'100vh'
      }}
    >
      <img src={image} alt="Loading..."/>
    </Container>
  );
}

export default Loading;
