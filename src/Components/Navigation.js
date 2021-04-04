import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to="" className="navbar-brand" href="/">
          BookShop
        </Link>
        <Nav className="mr-auto">
          <Link className="navbar-brand" to="/add">
            Add book
          </Link>
          <Link className="navbar-brand" to="/list">
            Book List
          </Link>
          <Link className="navbar-brand" to="/users">
            User List
          </Link>
        </Nav>
      </Navbar>
    );
  }
}
