import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { emailValidation, passwordValidation } from "../../Helpers/Validations";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../store/actions";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [name, setName] = useState("");
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

  const saveDetails = (e) => {
    e.preventDefault();
    setButtonState(true);
    if (emailValidation(email)) {
      if (passwordValidation(password)) {
        passMessage.current.innerHTML = "";
        createUserWithEmailAndPassword(auth, email, password)
          .then(async () => {
            const userCollectionRef = collection(db, "Users");
            await addDoc(userCollectionRef, {
              email: email,
              password: password,
              role: "admin",
              fullName: name,
            });
            setEmail("");
            setPassword("");
            setName("");
            setButtonState(false);
            dispatch(updateData(!updateState));
            alert("Account Created!");
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
              emailMessage.current.innerHTML =
                "<p style='color:red'>User with this email is already registered!</p>";
              emailRef.current.focus();
              setButtonState(false);
            } else {
              alert(errorCode);
              setButtonState(false);
            }
          });
      } else {
        passRef.current.focus();
        passMessage.current.innerHTML =
          "<p style='color:red;'>Your password should be of 8 characters, with one number and letter!</p>";
        setButtonState(false);
      }
    } else {
      emailMessage.current.innerHTML =
        "<p style='color:red'>Please use a proper email id!</p>";
      emailRef.current.focus();
      setButtonState(false);
    }
  };
  return (
    <Container>
      <Form className="my-5" onSubmit={saveDetails}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoComplete="on"
            value={name}
            type="name"
            placeholder="Enter your full name!"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

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
              emailMessage.current.innerHTML =
                "<p>We'll never share your email with anyone else.</p>";
            }}
            ref={emailRef}
          />
          <Form.Text className="text-muted" ref={emailMessage}>
            <p>We'll never share your email with anyone else.</p>
          </Form.Text>
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
