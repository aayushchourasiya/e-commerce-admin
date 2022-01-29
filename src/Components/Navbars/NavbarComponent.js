import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { currentUser, updateData } from "../../store/actions";

function NavbarComponent(props) {
  const dispatch = useDispatch();
  const updateState = useSelector((state) => state.updateData);
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Link to="/" className="navbar-brand mx-4">
        AZ Market
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          {props.noUser ? (
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </Nav>
          ) : (
            <>
              <Nav
                className="me-auto"
                style={{ width: "100%", justifyContent: "flex-end" }}
              >
                <Link to="/profile" className="nav-link mx-3">
                  My Profile
                </Link>
                <Button
                  onClick={() => {
                    auth.signOut();
                    dispatch(currentUser(null));
                    dispatch(updateData(!updateState));
                  }}
                  variant="danger"
                >
                  Sign Out
                </Button>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
