import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { MyProducts } from ".";
import { AddProduct } from "../Modals";
export function Home() {
    const [modalShow,setModalShow] = useState(false);
  return (
    <Container>
      <div style={{ display: "flex" ,width:'90%',alignItems:'center',justifyContent:'space-between'}}>
        <h3 className="mt-5">My Products</h3>
        <Button
          variant="dark"
          className="mt-3"
          onClick={() => setModalShow(true)}
        >
          Add Products
        </Button>
      </div>
      <MyProducts />
      <AddProduct    show={modalShow} handleClose={() => setModalShow(false)} />
    </Container>
  );
}
