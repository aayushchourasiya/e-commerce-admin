import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { currentUser, updateData } from "../../store/actions";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const emailMessage = useRef();
  const passRef = useRef();
  const passMessage = useRef();
  const dispatch = useDispatch();
  const updateState = useSelector((state) => state.updateData);
  const [buttonState, setButtonState] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setButtonState(true);
    const userCollectionRef = collection(db, "Users");
    const data = await getDocs(userCollectionRef);
    const check = data.docs
      .map((doc) => ({ ...doc.data() }))
      .find((item) => item.email === email);
    if (check.role === "admin") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
          dispatch(updateData(!updateState));
          dispatch(currentUser(email));
          setEmail("");
          setPassword("");
          setButtonState(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (
            errorCode === "auth/wrong-password" ||
            errorCode === "auth/user-not-found"
          ) {
            alert("Incorrect email or password!");
            setButtonState(false);
          } else {
            alert(errorCode);
            setButtonState(false);
          }
        });
    } else {
      alert("Please use customer app, if your have customer id!");
      setButtonState(false);
    }
  };
  return (
    <Container>
      <Form className="my-5" onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autoComplete="on"
            type="email"
            placeholder="Enter your email!"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              emailMessage.current.innerHTML = "";
            }}
            ref={emailRef}
          />
          <Form.Text className="text-muted" ref={emailMessage}></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoComplete="on"
            value={password}
            type="password"
            placeholder="Enter your password!"
            required
            onChange={(e) => setPassword(e.target.value)}
            ref={passRef}
          />
          <Form.Text className="text-muted" ref={passMessage}></Form.Text>
        </Form.Group>
        <Button variant="dark" type="submit" disabled={buttonState}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
