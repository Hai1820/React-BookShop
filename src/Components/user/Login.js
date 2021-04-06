import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Button,
  Alert,
} from "react-bootstrap";
import { authenticateUser } from "../../services/index";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }
  initialState = {
    email: "",
    password: "",
    error: "",
  };
  resetLoginForm = () => {
    this.setState(() => this.initialState);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  validateUser = () => {
    this.props.authenticateUser(this.state.email, this.state.password);
    setTimeout(() => {
      if (this.props.auth.isLoggedIn) {
        return this.props.history.push("/");
      } else {
        this.resetLoginForm();
        this.setState({ error: "Invalid email and password" });
      }
    });
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <Row className="justify-content-md-center">
        <Col xs={5}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card className="border border-dark bg-dark text-white">
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} />
              Login
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="email"
                      value={email}
                      className="bg-dark text-white"
                      placeholder="Enter Email Address"
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="password"
                      name="password"
                      value={password}
                      className="bg-dark text-white"
                      placeholder="Enter Password"
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button
                size="sm"
                type="button"
                variant="success"
                disabled={
                  this.state.email.length === 0 ||
                  this.state.password.length === 0
                }
                onClick={this.validateUser}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>{" "}
              <Button
                size="sm"
                type="button"
                variant="info"
                disabled={
                  this.state.email.length === 0 &&
                  this.state.password.length === 0 &&
                  this.state.error.length === 0
                }
                onClick={this.resetLoginForm}
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (email, password) =>
      dispatch(authenticateUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
