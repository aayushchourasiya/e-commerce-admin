import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { MyProducts } from ".";
import { AddProduct } from "../Modals";
export function Home(props) {
  const [modalShow, setModalShow] = useState(false);
  const [noProducts, setNoProducts] = useState(true);
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
  }, [updateState]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          width: "90%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3 className="mt-5">My Products</h3>
        {noProducts && (
          <Button
            variant="dark"
            className="mt-3"
            onClick={() => setModalShow(true)}
          >
            Add Products
          </Button>
        )}
      </div>
      <MyProducts
        noProducts={(val) => setNoProducts(val)}
        updateState={(val) => setUpdateState(val)}
      />
      <AddProduct
        show={modalShow}
        handleClose={() => setModalShow(false)}
        updateState={(val) => setUpdateState(val)}
      />
    </Container>
  );
}
