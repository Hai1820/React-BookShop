import "../../assets/Style.css";
import {
  faEdit,
  faFastBackward,
  faFastForward,
  faList,
  faSearch,
  faStepBackward,
  faStepForward,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  FormControl,
  Image,
  InputGroup,
  Table,
} from "react-bootstrap";
import axios from "axios";
import MyToasts from "../MyToasts";
import { Link } from "react-router-dom";
export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentPage: 1,
      booksPerPage: 5,
      sortToggle: true,
      search: "",
    };
  }
  sortData = () => {
    this.setState((state) => ({
      sortToggle: !state.sortToggle,
    }));
    this.findAllBooks(this.state.currentPage);
  };
  componentDidMount() {
    this.findAllBooks(this.state.currentPage);
  }
  findAllBooks(currentPage) {
    currentPage -= 1;
    let sortDir = this.state.sortToggle ? "asc" : "desc";
    axios
      .get(
        "http://localhost:8080/api/books?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.booksPerPage +
          "&sortBy=price&sortDir=" +
          sortDir,
      )

      .then((response) => response.data)
      .then((data) =>
        this.setState({
          books: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        }),
      );
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
  changePage = (e) => {
    let targetPage = parseInt(e.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllBooks(targetPage);
    }
    this.setState({
      [e.target.name]: targetPage,
    });
  };
  // Pagnition
  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllBooks(firstPage);
      }
    }
  };
  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllBooks(this.state.currentPage - prevPage);
      }
    }
  };
  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.booksPerPage,
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllBooks(condition);
      }
    }
  };
  nextPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.booksPerPage,
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllBooks(this.state.currentPage + 1);
      }
    }
  };
  searchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  cancelSearch = (currentPage) => {
    this.setState({ search: "" });
    this.findAllBooks(this.state.currentPage);
  };
  searchData = (currentPage) => {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/api/books/search/" +
          this.state.search +
          "?page=" +
          currentPage +
          "&size=" +
          this.state.booksPerPage,
      )

      .then((response) => response.data)
      .then((data) =>
        this.setState({
          books: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        }),
      );
  };
  render() {
    const { books, currentPage, totalPages, search } = this.state;
    const pageNumberCss = {
      width: "45px",
      border: "1px solid #17A2B*",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold",
    };
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
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} />
              Book List
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="sm">
                <FormControl
                  placeholder="Search"
                  name="search"
                  value={search}
                  autoComplete="off"
                  className="bg-dark text-white info-border"
                  onChange={this.searchChange}
                />
                <InputGroup.Append>
                  <Button
                    size="sm"
                    variant="outline-info"
                    type="button"
                    onClick={this.searchData}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  {"   "}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    type="button"
                    onClick={this.cancelSearch}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN Number</th>
                  <th onClick={this.sortData}>
                    Price
                    <div
                      className={
                        this.state.sortToggle
                          ? "arrow arrow-down"
                          : "arrow arrow-up"
                      }
                    ></div>
                  </th>
                  <th>Language</th>
                  <th>Genre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">
                      {this.state.books.length} Book Available.
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
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
                      <td>{book.genre}</td>
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
          {books.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" }}>
                Showing page {currentPage} of {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                    style={pageNumberCss}
                    className={"bg-dark"}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <InputGroup.Append>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : null}
        </Card>
      </div>
    );
  }
}
