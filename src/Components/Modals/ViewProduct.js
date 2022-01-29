import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { db } from "../../firebase-config";

export function ViewProduct(props) {

  const user = useSelector(state=>state.user);
  const [buttonState,setButtonState] = useState(false);

  const deleteProduct = async (mainItem) => {
    setButtonState(true);
    const userCollectionRef = collection(db, "Users");
      const data = await getDocs(userCollectionRef);
      const check = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((item) => item.email === user);
      const getDoc = doc(userCollectionRef, check.id);
      check?.myProducts?.splice(mainItem?.id , 1);
      await updateDoc(getDoc, {
        myProducts: [
          ...check?.myProducts,
        ],
      });
      alert("Deleted");
      setButtonState(false);
      props.handleClose();
      props.updateState(Math.random());
  }
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={props.image}
          style={{ width: "200px", height: "200px" }}
          alt="Product!"
        />
        <h6>Quantity : {props.quantity}</h6>
        <h6>Category : {props.category}</h6>
        <Form.Control as="textarea" rows={props.description.length/500} value={props.description} disabled/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={()=>deleteProduct(props.item)} disabled={buttonState}>
          Delete Product
        </Button>
        <Button variant="dark" onClick={props.handleClose}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
