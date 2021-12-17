import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { emailValidation, passwordValidation } from "../../Helpers/Validations";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const emailMessage = useRef();
  const passRef = useRef();
  const passMessage = useRef();
  const saveDetails = (e) => {
    e.preventDefault();
    if (emailValidation(email)) {
      if (passwordValidation(password)) {
        passMessage.current.innerHTML = "";
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("user",user);
            setEmail("");
            setPassword("");
            setName("");
            alert("Saved! Please login now!");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });
      } else {
        passRef.current.focus();
        passMessage.current.innerHTML =
          "<p style='color:red;'>Your password should be of 8 characters, with one number and letter!</p>";
      }
    } else {
      emailMessage.current.innerHTML =
        "<p style='color:red'>Please use a proper email id!</p>";
      emailRef.current.focus();
    }
  };
  return (
    <Container>
      <Form className="my-5" onSubmit={saveDetails}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
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
            value={password}
            type="password"
            placeholder="Enter your password!"
            required
            onChange={(e) => setPassword(e.target.value)}
            ref={passRef}
          />
          <Form.Text className="text-muted" ref={passMessage}></Form.Text>
        </Form.Group>
        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
