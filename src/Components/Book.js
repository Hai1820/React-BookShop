import {
  faEdit,
  faList,
  faPlusSquare,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import MyToasts from "./MyToasts";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      genres: [],
      languages: [],
      show: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoUrl: "",
    isbnNumber: "",
    price: "",
    language: "",
    genre: "",
  };
  componentDidMount() {
    const bookId = +this.props.match.params.id;
    if (bookId) {
      this.findBookById(bookId);
    }
    this.findAllLanguages();
    this.findAllGenres();
  }
  findAllLanguages = () => {
    axios
      .get("http://localhost:8080/api/books/language")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          languages: [{ value: "", display: "Select language" }].concat(
            data.map((language) => {
              return { value: language, display: language };
            }),
          ),
        });
      });
  };
  findAllGenres = () => {
    axios
      .get("http://localhost:8080/api/books/genres")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          genres: [{ value: "", display: "Select Genre" }].concat(
            data.map((genre) => {
              return { value: genre, display: genre };
            }),
          ),
        });
      });
  };

  findBookById = (bookId) => {
    axios
      .get("http://localhost:8080/api/books/" + bookId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            author: response.data.author,
            coverPhotoUrl: response.data.coverPhotoUrl,
            isbnNumber: response.data.isbnNumber,
            price: response.data.price,
            language: response.data.language,
            genre: response.data.genre,
          });
        }
      })
      .catch((err) => {
        console.error("Error - " + err);
      });
  };
  onReset = () => {
    this.setState(() => this.initialState);
  };
  bookList = () => {
    return this.props.history.push("/list");
  };
  onSubmit = (e) => {
    e.preventDefault();
    const book = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoUrl: this.state.coverPhotoUrl,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
      genre: this.state.genre,
    };
    axios.post("http://localhost:8080/api/books", book).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => {
          this.setState({ show: false });
        }, 3000);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onUpdateBook = (e) => {
    e.preventDefault();
    const book = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      coverPhotoUrl: this.state.coverPhotoUrl,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      language: this.state.language,
      genre: this.state.genre,
    };
    axios.put("http://localhost:8080/api/books", book).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => {
          this.setState({ show: false });
        }, 3000);
        setTimeout(() => this.bookList(), 300);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  render() {
    const {
      title,
      author,
      coverPhotoUrl,
      isbnNumber,
      price,
      language,
      genre,
    } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToasts
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Book Update Successfully."
                : "Book Save Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className="boder border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />
            {this.state.id ? "Update Book" : " Add Book"}
          </Card.Header>
          <Form
            onReset={this.onReset}
            onSubmit={this.state.id ? this.onUpdateBook : this.onSubmit}
            id="bookFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    className="bg-dark text-white"
                    value={title}
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
                    autoComplete="off"
                    value={author}
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
                    autoComplete="off"
                    className="bg-dark text-white"
                    name="coverPhotoUrl"
                    value={coverPhotoUrl}
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
                    autoComplete="off"
                    value={isbnNumber}
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
                    autoComplete="off"
                    name="price"
                    value={price}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Book Price"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLanguage">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.onChange}
                    name="language"
                    value={language}
                    className={"bg-dark text-white"}
                  >
                    {this.state.languages.map((language) => (
                      <option key={language.value} value={language.value}>
                        {language.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridGenre">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.onChange}
                    name="genre"
                    value={genre}
                    className={"bg-dark text-white"}
                  >
                    {this.state.genres.map((genre) => (
                      <option key={genre.value} value={genre.value}>
                        {genre.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />
                {this.state.id ? "Update" : "Save"}
              </Button>
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} />
                Reset
              </Button>
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={this.bookList.bind(this)}
              >
                <FontAwesomeIcon icon={faList} />
                Book List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
