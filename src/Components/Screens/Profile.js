import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

export function Profile() {
  return (
      <Container>
          {/* <Form className="my-5" onSubmit={saveDetails}>
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
      </Form> */}
      </Container>
  );
}

