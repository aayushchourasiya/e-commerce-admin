import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { SingleProduct } from ".";
import { db } from "../../../firebase-config";
import { AddProduct, ViewProduct } from "../../Modals/";

export function MyProducts() {
  const [mainData, setMainData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [viewProductShow, setViewProductShow] = useState(false);

  const currentUser = useSelector(state=>state.user);

  const [productDetails, setProductDetails] = useState({
    category: "",
    image: "",
    quantity: "",
    title: "",
    description: "",
    item: ""
  });

  const closeViewProductModal = () => {
    setViewProductShow(false);
    setProductDetails({
      category: "",
      image: "",
      quantity: "",
      title: "",
      description: "",
      item: ""
    });
  };

  useEffect(() => {
    const myFunction = async () => {
      const userCollectionRef = collection(db, "Users");
      const data = await getDocs(userCollectionRef);
      const check = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((item) => item.email === currentUser);
      setMainData(check);
    };
    myFunction();
  }, [currentUser]);

  const viewProduct = (item) => {
    setProductDetails({
      image: item.image,
      category: item.category,
      description: item.description,
      quantity: item.quantity,
      title: item.name,
      item: item
    });
    setViewProductShow(true);
  };

  return (
    <>
      <Container style={{ display: "flex", flexWrap: "wrap" }}>
        {mainData?.myProducts?.length > 0 ? (
          mainData?.myProducts?.map((item) => {
            return (
              <SingleProduct
                key={item.id}
                quantity={item.quantity}
                image={item.image}
                category={item.category}
                title={item.name}
                text={
                  item.description.length > 60
                    ? item.description.slice(0, 59) + "..."
                    : item.description
                }
                onClick={() => viewProduct(item)}
              />
            );
          })
        ) : (
          <div>
            <h3 className="mt-5">No Products Found!</h3>
            <Button
              variant="dark"
              className="mt-3"
              onClick={() => setModalShow(true)}
            >
              Add Products
            </Button>
          </div>
        )}
        <AddProduct show={modalShow} handleClose={() => setModalShow(false)} />
        <ViewProduct
          show={viewProductShow}
          handleClose={() => closeViewProductModal()}
          category={productDetails.category}
          description={productDetails.description}
          quantity={productDetails.quantity}
          image={productDetails.image}
          title={productDetails.title}
          item={productDetails.item}
        />
      </Container>
    </>
  );
}
