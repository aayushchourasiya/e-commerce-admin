import { updatePassword } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase-config";

export function Profile() {
  const [name, setName] = useState("");
  const [previousName, setPreviousName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPasswordState, setOldPasswordState] = useState(false);
  const [oldPasswordField, setOldPasswordField] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nameState, setNameState] = useState(true);
  const [passwordState, setPasswordState] = useState(true);
  const [buttonState, setButtonState] = useState(false);
  const [data, setData] = useState(null);
  const passRef = useRef();
  const passMessage = useRef();
  const currentUser = useSelector((state) => state.user);

  const userCollectionRef = collection(db, "Users");

  useEffect(() => {
    const getDetails = async () => {
      const data = await getDocs(userCollectionRef);
      const check = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .find((item) => item.email === currentUser);
      setEmail(currentUser);
      setName(check?.fullName);
      setPassword(check?.password);
      setPreviousName(check?.fullName);
      setData(check);
    };
    getDetails();
    //eslint-disable-next-line
  }, []);

  const saveDetails = async (e) => {
    e.preventDefault();
    if (name.trim() !== "" && newPassword.trim() !== "") {
      setButtonState(true);
      if (name !== previousName || newPassword !== password) {
        const getDoc = doc(userCollectionRef, data.id);
        await updateDoc(getDoc, {
          fullName: name,
          password: newPassword,
        });
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            alert("Changes Saved");
            setButtonState(false);
            setPreviousName(name);
            setNameState(true);
            setPasswordState(true);
          })
          .catch((e) => {
            alert(e.code);
            setButtonState(false);
          });
      } else {
        alert("No changes found!");
        setButtonState(false);
      }
    }
  };

  const checkOldPassword = () => {
    if (oldPasswordField === password) {
      passRef.current.focus();
      setPasswordState(false);
      setOldPasswordState(true);
    } else {
      alert("Wrong Old Password!");
    }
  };

  return (
    <Container>
      <Form className="my-5" onSubmit={saveDetails}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Label>Name</Form.Label>
            <Form.Label
              onClick={() => {
                setNameState((prev) => !prev);
              }}
            >
              {nameState ? "Edit" : "Cancel"}
            </Form.Label>
          </div>
          <Form.Control
            autoComplete="on"
            value={name}
            type="name"
            placeholder="Enter your full name!"
            onChange={(e) => setName(e.target.value)}
            required
            disabled={nameState}
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
            disabled
          />
          <Form.Text className="text-muted">
            <p>You can't change your E-mail!</p>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Label>Old Password</Form.Label>
          </div>
          <Form.Control
            autoComplete="on"
            value={oldPasswordField}
            type="password"
            placeholder="Enter your old password!"
            required
            onChange={(e) => setOldPasswordField(e.target.value)}
            disabled={oldPasswordState}
          />
          <Form.Text className="text-muted">
            <h6
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                margin: 5,
                borderRadius: 5,
                cursor: "pointer",
                width: "5%",
              }}
              onClick={checkOldPassword}
            >
              Check
            </h6>
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Label>New Password</Form.Label>
          </div>
          <Form.Control
            autoComplete="on"
            value={newPassword}
            type="password"
            placeholder="Enter your new password!"
            required
            disabled={passwordState}
            onChange={(e) => setNewPassword(e.target.value)}
            ref={passRef}
            onBlur={() => setPasswordState(true)}
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
      </Form> */}
      </Container>
  );
}

