import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import EngageIcon from "../images/EngageTech.png";
import "../styles.css";

const NavBar = () => {
  return (
    <>
      <Navbar bg=".bg-*" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={EngageIcon}
              width="200"
              height="100%"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Edit Config</Nav.Link>
            <Nav.Link href="create">Create File</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
