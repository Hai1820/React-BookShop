import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Book from "./Components/Book";
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import Welcome from "./Components/Welcome";
import BookList from "./Components/BookList";
import UserList from "./Components/UserList";
function App() {
  const marginTop = {
    marginTop: "20px",
  };
  return (
    <Router>
      <Navigation />
      <Container>
        <Row>
          <Col lg="12" style={marginTop}>
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
