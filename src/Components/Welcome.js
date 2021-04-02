import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Welcome extends Component {
  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1>Welcome to Book Shop</h1>
        <blockquote className="blockquote mb-0">
          <p>Good friends, Goob book, and a sleep conscience:</p>
          <footer className="blockquote-footer">Hoang Hai</footer>
        </blockquote>
      </Jumbotron>
    );
  }
}
