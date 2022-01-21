import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SingleProduct } from ".";
import { auth, db } from "../../../firebase-config";

export function MyProducts() {
  const [mainData, setMainData] = useState(null);
  useEffect(() => {
    const myFunction = async () => {
      const userCollectionRef = collection(db, "Users");
      const data = await getDocs(userCollectionRef);
      const check = data.docs
        .map((doc) => ({ ...doc.data() }))
        .find((item) => item.email === auth.currentUser.email);
      setMainData(check);
    };
    myFunction();
  }, []);
  return (
    <Container style={{ display: "flex" }}>
      {mainData?.myProducts?.length > 0 ? (
        mainData?.myProducts?.map((item) => {
          return (
            <SingleProduct
              key={item.id}
              image={item.image}
              title={item.name}
              text={
                item.description.length > 60
                  ? item.description.slice(0,59) + "..."
                  : item.description
              }
              onClick={() => alert("abc")}
            />
          );
        })
      ) : (
        <h3 className="my-5">No Products Found!</h3>
      )}
    </Container>
  );
}
