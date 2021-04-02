import React, { Component } from "react";
import { Col, Container, Navbar } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    let year = new Date().getFullYear();
    return (
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container>
          <Col lg="12" className="text-center text-white">
            <div>{year} - All Rights Reserve By Hoang Hai</div>
          </Col>
        </Container>
      </Navbar>
    );
  }
}
