import { Button, Dropdown, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { db } from "../../firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export function AddProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const user = useSelector((state) => state.user);
  const categoryChange = (category) => {
    setCategory(category);
    switch (category) {
      case "Technology":
        return setImage(
          "https://www.nicepng.com/png/detail/119-1192701_it-technology-technology-icon-png.png"
        );
      case "Kitchen":
        return setImage(
          "https://cdn4.vectorstock.com/i/1000x1000/04/68/chef-kitchen-icon-vector-3890468.jpg"
        );
      case "Furniture":
        return setImage(
          "https://www.mcicon.com/wp-content/uploads/2021/03/Furniture-16.jpg"
        );
      default:
        return setImage(null);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setButtonState(true);
    if (
      name !== "" &&
      description !== "" &&
      category &&
      image &&
      quantity > 0
    ) {
      const userCollectionRef = collection(db, "Users");
      const data = await getDocs(userCollectionRef);
      const check = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((item) => item.email === user);
      const getDoc = doc(userCollectionRef, check.id);
      await updateDoc(getDoc, {
        myProducts: [
          ...check?.myProducts,
          {
            name: name,
            image: image,
            description: description,
            quantity: parseInt(quantity),
            category: category,
          },
        ],
      });
      alert("Saved");
      setButtonState(false);
      setName("");
      setDescription("");
      setImage(null);
      setQuantity(0);
      setCategory(null);
      props.handleClose();
      props.updateState(Math.random());
    } else {
      alert("Please fill up all details!");
      setButtonState(false);
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveProduct}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name!"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={buttonState}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product description!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={buttonState}
              minLength={30}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCategory"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Form.Label className="me-5">Select Category</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="success"
                disabled={buttonState}
              >
                {category ? category : "Category Name"}
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item
                  onClick={() => categoryChange("Technology")}
                  active
                >
                  Technology
                </Dropdown.Item>
                <Dropdown.Item onClick={() => categoryChange("Kitchen")}>
                  Kitchen
                </Dropdown.Item>
                <Dropdown.Item onClick={() => categoryChange("Furniture")}>
                  Furniture
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicQuantity">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product quantity!"
              value={quantity}
              onChange={(e) => {
                e.target.value <= 0
                  ? setQuantity(0)
                  : setQuantity(e.target.value);
              }}
              required
              disabled={buttonState}
            />
          </Form.Group>
          <Button variant="dark" type="submit" disabled={buttonState}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
