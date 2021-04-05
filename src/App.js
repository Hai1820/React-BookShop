import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Book from "./Components/book/Book";
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import Welcome from "./Components/Welcome";
import BookList from "./Components/book/BookList";
import UserList from "./Components/user/UserList";
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
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
