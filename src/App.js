import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Book from "./Components/book/Book";
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import Welcome from "./Components/Welcome";
import BookList from "./Components/book/BookList";
import UserList from "./Components/user/UserList";
import Login from "./Components/user/Login";
import Register from "./Components/user/Register";
function App() {
  return (
    <Router>
      <Navigation />
      <Container>
        <Row>
          <Col lg="12" className="margin-top">
            <Switch>
              <Route path="/" exact component={Welcome} />

              <Route path="/add" exact component={Book} />
              <Route path="/edit/:id" exact component={Book} />
              <Route path="/list" exact component={BookList} />
              <Route path="/users" exact component={UserList} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/logout" exact component={Login} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
