import { faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, ButtonGroup, Card, Image, Table } from "react-bootstrap";
import axios from "axios";
import MyToasts from "./MyToasts";
import { Link } from "react-router-dom";
export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  componentDidMount() {
    this.findAllBooks();
  }
  findAllBooks() {
    axios
      .get("http://localhost:8080/api/books/all")
      .then((response) => response.data)
      .then((data) => this.setState({ books: data }));
  }
  onDelete = (bookId) => {
    axios
      .delete("http://localhost:8080/api/books/" + bookId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => {
            this.setState({ show: false });
          }, 3000);
          this.setState({
            books: this.state.books.filter((book) => book.id !== bookId),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };
  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToasts
            show={this.state.show}
            message={"Book Delete Succesfully."}
            type={"danger"}
          />
        </div>
        <Card className="boder border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} />
            Book List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN Number</th>
                  <th>Price</th>
                  <th>Language</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">
                      {this.state.books.length} Book Available.
                    </td>
                  </tr>
                ) : (
                  this.state.books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <Image
                          src={book.coverPhotoUrl}
                          roundedCircle
                          with="25"
                          height="25"
                        />
                        {book.title}
                      </td>
                      <td>{book.author}</td>
                      <td>{book.isbnNumber}</td>
                      <td>{book.price}</td>
                      <td>{book.language}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"/edit/" + book.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            onClick={this.onDelete.bind(this, book.id)}
                            size="sm"
                            variant="outline-danger"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>{" "}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
