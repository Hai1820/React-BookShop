import { faPlusSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      coverPhotoURL: "",
      isbnNumber: "",
      price: "",
      language: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSubmit = (e) => {
    e.preventDefault();
  };
  onChange = (e) => {
    this.state({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <Card className="boder border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} />
          Add Book
        </Card.Header>
        <Form onSubmit={this.onSubmit} id="bookFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  className="bg-dark text-white"
                  value={this.state.title}
                  onChange={this.onChange}
                  name="title"
                  type="text"
                  placeholder="Enter Book Title"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  required
                  className="bg-dark text-white"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Enter Book Author"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCoverPhotoUrl">
                <Form.Label>Cover Photo Url</Form.Label>
                <Form.Control
                  required
                  className="bg-dark text-white"
                  name="coverPhotoURL"
                  value={this.state.coverPhotoURL}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Enter Book CoverPhotoUrl"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridISBNNumber">
                <Form.Label>ISBN Number</Form.Label>
                <Form.Control
                  required
                  className="bg-dark text-white"
                  name="isbnNumber"
                  value={this.state.isbnNumber}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Enter Book ISBN Number"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  className="bg-dark text-white"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Enter Book Price"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Control
                  required
                  className="bg-dark text-white"
                  name="language"
                  value={this.state.language}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Enter Book Language"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} />
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
