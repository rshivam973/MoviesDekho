import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import "./Navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';

function Navi() {
  return (
    <div className="navbar-bg">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to={'/Top-rated'}>
                <Nav.Link className="nav-link">Top Rated</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/tvshows'}>
                <Nav.Link className="nav-link">TV Shows</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/anime'}>
                <Nav.Link className="nav-link">Anime</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/contact'} className="">
                <Nav.Link className="nav-link">Contact Me</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </div>
  );
}

export default Navi;
